import { NextResponse } from "next/server";
import { blogService } from "@/data/blog-service";

/**
 * Sitemap XML Route Handler
 *
 * Este endpoint genera dinámicamente un sitemap XML compatible con el estándar
 * de sitemaps (https://www.sitemaps.org/protocol.html)
 *
 * El sitemap ayuda a los motores de búsqueda a:
 * - Descubrir todas las páginas de tu sitio
 * - Entender la estructura y prioridad del contenido
 * - Conocer la frecuencia de actualización de las páginas
 *
 * Accesible en: /sitemap.xml
 */

// IMPORTANTE: Reemplaza esta URL con tu dominio real en producción
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tu-dominio.com";

/**
 * Escapa caracteres especiales XML para prevenir inyección XML
 */
function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

/**
 * Genera una entrada XML para una URL específica
 */
function generateUrlEntry(
	url: string,
	lastmod: string,
	changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never",
	priority: number
): string {
	return `
  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
    <changefreq>${escapeXml(String(changefreq))}</changefreq>
    <priority>${escapeXml(String(priority))}</priority>
  </url>`;
}

/**
 * GET handler - Genera y retorna el sitemap XML
 */
export async function GET() {
	try {
		// Obtener todos los posts del blog
		const posts = blogService.getAllPosts();

		// Obtener todas las categorías y tags para incluirlas en el sitemap
		const categories = blogService.getAllCategories();
		const tags = blogService.getAllTags();

		// Fecha actual en formato ISO para las páginas estáticas
		const currentDate = new Date().toISOString();

		// Generar URLs de páginas estáticas principales
		const staticPages = [
			{
				url: SITE_URL,
				lastmod: currentDate,
				changefreq: "daily" as const,
				priority: 1.0, // Página principal tiene máxima prioridad
			},
			{
				url: `${SITE_URL}/blog`,
				lastmod: currentDate,
				changefreq: "daily" as const,
				priority: 0.9, // Lista de blog es muy importante
			},
			{
				url: `${SITE_URL}/about`,
				lastmod: currentDate,
				changefreq: "monthly" as const,
				priority: 0.7, // Página sobre nosotros cambia poco
			},
			{
				url: `${SITE_URL}/archives`,
				lastmod: currentDate,
				changefreq: "weekly" as const,
				priority: 0.6,
			},
			{
				url: `${SITE_URL}/categories`,
				lastmod: currentDate,
				changefreq: "weekly" as const,
				priority: 0.6,
			},
			{
				url: `${SITE_URL}/tags`,
				lastmod: currentDate,
				changefreq: "weekly" as const,
				priority: 0.6,
			},
		];

		// Generar URLs de posts individuales del blog
		const blogPostUrls = posts.map((post) => ({
			url: `${SITE_URL}/blog/${post.slug}`,
			lastmod: new Date(post.date).toISOString(),
			changefreq: "monthly" as const, // Los posts ya publicados raramente cambian
			priority: post.featured ? 0.8 : 0.7, // Posts destacados tienen mayor prioridad
		}));

		// Generar URLs de páginas de categorías
		const categoryUrls = categories.map((category) => ({
			url: `${SITE_URL}/categories/${encodeURIComponent(category.toLowerCase())}`,
			lastmod: currentDate,
			changefreq: "weekly" as const,
			priority: 0.5,
		}));

		// Generar URLs de páginas de tags
		const tagUrls = tags.map((tag) => ({
			url: `${SITE_URL}/tags/${encodeURIComponent(tag.toLowerCase())}`,
			lastmod: currentDate,
			changefreq: "weekly" as const,
			priority: 0.5,
		}));

		// Combinar todas las URLs
		const allUrls = [...staticPages, ...blogPostUrls, ...categoryUrls, ...tagUrls];

		// Construir el XML del sitemap
		const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls.map((item) => generateUrlEntry(item.url, item.lastmod, item.changefreq, item.priority)).join("")}
</urlset>`;

		// Retornar el sitemap con el content-type correcto
		return new NextResponse(sitemap, {
			status: 200,
			headers: {
				"Content-Type": "application/xml",
				"Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache por 1 hora
			},
		});
	} catch (error) {
		console.error("Error generating sitemap:", error);
		return new NextResponse("Error generating sitemap", { status: 500 });
	}
}
