import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPost[] {
	// Verificar si el directorio existe
	if (!fs.existsSync(postsDirectory)) {
		return [];
	}

	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames
		.filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
		.map((fileName) => {
			const slug = fileName.replace(/\.(md|mdx)$/, "");
			const fullPath = path.join(postsDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, "utf8");
			const { data, content } = matter(fileContents);

			return {
				id: slug,
				slug,
				content,
				title: data.title || "Sin título",
				excerpt: data.excerpt || "",
				date: data.date || new Date().toISOString(),
				author: data.author || "Anónimo",
				tags: data.tags || [],
				category: data.category || "General",
				featured: data.featured || false,
			} as BlogPost;
		});

	// Ordenar posts por fecha (más recientes primero)
	return allPostsData.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}

export function getPostBySlug(slug: string): BlogPost | null {
	try {
		const fullPath = path.join(postsDirectory, `${slug}.md`);

		// Intentar con .md primero, luego con .mdx
		let fileContents: string;
		if (fs.existsSync(fullPath)) {
			fileContents = fs.readFileSync(fullPath, "utf8");
		} else {
			const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
			if (fs.existsSync(mdxPath)) {
				fileContents = fs.readFileSync(mdxPath, "utf8");
			} else {
				return null;
			}
		}

		const { data, content } = matter(fileContents);

		return {
			id: slug,
			slug,
			content,
			title: data.title || "Sin título",
			excerpt: data.excerpt || "",
			date: data.date || new Date().toISOString(),
			author: data.author || "Anónimo",
			tags: data.tags || [],
			category: data.category || "General",
			featured: data.featured || false,
		} as BlogPost;
	} catch (error) {
		console.error("Error reading post:", error);
		return null;
	}
}

export function getFeaturedPosts(): BlogPost[] {
	const allPosts = getAllPosts();
	return allPosts.filter((post) => post.featured);
}

export function getPostsByTag(tag: string): BlogPost[] {
	const allPosts = getAllPosts();
	return allPosts.filter((post) => post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()));
}

export function getAllTags(): string[] {
	const allPosts = getAllPosts();
	const tags = new Set<string>();

	allPosts.forEach((post) => {
		post.tags.forEach((tag) => tags.add(tag));
	});

	return Array.from(tags).sort();
}
