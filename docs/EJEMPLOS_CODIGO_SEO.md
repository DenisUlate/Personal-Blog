# 📚 Ejemplos de Código SEO - Referencia Rápida

## 1. Componente de Botón RSS

Crea este archivo para agregar un botón de suscripción RSS:

```tsx
// src/components/RSSButton.tsx

import Link from "next/link";

/**
 * Botón de suscripción RSS
 * Colócalo en tu footer, sidebar, o header para promocionar tu RSS feed
 */
export default function RSSButton() {
	return (
		<Link
			href="/feed.xml"
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
			aria-label="Suscribirse al RSS feed">
			{/* Icono SVG de RSS */}
			<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z" />
			</svg>
			Suscribirse vía RSS
		</Link>
	);
}
```

**Uso:**

```tsx
// En tu Footer.tsx o Sidebar
import RSSButton from "@/components/RSSButton";

export default function Footer() {
	return (
		<footer>
			{/* ... otro contenido ... */}
			<RSSButton />
		</footer>
	);
}
```

---

## 2. Metadata Personalizada por Página

```tsx
// src/app/blog/[id]/page.tsx

import { Metadata } from "next";
import { getPostBySlug } from "@/data/blog-service";

/**
 * Genera metadata SEO optimizada para cada post del blog
 * Next.js automáticamente la inyecta en el <head>
 */
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
	const post = getPostBySlug(params.id);

	if (!post) {
		return {
			title: "Post no encontrado",
		};
	}

	return {
		// Título del post
		title: post.title,

		// Descripción para SEO (aparece en Google)
		description: post.excerpt,

		// Keywords del post
		keywords: post.tags.join(", "),

		// Autor
		authors: [{ name: post.author }],

		// URL canónica (evita contenido duplicado)
		alternates: {
			canonical: `/blog/${post.slug}`,
		},

		// Open Graph para redes sociales (Facebook, LinkedIn)
		openGraph: {
			title: post.title,
			description: post.excerpt,
			type: "article",
			publishedTime: post.date,
			authors: [post.author],
			tags: post.tags,
			images: post.featuredImage
				? [
						{
							url: post.featuredImage,
							width: 1200,
							height: 630,
							alt: post.title,
						},
				  ]
				: [],
		},

		// Twitter Card para Twitter/X
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.excerpt,
			images: post.featuredImage ? [post.featuredImage] : [],
		},
	};
}
```

---

## 3. Breadcrumbs con Structured Data

```tsx
// src/components/BlogBreadcrumbs.tsx

import Link from "next/link";

/**
 * Breadcrumbs (migas de pan) con JSON-LD para SEO
 * Ayuda a Google a entender la estructura de tu sitio
 */
interface BreadcrumbsProps {
	items: Array<{
		label: string;
		href?: string;
	}>;
}

export default function BlogBreadcrumbs({ items }: BreadcrumbsProps) {
	// Generar JSON-LD para structured data
	const breadcrumbList = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.label,
			...(item.href && { item: `https://tu-dominio.com${item.href}` }),
		})),
	};

	return (
		<>
			{/* Script JSON-LD para Google */}
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />

			{/* Breadcrumbs visibles */}
			<nav aria-label="Breadcrumb" className="mb-4">
				<ol className="flex items-center gap-2 text-sm">
					{items.map((item, index) => (
						<li key={index} className="flex items-center">
							{index > 0 && <span className="mx-2">/</span>}
							{item.href ? (
								<Link href={item.href} className="hover:underline">
									{item.label}
								</Link>
							) : (
								<span className="text-gray-500">{item.label}</span>
							)}
						</li>
					))}
				</ol>
			</nav>
		</>
	);
}
```

**Uso:**

```tsx
// En tu página de post
<BlogBreadcrumbs
	items={[
		{ label: "Inicio", href: "/" },
		{ label: "Blog", href: "/blog" },
		{ label: post.title }, // Sin href = item actual
	]}
/>
```

---

## 4. Componente de Compartir en Redes Sociales

```tsx
// src/components/ShareButtons.tsx

"use client";

import { useState } from "react";

/**
 * Botones para compartir en redes sociales
 * Ayuda a viralizar tu contenido y mejorar SEO indirectamente
 */
interface ShareButtonsProps {
	url: string;
	title: string;
	description: string;
}

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
	const [copied, setCopied] = useState(false);

	// Codificar datos para URLs
	const encodedUrl = encodeURIComponent(url);
	const encodedTitle = encodeURIComponent(title);
	const encodedDescription = encodeURIComponent(description);

	// URLs de compartir
	const shareUrls = {
		twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
		linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
		whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
	};

	// Copiar link al clipboard
	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Error al copiar:", err);
		}
	};

	return (
		<div className="flex items-center gap-3">
			<span className="text-sm text-gray-600">Compartir:</span>

			{/* Twitter/X */}
			<a
				href={shareUrls.twitter}
				target="_blank"
				rel="noopener noreferrer"
				className="p-2 hover:bg-blue-100 rounded-full"
				aria-label="Compartir en Twitter">
				𝕏
			</a>

			{/* Facebook */}
			<a
				href={shareUrls.facebook}
				target="_blank"
				rel="noopener noreferrer"
				className="p-2 hover:bg-blue-100 rounded-full"
				aria-label="Compartir en Facebook">
				📘
			</a>

			{/* LinkedIn */}
			<a
				href={shareUrls.linkedin}
				target="_blank"
				rel="noopener noreferrer"
				className="p-2 hover:bg-blue-100 rounded-full"
				aria-label="Compartir en LinkedIn">
				💼
			</a>

			{/* WhatsApp */}
			<a
				href={shareUrls.whatsapp}
				target="_blank"
				rel="noopener noreferrer"
				className="p-2 hover:bg-green-100 rounded-full"
				aria-label="Compartir en WhatsApp">
				💬
			</a>

			{/* Copiar link */}
			<button onClick={copyToClipboard} className="p-2 hover:bg-gray-100 rounded-full" aria-label="Copiar enlace">
				{copied ? "✅" : "🔗"}
			</button>
		</div>
	);
}
```

---

## 5. Analytics Tracking (Opcional)

```tsx
// src/components/GoogleAnalytics.tsx

