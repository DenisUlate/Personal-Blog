import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Folder } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import GoToTopButton from "@/components/GoToTopButton";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";
import { formatDate } from "@/utils/helpers";
import { blogService } from "@/data/blog-service";

/**
 * Force dynamic rendering for this page
 *
 * ¿Por qué necesitamos esto?
 * - MDXContent usa <MDXRemote /> que es un Client Component con hooks
 * - Next.js por defecto intenta pre-renderizar (SSG) las páginas
 * - Los hooks no están disponibles durante el pre-rendering
 *
 * ¿Qué hace export const dynamic = 'force-dynamic'?
 * - Le dice a Next.js que esta página debe renderizarse en el servidor
 * - En cada request, no en build time
 * - Permite usar Client Components con hooks correctamente
 *
 * Alternativas:
 * - 'auto' (default): Next.js decide
 * - 'force-static': Fuerza SSG (no funcionaría con MDXRemote)
 * - 'force-dynamic': Siempre SSR (lo que necesitamos)
 */
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
	// - mdxContent: contenido MDX ya renderizado (React Element)
	const result = await blogService.getPostWithCompiledMDX(id);
	const allPosts = blogService.getAllPosts();

	// Si no existe el post, mostrar página 404
	if (!result) {
		notFound();
	}

	// Destructure para obtener post y mdxContent
	const { post, mdxContent } = result;

	return (
		<MainLayout showSidebar={false} recentPosts={allPosts}>
			{/* JSON-LD para SEO */}
			<BlogPostJsonLd post={post} />

			<Link href="/" className="flex items-center gap-2 text-primary hover:text-foreground mb-6">
				<ArrowLeft size={16} className="text-primary" />
				<span>Back to all posts</span>
			</Link>

			<article className="bg-card border border-border p-8 rounded-lg shadow-lg">
				<h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>

				{post.category && (
					<div className="mb-4">
						<Badge
							variant="default"
							className="px-3 py-1 rounded-md text-[10px] uppercase tracking-wide inline-flex items-center justify-center gap-1.5 leading-none">
							<Folder className="size-3" />
							<span className="mt-px">{post.category}</span>
						</Badge>
					</div>
				)}

				<div className="flex items-center space-x-2 text-primary mb-6">
					<Calendar size={16} className="text-primary" />
					<span className="text-primary ml-2">{formatDate(post.date)}</span>
					<span className="text-muted-foreground">by {post.author}</span>
				</div>

				<div className="mb-6">
					{/* 
						MDX Content renderizado en el servidor
						
						¿Qué está pasando aquí?
						1. mdxContent viene del servidor (ya compilado Y renderizado)
						2. Es un React Element listo para mostrar
						3. No necesitamos un componente cliente
						4. Todos los componentes ya están procesados
						
						¿Por qué es mejor con RSC?
						- Todo se procesa en el servidor (mejor SEO)
						- No hay problemas de hooks
						- Menor bundle size en el cliente
						- El contenido llega ya renderizado
					*/}
					<div className="prose prose-lg max-w-none dark:prose-invert">{mdxContent}</div>
				</div>

				<div className="flex gap-2 pt-6 border-t border-border">
					{post.tags.map((tag, index) => (
						<Badge variant="default" key={index} className="bg-muted px-2 py-1 rounded-md text-sm">
							#{tag}
						</Badge>
					))}
				</div>
			</article>
			<GoToTopButton />
		</MainLayout>
	);
}
