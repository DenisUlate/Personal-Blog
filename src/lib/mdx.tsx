import { compileMDX as compileMDXRSC } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Callout } from "@/components/mdx";

/**
 * Custom components available in MDX
 *
 * ¿Por qué definir componentes aquí?
 * - Con RSC, los componentes se pasan directamente a compileMDX()
 * - No necesitamos un componente cliente separado
 * - Todo se renderiza en el servidor
 */
const components = {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Callout,
};

/**
 * Compile MDX content using React Server Components
 *
 * ¿Qué hace esta función?
 * - Usa la versión RSC (React Server Components) de next-mdx-remote
 * - Más compatible con Next.js 15 y React 19
 * - Compila y renderiza directamente en el servidor
 *
 * ¿Por qué cambiar a RSC?
 * - Evita problemas de hooks en el cliente
 * - Mejor performance (todo en el servidor)
 * - Más simple (no necesita serialize + MDXRemote separados)
 * - Retorna el contenido ya renderizado
 *
 * @param source - Raw MDX content as string
 * @returns Compiled MDX content ready to render
 */
export async function compileMDX(source: string) {
	try {
		// compileMDXRSC compila y retorna el contenido listo para renderizar
		// No necesitamos serializar y des-serializar
		const result = await compileMDXRSC({
			source,
			options: {
				parseFrontmatter: false,
				mdxOptions: {
					development: process.env.NODE_ENV === "development",
					remarkPlugins: [],
					rehypePlugins: [],
					format: "mdx",
				},
			},
			components,
		});

		return result.content;
	} catch (error) {
		// Better error handling para debugging
		const errorMessage = error instanceof Error ? error.message : String(error);
		console.error("❌ Error compiling MDX:", errorMessage);
		console.error("Full error:", error);

		// Throw error with better message
		throw new Error(`MDX compilation failed: ${errorMessage}`);
	}
}
