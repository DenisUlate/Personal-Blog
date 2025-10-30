# 🚀 Guía de Implementación SEO

Esta documentación explica cómo se implementó el SEO en el blog y cómo personalizarlo.

## 📋 Archivos Creados

### 1. **robots.txt**

📁 Ubicación: `public/robots.txt`

Este archivo indica a los motores de búsqueda qué páginas pueden rastrear.

**Configuración requerida:**

- Edita las URLs del Sitemap para usar tu dominio real
- Por defecto permite rastrear todo el sitio (`Allow: /`)

```txt
# Cambiar estas líneas con tu dominio real:
Sitemap: https://TU-DOMINIO.com/sitemap.xml
Sitemap: https://TU-DOMINIO.com/feed.xml
```

---

### 2. **sitemap.xml dinámico**

📁 Ubicación: `src/app/sitemap.xml/route.ts`

Genera automáticamente un sitemap XML con todas las páginas del blog.

**¿Qué incluye?**

- Página principal
- Todas las páginas de blog
- Páginas de categorías
- Páginas de tags
- Páginas estáticas (About, Archives, etc.)

**Configuración requerida:**

```typescript
// Línea 22 en route.ts
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tu-dominio.com";
```

**Acceso:** `https://tu-dominio.com/sitemap.xml`

**Características:**

- Se regenera automáticamente al hacer build
- Usa cacheo (1 hora) para mejor rendimiento
- Prioriza páginas según importancia (0.5 a 1.0)
- Indica frecuencia de actualización de cada tipo de página

---

### 3. **RSS Feed dinámico**

📁 Ubicación: `src/app/feed.xml/route.ts`

Genera un feed RSS 2.0 para que los lectores puedan suscribirse a tu blog.

**Configuración requerida:**

```typescript
// Líneas 18-23 en route.ts
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tu-dominio.com";
const SITE_TITLE = "Mi Blog Personal"; // ⚠️ CAMBIAR
const SITE_DESCRIPTION = "Blog sobre desarrollo web..."; // ⚠️ CAMBIAR
const SITE_LANGUAGE = "es-ES";
const AUTHOR_EMAIL = "tu-email@ejemplo.com"; // ⚠️ CAMBIAR
const AUTHOR_NAME = "Tu Nombre"; // ⚠️ CAMBIAR
```

**Acceso:** `https://tu-dominio.com/feed.xml`

**Características:**

- Incluye los últimos 50 posts
- Compatible con lectores RSS (Feedly, Inoreader, etc.)
- Incluye categorías y tags
- Incluye imágenes destacadas
- Cacheo de 30 minutos

---

### 4. **Metadata de RSS en Layout**

📁 Ubicación: `src/app/layout.tsx`

Agregamos metadata al `<head>` para que los navegadores descubran el RSS feed automáticamente.

```typescript
alternates: {
  types: {
    "application/rss+xml": `${METADATA.URL}/feed.xml`,
  },
},
```

---

## 🛠️ Pasos de Configuración

### Paso 1: Configurar Variables de Entorno

1. Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

2. Edita `.env.local` y actualiza:

