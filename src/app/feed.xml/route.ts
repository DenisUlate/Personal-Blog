import { NextResponse } from "next/server";
import { blogService } from "@/data/blog-service";
import { METADATA } from "@/constants";

/**
 * RSS Feed Route Handler
 *
 * Este endpoint genera dinámicamente un feed RSS 2.0 para tu blog.
 *
 * RSS (Really Simple Syndication) permite a los usuarios:
 * - Suscribirse a tu blog usando lectores de RSS (Feedly, Inoreader, etc.)
 * - Recibir actualizaciones automáticas cuando publiques nuevo contenido
 * - Leer tu contenido sin visitar el sitio web
 *
 * Estándar RSS 2.0: https://www.rssboard.org/rss-specification
 *
 * Accesible en: /feed.xml
 */

// Import centralized metadata from constants
const SITE_URL = METADATA.URL;
const SITE_TITLE = METADATA.TITLE;
const SITE_DESCRIPTION = METADATA.DESCRIPTION;
const AUTHOR_NAME = METADATA.AUTHOR;

// Additional metadata not yet centralized (TODO: consider adding to src/constants/index.ts)
const SITE_LANGUAGE = "es-ES"; // Idioma del sitio (es-ES para español)
const AUTHOR_EMAIL = "tu-email@ejemplo.com"; // Tu email (opcional)

/**
 * Escapa caracteres especiales XML para prevenir errores de parseo
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
 * Convierte una fecha a formato RFC 822 (requerido por RSS 2.0)
 * Ejemplo: "Wed, 02 Oct 2024 15:30:00 GMT"
 */
function toRFC822Date(dateString: string): string {
	const date = new Date(dateString);
	return date.toUTCString();
}

/**
 * Genera un item RSS para un post individual
 */
function generateRssItem(post: {
	title: string;
	slug: string;
	excerpt: string;
	date: string;
	author: string;
	category?: string;
	tags: string[];
	featuredImage?: string | null;
}): string {
	const postUrl = `${SITE_URL}/blog/${post.slug}`;
	const title = escapeXml(post.title);
	const description = escapeXml(post.excerpt);
	const author = escapeXml(post.author);
	const pubDate = toRFC822Date(post.date);

	// Construir el contenido del item
	let item = `
  <item>
    <title>${title}</title>
    <link>${postUrl}</link>
    <guid isPermaLink="true">${postUrl}</guid>
    <description>${description}</description>
    <pubDate>${pubDate}</pubDate>
    <author>${AUTHOR_EMAIL} (${author})</author>`;

	// Agregar categoría si existe
	if (post.category) {
		item += `
    <category>${escapeXml(post.category)}</category>`;
	}

	// Agregar tags como categorías adicionales (RSS permite múltiples categorías)
	post.tags.forEach((tag) => {
		item += `
    <category>${escapeXml(tag)}</category>`;
	});

	// Agregar imagen destacada si existe (usando enclosure para media)
	if (post.featuredImage) {
		const imageUrl = post.featuredImage.startsWith("http") ? post.featuredImage : `${SITE_URL}${post.featuredImage}`;

		item += `
    <enclosure url="${imageUrl}" type="image/jpeg" />`;
	}

	item += `
  </item>`;

	return item;
}

/**
 * GET handler - Genera y retorna el RSS feed
 */
export async function GET() {
	try {
		// Obtener todos los posts (ya vienen ordenados por fecha, más recientes primero)
		const posts = blogService.getAllPosts();

		// Limitar a los últimos 50 posts para mantener el feed manejable
		const recentPosts = posts.slice(0, 50);

		// Obtener la fecha del post más reciente para lastBuildDate
		const lastBuildDate = recentPosts.length > 0 ? toRFC822Date(recentPosts[0].date) : new Date().toUTCString();

		// Construir el feed RSS 2.0
		const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>${SITE_LANGUAGE}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <managingEditor>${AUTHOR_EMAIL} (${AUTHOR_NAME})</managingEditor>
    <webMaster>${AUTHOR_EMAIL} (${AUTHOR_NAME})</webMaster>
    
    <!-- Atom self-reference (recomendado para lectores RSS modernos) -->
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    
    <!-- URL de la imagen del blog (opcional, puedes personalizarla) -->
    <image>
      <url>${SITE_URL}/images/logo.png</url>
      <title>${escapeXml(SITE_TITLE)}</title>
      <link>${SITE_URL}</link>
    </image>
    
    <!-- Configuración de actualización (opcional) -->
    <ttl>60</ttl> <!-- Time To Live: minutos que los lectores deben cachear el feed -->
${recentPosts.map((post) => generateRssItem(post)).join("")}
  </channel>
</rss>`;

		// Retornar el RSS feed con el content-type correcto
		return new NextResponse(rss, {
			status: 200,
			headers: {
				"Content-Type": "application/xml; charset=utf-8",
				"Cache-Control": "public, max-age=1800, s-maxage=3600", // Cache por 30 min (navegador), 1h (CDN)
			},
		});
	} catch (error) {
		console.error("Error generating RSS feed:", error);
		return new NextResponse("Error generating RSS feed", { status: 500 });
	}
}
