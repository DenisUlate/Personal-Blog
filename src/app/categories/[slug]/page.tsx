import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import BlogCard from "@/components/BlogCard";
import { blogService } from "@/lib/blog-service";
import { Folder, ArrowLeft } from "lucide-react";

interface CategoryPageProps {
	params: Promise<{ slug: string }>;
}

function slugToCategory(slug: string): string {
	return slug
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
	const { slug } = await params;
	const categoryName = slugToCategory(slug);

	// Fetch all posts (await if blogService.getAllPosts() returns a Promise)
	const allPosts = await Promise.resolve(blogService.getAllPosts());

	// Filter posts by category (case-insensitive)
	const postsInCategory = allPosts.filter((post) => post.category?.toLowerCase() === categoryName.toLowerCase());

	const count = postsInCategory.length;

	// If no posts found, return "Category Not Found"
	if (count === 0) {
		return {
			title: "Category Not Found",
		};
	}

	// Otherwise, return category metadata
	return {
		title: `${categoryName} | Blog Categories`,
		description: `Browse ${count} article${count === 1 ? "" : "s"} in ${categoryName}`,
	};
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	// Await params to get the slug
	const { slug } = await params;

	// Convert slug to category name
	const categoryName = slugToCategory(slug);
	// Fetch posts for the given category
	const allPosts = blogService.getAllPosts();
	// Filter posts by category
	const postsInCategory = allPosts.filter((post) => post.category === categoryName);

	// If no posts found, render 404 page
	if (postsInCategory.length === 0) {
		notFound();
	}

	return (
		<MainLayout pageTitle={categoryName} recentPosts={allPosts}>
			{/* Header con breadcrumb/navegación */}
			<div className="mb-8">
				<Link
					href="/categories"
					className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4">
					<ArrowLeft className="w-4 h-4" />
					<span>Back to Categories</span>
				</Link>

				<div className="flex items-center gap-3 mb-4">
					<div className="p-3 rounded-lg bg-blue-500/10">
						<Folder className="w-6 h-6 text-blue-400" />
					</div>
					<div>
						<h1 className="text-3xl font-bold text-primary">{categoryName}</h1>
						<p className="text-muted-foreground">
							{postsInCategory.length} {postsInCategory.length === 1 ? "article" : "articles"} in this category
						</p>
					</div>
				</div>
			</div>

			{/* Grid de posts */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{postsInCategory.map((post) => (
					<BlogCard key={post.id} post={post} />
				))}
			</div>
		</MainLayout>
	);
}