```bash
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

### Paso 2: Personalizar Información del Blog

Edita `src/constants/index.ts`:

```typescript
export const METADATA = {
	TITLE: "Tu Blog Personal",
	DESCRIPTION: "Descripción de tu blog",
	KEYWORDS: "palabras, clave, relevantes",
	AUTHOR: "Tu Nombre Real",
	URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;
```

### Paso 3: Actualizar RSS Feed

Edita `src/app/feed.xml/route.ts`:

```typescript
const SITE_TITLE = "El Nombre Real de Tu Blog";
const SITE_DESCRIPTION = "Una descripción atractiva";
const AUTHOR_EMAIL = "tu-email@real.com";
const AUTHOR_NAME = "Tu Nombre Completo";
```

### Paso 4: Actualizar robots.txt

Edita `public/robots.txt` y reemplaza `tu-dominio.com` con tu dominio real.

---

## 🧪 Cómo Probar

### En desarrollo local (http://localhost:3000):

1. **Iniciar el servidor:**

```bash
npm run dev
```

2. **Probar robots.txt:**

```
http://localhost:3000/robots.txt
```

3. **Probar sitemap.xml:**

```
http://localhost:3000/sitemap.xml
```

4. **Probar RSS feed:**

```
http://localhost:3000/feed.xml
```

### Validar en producción:

1. **Validar robots.txt:**

   - Ve a: [Google Robots Testing Tool](https://support.google.com/webmasters/answer/6062598)

2. **Validar sitemap.xml:**

   - Ve a: [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
   - O usa Google Search Console

3. **Validar RSS feed:**
   - Ve a: [W3C Feed Validator](https://validator.w3.org/feed/)
   - O usa: [RSS Feed Validator](https://www.rssboard.org/rss-validator/)

---

## 📊 Enviar a Google Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Agrega tu sitio web
3. En el menú lateral, ve a **Sitemaps**
4. Agrega tu sitemap: `https://tu-dominio.com/sitemap.xml`
5. Google comenzará a rastrear tu sitio automáticamente

---

## 🔄 Mantenimiento

### El sitemap y RSS se actualizan automáticamente cuando:

- Agregas un nuevo post
- Modificas un post existente
- Haces rebuild del sitio (`npm run build`)

### Frecuencia de regeneración:

- **En desarrollo:** Cada request
- **En producción:**
  - Sitemap: Caché de 1 hora
  - RSS: Caché de 30 minutos

---

## 💡 Mejores Prácticas

### 1. URLs Canónicas

Asegúrate de usar siempre la misma versión de tu URL (con o sin www):

- ✅ `https://miblog.com`
- ❌ `https://www.miblog.com` (si no es tu principal)

### 2. Mantén el contenido actualizado

- Publica regularmente
- Actualiza posts antiguos con información nueva
- Elimina contenido obsoleto

### 3. Optimiza las imágenes

- Usa imágenes destacadas en todos los posts
- Formatos recomendados: WebP, JPEG optimizado
- Tamaño recomendado: 1200x630px para Open Graph

### 4. Metadata de posts

Asegúrate que cada post tenga:

```yaml
---
title: "Título descriptivo"
excerpt: "Resumen atractivo de 150-160 caracteres"
date: "2024-10-29"
author: "Tu Nombre"
category: "Categoría"
tags: ["tag1", "tag2"]
featured: true
featuredImage: "/images/blog/post-image.jpg"
---
```

---

## 🚨 Problemas Comunes

### El sitemap no se actualiza:

- Haz rebuild: `npm run build`
- Limpia cache: En producción, purga el cache del CDN
- Verifica que el route handler no tenga errores

### El RSS no muestra imágenes:

- Verifica que `featuredImage` tenga URLs completas
- Revisa que las imágenes sean accesibles públicamente

### Google no indexa el sitio:

- Verifica que el sitemap esté en Google Search Console
- Revisa `robots.txt` - asegúrate que no bloqueé Google
- Da tiempo: puede tomar días o semanas

---

## 📚 Recursos Adicionales

- [Guía de Sitemaps de Google](https://developers.google.com/search/docs/advanced/sitemaps/overview)
- [RSS 2.0 Specification](https://www.rssboard.org/rss-specification)
- [Robots.txt Specification](https://developers.google.com/search/docs/advanced/robots/intro)
- [Next.js SEO Documentation](https://nextjs.org/learn/seo/introduction-to-seo)

---

## ✅ Checklist de Producción

Antes de desplegar a producción:

- [ ] Actualizar `NEXT_PUBLIC_SITE_URL` en `.env.local` o variables de entorno
- [ ] Actualizar `robots.txt` con el dominio real
- [ ] Personalizar información del RSS feed en `feed.xml/route.ts`
- [ ] Verificar metadata en `src/constants/index.ts`
- [ ] Probar todos los endpoints localmente
- [ ] Hacer build de producción: `npm run build`
- [ ] Validar sitemap.xml y feed.xml con validadores online
- [ ] Agregar sitemap a Google Search Console
- [ ] Configurar Google Analytics (opcional)

---

## 🎉 ¡Listo!

Tu blog ahora tiene:

- ✅ robots.txt configurado
- ✅ Sitemap XML dinámico
- ✅ RSS Feed funcional
- ✅ Metadata SEO optimizada

¡Tu blog está listo para ser descubierto por motores de búsqueda y lectores RSS!
