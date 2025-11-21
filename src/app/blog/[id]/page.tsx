import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Folder, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { MDXContent } from "@/components/MDXContent";
import GoToTopButton from "@/components/GoToTopButton";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";
import { formatDate } from "@/lib/helpers";
import { blogService } from "@/lib/blog-service";

// Force dynamic rendering to avoid build-time prerendering errors
export const dynamic = "force-dynamic";

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const post = blogService.getPostBySlug(id);

	if (!post) {
		return {
			title: "Post not found",
		};
	}

	return {
		title: post.title,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			type: "article",
			publishedTime: post.date,
			authors: [post.author],
			tags: post.tags,
		},
	};
}

// Generar rutas estáticas en build time para mejor performance
export async function generateStaticParams() {
	const posts = blogService.getAllPosts();
	return posts.map((post) => ({
		id: post.slug,
	}));
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	// Server Component - datos obtenidos directamente en el servidor
	// Ahora usamos getPostWithCompiledMDX() que retorna:
	// - post: metadata del post
	// - mdxSource: contenido MDX serializado (MDXRemoteSerializeResult)
	const result = await blogService.getPostWithCompiledMDX(id);
	const allPosts = blogService.getAllPosts();

	// Si no existe el post, mostrar página 404
	if (!result) {
		notFound();
	}

	// Destructure para obtener post y mdxSource
	const { post, mdxSource } = result;

	return (
		<MainLayout showSidebar={true} recentPosts={allPosts}>
			{/* JSON-LD para SEO */}
			<BlogPostJsonLd post={post} />

			<Link href="/" className="flex items-center gap-2 text-primary hover:text-foreground mb-6">
				<ArrowLeft size={16} className="text-primary" />
				<span>Back to all posts</span>
			</Link>

			<article className="bg-card border border-border/20 rounded-lg shadow-lg p-8 mb-16">
				<h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>

				{post.category && (
					<div className="mb-6 flex items-center justify-between">
						<Badge
							variant="default"
							className="px-3 py-1 rounded-md text-[10px] uppercase tracking-wide inline-flex items-center justify-center gap-1.5 leading-none">
							<Folder className="size-3" />
							<span className="mt-px">{post.category}</span>
						</Badge>

						<div className="flex items-center space-x-2 text-primary">
							<span className="text-primary ml-2 text-xs">{formatDate(post.date)}</span>
						</div>
					</div>
				)}

				{post.illustration && (
					<div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden border border-border">
						<Image src={post.illustration} alt={post.title} fill className="object-cover" priority />
					</div>
				)}

				<div className="mb-6">
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground text-sm">
							<span className="text-accent">By</span> {post.author}
						</span>
						<div className="flex items-center gap-1 text-sm text-muted-foreground">
							<Clock size={14} />
							<span>{post.readingTime} min read</span>
						</div>
					</div>

					<MDXContent mdxSource={mdxSource} />
				</div>

				<div className="flex gap-2 pt-6 border-t border-border">
					{post.tags.map((tag, index) => (
						<Badge variant="default" key={index} className="px-2 py-1 rounded-md text-sm">
							<span>
								<Tag size={12} className="mr-1" />
							</span>
							{tag}
						</Badge>
					))}
				</div>
			</article>
			<GoToTopButton />
		</MainLayout>
	);
}
