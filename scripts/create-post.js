#!/usr/bin/env node

import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function slugify(text) {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9 -]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.trim("-");
}

function createBlogPost() {
	console.log("📝 Crear nuevo post del blog\n");

	rl.question("Título del post: ", (title) => {
		rl.question("Autor: ", (author) => {
			rl.question("Tags (separados por comas): ", (tagsInput) => {
				rl.question("Excerpt: ", (excerpt) => {
					rl.question("¿Es un post destacado? (y/N): ", (featuredInput) => {
						rl.question("¿Usar MDX? (y/N): ", (mdxInput) => {
							const slug = slugify(title);
							const date = new Date().toISOString().split("T")[0];
							const tags = tagsInput
								.split(",")
								.map((tag) => `"${tag.trim()}"`)
								.join(", ");
							const featured = featuredInput.toLowerCase() === "y";
							const useMdx = mdxInput.toLowerCase() === "y";
							const extension = useMdx ? "mdx" : "md";

							const frontmatter = `---
title: "${title}"
date: "${date}"
author: "${author}"
tags: [${tags}]
excerpt: "${excerpt}"
featured: ${featured}
# updatedAt: "${date}" # Optional: Add this field and update the date when you modify the post
---

# ${title}

Tu contenido aquí...

## Sección de ejemplo

Escribe tu contenido usando Markdown${useMdx ? " o componentes MDX" : ""}.

${
	useMdx
		? `
## Componente de ejemplo

import { Badge } from "@/components/ui/badge"

<Badge variant="default">Ejemplo</Badge>
`
		: ""
}

## Conclusión

Resumen del post...
`;

							const filePath = path.join(process.cwd(), "content", "blog", `${slug}.${extension}`);

							fs.writeFileSync(filePath, frontmatter);

							console.log(`\n✅ Post creado exitosamente: ${filePath}`);
							console.log(`📄 Slug: ${slug}`);
							console.log(`🌐 URL: /blog/${slug}`);

							rl.close();
						});
					});
				});
			});
		});
	});
}

createBlogPost();
