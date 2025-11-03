import Link from "next/link";
import { notFound } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import BlogCard from "@/components/BlogCard";
import { blogService } from "@/data/blog-service";
import { Folder, ArrowLeft } from "lucide-react";

interface CategoryPageProps {
	params: { slug: string };
}

function slugToCategory(slug: string): string {
	return slug
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export default function CategoryPage({ params }: CategoryPageProps) {
	// Convert slug to category name
	const categoryName = slugToCategory(params.slug);
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
