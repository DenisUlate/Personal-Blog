import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

/**
 * Compile MDX content to serializable format
 *
 * ¿Qué hace esta función?
 * - Compila MDX usando serialize() de next-mdx-remote
 * - Retorna un objeto serializable que puede pasar al cliente
 * - Más estable con React 19 que compileMDXRSC
 *
 * @param source - Raw MDX content as string
 * @returns Serialized MDX
 */
export async function compileMDX(source: string): Promise<MDXRemoteSerializeResult> {
	const mdxSource = await serialize(source, {
		parseFrontmatter: false,
		mdxOptions: {
			development: process.env.NODE_ENV === "development",
			format: "mdx",
		},
	});

	return mdxSource;
}
