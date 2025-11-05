"use client";

import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Callout } from "@/components/mdx";

/**
 * Props for MDXContent component
 *
 * ¿Qué es MDXRemoteSerializeResult?
 * - Es el tipo del objeto que retorna serialize()
 * - Contiene el MDX compilado en formato serializable
 * - Incluye scope, compiledSource, y frontmatter (si se parsea)
 */
interface MDXContentProps {
	source: MDXRemoteSerializeResult;
	className?: string;
}

/**
 * Components available for use in MDX content
 *
 * ¿Cómo funciona esto?
 * 1. Cuando escribes <Badge /> en tu archivo .mdx
 * 2. MDXRemote busca "Badge" en este objeto
 * 3. Renderiza el componente real de shadcn/ui
 *
 * ¿Cómo añadir más componentes?
 * Simplemente añádelos a este objeto:
 * components = {
 *   Badge,
 *   MiComponente,
 *   OtroComponente
 * }
 */
const components = {
	// Componentes de shadcn/ui disponibles en MDX
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,

	// Custom MDX components
	Callout,

	// Custom HTML elements con estilos mejorados
	// Estos reemplazan los elementos HTML por defecto
	h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h1 className="text-4xl font-bold mb-6 mt-8 text-foreground scroll-m-20" {...props} />
	),
	h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2 className="text-3xl font-semibold mb-4 mt-8 text-foreground scroll-m-20" {...props} />
	),
	h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3 className="text-2xl font-semibold mb-3 mt-6 text-foreground scroll-m-20" {...props} />
	),
	h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h4 className="text-xl font-semibold mb-2 mt-4 text-foreground scroll-m-20" {...props} />
	),
	p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p className="mb-4 text-primary leading-relaxed text-base" {...props} />
	),
	ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
		<ul className="list-disc pl-6 mb-4 space-y-2 text-primary" {...props} />
	),
	ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
		<ol className="list-decimal pl-6 mb-4 space-y-2 text-primary" {...props} />
	),
	li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="text-primary leading-relaxed" {...props} />,
	blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
		<blockquote
			className="border-l-4 border-primary/30 pl-4 italic my-4 text-muted-foreground bg-muted/50 py-2 rounded-r"
			{...props}
		/>
	),
	code: (props: React.HTMLAttributes<HTMLElement>) => {
		// Código inline (cuando no está dentro de pre)
		const isInline = !props.className?.includes("language-");
		if (isInline) {
			return <code className="bg-muted px-2 py-0.5 rounded text-sm font-mono text-foreground" {...props} />;
		}
		// Bloque de código (manejado por pre)
		return <code className="text-sm font-mono" {...props} />;
	},
	pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
		<pre className="bg-muted rounded-lg p-4 my-6 overflow-x-auto border border-border" {...props} />
	),
	a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
		<a
			className="text-blue-500 hover:text-blue-600 underline underline-offset-2 transition-colors"
			target="_blank"
			rel="noopener noreferrer"
			{...props}
		/>
	),
	hr: (props: React.HTMLAttributes<HTMLHRElement>) => <hr className="my-8 border-border" {...props} />,
	table: (props: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="my-6 overflow-x-auto">
			<table className="w-full border-collapse border border-border" {...props} />
		</div>
	),
	th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
		<th className="border border-border px-4 py-2 bg-muted font-semibold text-left" {...props} />
	),
	td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
		<td className="border border-border px-4 py-2" {...props} />
	),
};

/**
 * MDXContent Component
 *
 * ¿Por qué 'use client'?
 * - MDXRemote usa React hooks internamente (useState, useEffect)
 * - Los hooks solo funcionan en Client Components
 * - El contenido compilado viene del servidor, pero el rendering es en cliente
 *
 * ¿Cómo se usa?
 * ```tsx
 * // En tu Server Component (page.tsx):
 * const mdxSource = await compileMDX(post.content);
 *
 * // Pasas el source compilado al cliente:
 * <MDXContent source={mdxSource} />
 * ```
 *
 * @param source - Compiled MDX from serialize()
 * @param className - Optional CSS classes for wrapper
 */
export default function MDXContent({ source, className = "" }: MDXContentProps) {
	return (
		<div className={`prose prose-lg max-w-none dark:prose-invert ${className}`}>
			<MDXRemote {...source} components={components} />
		</div>
	);
}