import Script from "next/script";

/**
 * Componente de Google Analytics
 * Colócalo en tu layout principal
 */
export default function GoogleAnalytics() {
	const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

	// No renderizar si no hay ID configurado
	if (!GA_ID) return null;

	return (
		<>
			{/* Script de Google Analytics */}
			<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
			<Script id="google-analytics" strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
			</Script>
		</>
	);
}
```

**Uso en layout.tsx:**

```tsx
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function Layout({ children }) {
	return (
		<html>
			<head>
				<GoogleAnalytics />
			</head>
			<body>{children}</body>
		</html>
	);
}
```

---

## 6. Validación de Formulario de Newsletter

```tsx
// src/components/NewsletterForm.tsx

"use client";

import { useState } from "react";

/**
 * Formulario de suscripción a newsletter
 * Ayuda a construir tu audiencia (importante para SEO indirecto)
 */
export default function NewsletterForm() {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("loading");

		// TODO: Integrar con tu servicio de email (Mailchimp, ConvertKit, etc.)
		try {
			const response = await fetch("/api/newsletter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			if (response.ok) {
				setStatus("success");
				setEmail("");
			} else {
				setStatus("error");
			}
		} catch (error) {
			setStatus("error");
		}
	};

	return (
		<div className="bg-gray-100 p-6 rounded-lg">
			<h3 className="text-lg font-bold mb-2">📬 Suscríbete al Newsletter</h3>
			<p className="text-sm text-gray-600 mb-4">Recibe las últimas actualizaciones del blog en tu email</p>

			<form onSubmit={handleSubmit} className="flex gap-2">
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="tu@email.com"
					required
					className="flex-1 px-4 py-2 rounded border"
					disabled={status === "loading"}
				/>
				<button
					type="submit"
					disabled={status === "loading"}
					className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
					{status === "loading" ? "..." : "Suscribir"}
				</button>
			</form>

			{status === "success" && <p className="mt-2 text-sm text-green-600">✅ ¡Suscripción exitosa! Revisa tu email.</p>}
			{status === "error" && <p className="mt-2 text-sm text-red-600">❌ Error. Intenta de nuevo.</p>}
		</div>
	);
}
```

---

## 7. Tabla de Contenidos (TOC)

```tsx
// src/components/TableOfContents.tsx

"use client";

import { useEffect, useState } from "react";

/**
 * Tabla de contenidos automática
 * Mejora la experiencia de usuario y el tiempo en página (métrica SEO)
 */
interface Heading {
	id: string;
	text: string;
	level: number;
}

export default function TableOfContents() {
	const [headings, setHeadings] = useState<Heading[]>([]);
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		// Extraer todos los headings del contenido
		const elements = Array.from(document.querySelectorAll("article h2, article h3"));

		const headingData = elements.map((element) => ({
			id: element.id,
			text: element.textContent || "",
			level: parseInt(element.tagName[1]),
		}));

		setHeadings(headingData);

		// Observar qué heading está visible
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{ rootMargin: "-100px 0px -66% 0px" }
		);

		elements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, []);

	if (headings.length === 0) return null;

	return (
		<nav className="sticky top-4 p-4 bg-gray-50 rounded-lg">
			<h4 className="font-bold mb-3">📋 Tabla de Contenidos</h4>
			<ul className="space-y-2">
				{headings.map((heading) => (
					<li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}>
						<a
							href={`#${heading.id}`}
							className={`text-sm hover:text-blue-600 ${
								activeId === heading.id ? "text-blue-600 font-medium" : "text-gray-600"
							}`}>
							{heading.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
```

---

## 8. Reading Time Estimator

````tsx
// src/utils/reading-time.ts

/**
 * Calcula el tiempo estimado de lectura
 * Mejora UX y puede aumentar el engagement
 */
export function calculateReadingTime(content: string): number {
	// Promedio de palabras por minuto en español: ~200
	const wordsPerMinute = 200;

	// Contar palabras (ignorar código y HTML)
	const text = content
		.replace(/<\/?[^>]+(>|$)/g, "") // Remover HTML
		.replace(/```[\s\S]*?```/g, "") // Remover bloques de código
		.replace(/`[^`]+`/g, ""); // Remover código inline

	const words = text.trim().split(/\s+/).length;
	const minutes = Math.ceil(words / wordsPerMinute);

	return minutes;
}

/**
 * Formatea el tiempo de lectura para mostrar
 */
export function formatReadingTime(minutes: number): string {
	if (minutes === 1) return "1 min de lectura";
	return `${minutes} mins de lectura`;
}
````

**Uso:**

```tsx
import { calculateReadingTime, formatReadingTime } from "@/utils/reading-time";

// En tu componente de post
const readingTime = calculateReadingTime(post.content);

<div className="text-gray-500 text-sm">⏱️ {formatReadingTime(readingTime)}</div>;
```

---

## 📌 Resumen

Estos componentes y utilidades te ayudarán a:

1. ✅ **Mejorar SEO** - Metadata, structured data, breadcrumbs
2. ✅ **Aumentar engagement** - Share buttons, newsletter, TOC
3. ✅ **Mejorar UX** - Reading time, tabla de contenidos
4. ✅ **Construir audiencia** - RSS button, newsletter
5. ✅ **Monitorear** - Google Analytics

**Implementa los que necesites según tus prioridades!** 🚀
