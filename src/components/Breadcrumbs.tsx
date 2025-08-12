"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

// Props para el componente de migas de pan (simplificado sin labelMap)
interface BreadcrumbsProps {
	separator?: string;
	className?: string;
}

// Convierte un slug en texto legible (capitaliza palabras separadas por -)
function humanize(segment: string) {
	return segment
		.toLocaleLowerCase()
		.split("-")
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(" ");
}

const Breadcrumbs = ({ separator = ">", className = "" }: BreadcrumbsProps) => {
	const pathname = usePathname() || "/";
	// Elimina query/hash y divide
	const segments = useMemo(() => pathname.split("?")[0].split("#")[0].split("/").filter(Boolean), [pathname]);

	// items es un arreglo acumulativo que sirve para renderizar cada nivel navegable del breadcrumb
	const items = useMemo(() => {
		const acc: { name: string; href: string }[] = [];
		segments.forEach((seg, idx) => {
			const href = "/" + segments.slice(0, idx + 1).join("/");
			acc.push({ name: humanize(seg), href });
		});
		return acc;
	}, [segments]);

	// JSON-LD (opcional) SEO
	const jsonLd =
		items.length > 0
			? {
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: [
						{
							"@type": "ListItem",
							position: 1,
							name: "Home",
							item: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/`,
						},
						...items.map((it, i) => ({
							"@type": "ListItem",
							position: i + 2,
							name: it.name,
							item: `${process.env.NEXT_PUBLIC_SITE_URL || ""}${it.href}`,
						})),
					],
			  }
			: null;

	return (
		<nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
			<ol className="flex flex-wrap items-center gap-2">
				<li className="inline-flex items-center">
					<Link href="/" className="text-primary hover:underline focus:outline-none focus:underline">
						Home
					</Link>
				</li>
				{items.map((item, idx) => {
					const isLast = idx === items.length - 1;
					return (
						<li key={item.href} className="inline-flex items-center" aria-current={isLast ? "page" : undefined}>
							<span className="px-1 select-none text-muted-foreground">{separator}</span>
							{isLast ? (
								<span className="font-medium text-foreground">{item.name}</span>
							) : (
								<Link href={item.href} className="text-primary hover:underline focus:outline-none focus:underline">
									{item.name}
								</Link>
							)}
						</li>
					);
				})}
			</ol>
			{jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
		</nav>
	);
};
export default Breadcrumbs;
