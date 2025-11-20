import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import BlogCard from "@/components/BlogCard";
import { blogService } from "@/lib/blog-service";
import { Button } from "@/components/ui/button";

interface TagPageProps {
	params: Promise<{ tag: string }>;
}

function decodeTag(tag: string): string {
	return decodeURIComponent(tag);
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
	const { tag } = await params;
	const tagName = decodeTag(tag);

	return {
		title: `#${tagName} | Blog Tags`,
		description: `Posts tagged with #${tagName}`,
	};
}

export default async function TagPage({ params }: TagPageProps) {
	const { tag } = await params;
	const tagName = decodeTag(tag);

	const posts = blogService.getPostsByTag(tagName);

	if (posts.length === 0) {
		notFound();
	}

	return (
		// 1. No pasamos pageTitle para evitar el H1 duplicado del layout
		<MainLayout recentPosts={posts}>
			{/* Encabezado Minimalista */}
			<div className="flex flex-col gap-4 mb-10 border-b border-border pb-6">
				{/* Navegación sutil */}
				<Link href="/tags" className="w-fit">
					<Button
						variant="ghost"
						size="sm"
						className="pl-0 hover:bg-transparent text-muted-foreground hover:text-primary">
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to all tags
					</Button>
				</Link>

				{/* Título y Subtítulo unificados */}
				<div className="flex items-baseline justify-between flex-wrap gap-4">
					<div>
						<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">#{tagName}</h1>
						<p className="text-muted-foreground mt-2 text-lg">
							Found {posts.length} {posts.length === 1 ? "article" : "articles"}
						</p>
					</div>
				</div>
			</div>

			{/* Grid de Posts */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{posts.map((post) => (
					<BlogCard key={post.id} post={post} />
				))}
			</div>
		</MainLayout>
	);
}
