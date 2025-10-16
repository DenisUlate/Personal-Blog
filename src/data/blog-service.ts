import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost } from "@/types/blog";

/**
 * BlogService - Servicio centralizado para gestión de posts del blog
 * Maneja lectura, parseo y filtrado de archivos Markdown/MDX
 */
class BlogService {
	private postsDirectory: string;

	constructor() {
		this.postsDirectory = path.join(process.cwd(), "content/blog");
	}

	/**
	 * Obtiene todos los posts del blog ordenados por fecha (más recientes primero)
	 */
	getAllPosts(): BlogPost[] {
		// Verificar si el directorio existe
		if (!fs.existsSync(this.postsDirectory)) {
			console.warn(`Posts directory not found: ${this.postsDirectory}`);
			return [];
		}

		const fileNames = fs.readdirSync(this.postsDirectory);
		const allPostsData = fileNames
			.filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
			.map((fileName) => {
				const slug = fileName.replace(/\.(md|mdx)$/, "");
				return this.parsePostFile(fileName, slug);
			})
			.filter((post): post is BlogPost => post !== null);

		// Ordenar posts por fecha (más recientes primero)
		return allPostsData.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
	}

	/**
	 * Obtiene un post específico por su slug
	 */
	getPostBySlug(slug: string): BlogPost | null {
		try {
			// Intentar con .md primero, luego con .mdx
			const mdPath = path.join(this.postsDirectory, `${slug}.md`);
			const mdxPath = path.join(this.postsDirectory, `${slug}.mdx`);

			let filePath: string | null = null;
			let fileName: string | null = null;

			if (fs.existsSync(mdPath)) {
				filePath = mdPath;
				fileName = `${slug}.md`;
			} else if (fs.existsSync(mdxPath)) {
				filePath = mdxPath;
				fileName = `${slug}.mdx`;
			}

			if (!filePath || !fileName) {
				console.warn(`Post not found: ${slug}`);
				return null;
			}

			const fileContents = fs.readFileSync(filePath, "utf8");
			return this.parsePostContent(fileContents, slug);
		} catch (error) {
			console.error(`Error reading post ${slug}:`, error);
			return null;
		}
	}

	/**
	 * Obtiene todos los posts destacados (featured)
	 */
	getFeaturedPosts(): BlogPost[] {
		const allPosts = this.getAllPosts();
		return allPosts.filter((post) => post.featured);
	}

	/**
	 * Obtiene posts filtrados por tag
	 */
	getPostsByTag(tag: string): BlogPost[] {
		const allPosts = this.getAllPosts();
		return allPosts.filter((post) => post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()));
	}

	/**
	 * Obtiene posts filtrados por categoría
	 */
	getPostsByCategory(category: string): BlogPost[] {
		const allPosts = this.getAllPosts();
		return allPosts.filter((post) => post.category?.toLowerCase() === category.toLowerCase());
	}

	/**
	 * Obtiene todas las categorías únicas
	 */
	getAllCategories(): string[] {
		const allPosts = this.getAllPosts();
		const categories = new Set<string>();

		allPosts.forEach((post) => {
			if (post.category) {
				categories.add(post.category);
			}
		});

		return Array.from(categories).sort();
	}

	/**
	 * Obtiene todos los tags únicos
	 */
	getAllTags(): string[] {
		const allPosts = this.getAllPosts();
		const tags = new Set<string>();

		allPosts.forEach((post) => {
			post.tags.forEach((tag) => tags.add(tag));
		});

		return Array.from(tags).sort();
	}

	/**
	 * Busca posts por término (busca en título y excerpt)
	 */
	searchPosts(query: string): BlogPost[] {
		const allPosts = this.getAllPosts();
		const lowercaseQuery = query.toLowerCase();

		return allPosts.filter(
			(post) => post.title.toLowerCase().includes(lowercaseQuery) || post.excerpt.toLowerCase().includes(lowercaseQuery)
		);
	}

	/**
	 * Parsea un archivo de post completo
	 * @private
	 */
	private parsePostFile(fileName: string, slug: string): BlogPost | null {
		try {
			const fullPath = path.join(this.postsDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, "utf8");
			return this.parsePostContent(fileContents, slug);
		} catch (error) {
			console.error(`Error parsing file ${fileName}:`, error);
			return null;
		}
	}

	/**
	 * Parsea el contenido de un post desde string
	 * @private
	 */
	private parsePostContent(fileContents: string, slug: string): BlogPost {
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
			featuredImage: data.featuredImage ?? data.featured_image ?? null,
			illustration: data.illustration ?? null,
			images: Array.isArray(data.images) ? data.images : [],
		} as BlogPost;
	}
}

// Singleton instance
const blogService = new BlogService();

// Exportar instancia del servicio
export { blogService };

// Mantener compatibilidad con imports antiguos (funciones)
export const getAllPosts = () => blogService.getAllPosts();
export const getPostBySlug = (slug: string) => blogService.getPostBySlug(slug);
export const getFeaturedPosts = () => blogService.getFeaturedPosts();
export const getPostsByTag = (tag: string) => blogService.getPostsByTag(tag);
export const getPostsByCategory = (category: string) => blogService.getPostsByCategory(category);
export const getAllCategories = () => blogService.getAllCategories();
export const getAllTags = () => blogService.getAllTags();
export const searchPosts = (query: string) => blogService.searchPosts(query);
