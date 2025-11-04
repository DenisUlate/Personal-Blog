import { BlogPost } from "@/types/blog";

interface BlogPostJsonLdProps {
	post: BlogPost;
}

/**
 * Componente que genera JSON-LD estructurado para artículos de blog
 * Mejora el SEO y permite rich snippets en resultados de búsqueda
 *
 * @see https://schema.org/BlogPosting
 * @see https://developers.google.com/search/docs/appearance/structured-data/article
 */
export default function BlogPostJsonLd({ post }: BlogPostJsonLdProps) {
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

	if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
		console.error("NEXT_PUBLIC_SITE_URL is not set in production");
	}
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.excerpt,
		author: {
			"@type": "Person",
			name: post.author || "Autor del Blog",
		},
		datePublished: post.date,
		dateModified: post.date, // Si tienes una fecha de modificación, úsala aquí
		image: post.illustration ? `${siteUrl}${post.illustration}` : undefined,
		url: `${siteUrl}/blog/${post.id}`,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${siteUrl}/blog/${post.id}`,
		},
		publisher: {
			"@type": "Organization",
			name: process.env.NEXT_PUBLIC_APP_NAME || "Mi Blog Personal",
			logo: {
				"@type": "ImageObject",
				url: `${siteUrl}/assets/logo_3_optimized.png`, // Ajusta la ruta de tu logo
			},
		},
		articleSection: post.category,
		keywords: post.tags?.join(", ") || "",
		inLanguage: "es-ES", // Ajusta según tu idioma
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(jsonLd),
			}}
		/>
	);
}
