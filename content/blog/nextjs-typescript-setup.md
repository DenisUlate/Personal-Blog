---
title: "Configurando un proyecto Next.js con TypeScript"
date: "2025-01-20"
author: "Denis Ulate"
tags: ["nextjs", "typescript", "tutorial"]
excerpt: "Aprende a configurar un proyecto moderno de Next.js con TypeScript desde cero"
featured: false
---

# Configurando un proyecto Next.js con TypeScript

En este post te enseñaré cómo configurar un proyecto moderno de Next.js con TypeScript.

## Instalación inicial

Primero, creamos un nuevo proyecto:

```bash
npx create-next-app@latest mi-proyecto --typescript --tailwind --eslint
```

## Configuración de TypeScript

Next.js viene con configuración automática de TypeScript, pero podemos personalizarla:

```json
{
	"compilerOptions": {
		"target": "es5",
		"lib": ["dom", "dom.iterable", "es6"],
		"allowJs": true,
		"skipLibCheck": true,
		"strict": true,
		"forceConsistentCasingInFileNames": true,
		"noEmit": true,
		"esModuleInterop": true,
		"module": "esnext",
		"moduleResolution": "node",
		"resolveJsonModule": true,
		"isolatedModules": true,
		"jsx": "preserve",
		"incremental": true,
		"plugins": [
			{
				"name": "next"
			}
		],
		"baseUrl": ".",
		"paths": {
			"@/*": ["./src/*"]
		}
	},
	"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
	"exclude": ["node_modules"]
}
```

## Estructura recomendada

```
src/
  app/
    layout.tsx
    page.tsx
  components/
    ui/
  lib/
  types/
```

## Conclusión

Con esta configuración tendrás una base sólida para desarrollar aplicaciones modernas con Next.js y TypeScript.
