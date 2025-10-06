# 🔧 Configuración de Variables de Entorno

Este documento explica cómo configurar las variables de entorno para el proyecto.

## 📋 Configuración Inicial

### 1. Crear archivo .env.local

Copia el archivo `.env.example` y renómbralo a `.env.local`:

```bash
# En PowerShell
Copy-Item .env.example .env.local

# En Git Bash / Linux / Mac
cp .env.example .env.local
```

### 2. Configurar las variables

Edita `.env.local` y ajusta los valores según tu entorno:

#### Para Desarrollo Local:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Para Producción:

```env
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

**⚠️ IMPORTANTE:**

- No incluyas la barra final (`/`) en la URL
- Usa `https://` en producción, no `http://`

## 🌐 Variables Disponibles

### NEXT_PUBLIC_SITE_URL

**Requerida**: Sí  
**Uso**: JSON-LD, SEO, URLs canónicas  
**Ejemplo**: `https://mi-blog.com`

**¿Dónde se usa?**

- Breadcrumbs (migas de pan)
- JSON-LD para artículos
- Metadatos de SEO
- URLs canónicas

### NEXT_PUBLIC_APP_NAME

**Requerida**: No  
**Uso**: Nombre de la aplicación  
**Ejemplo**: `"Mi Blog Personal"`

### NEXT_PUBLIC_API_URL

**Requerida**: No (si no usas API externa)  
**Uso**: URL base de tu API  
**Ejemplo**: `https://api.mi-blog.com`

## 🚀 Despliegue en Producción

### Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega: `NEXT_PUBLIC_SITE_URL` con tu dominio de producción

### Netlify

1. Ve a tu proyecto en Netlify
2. Site settings → Build & deploy → Environment
3. Agrega: `NEXT_PUBLIC_SITE_URL` con tu dominio de producción

### Otras Plataformas

Consulta la documentación de tu servicio de hosting para configurar variables de entorno.

## 🔍 Verificar JSON-LD

Para verificar que el JSON-LD se genera correctamente:

1. Abre tu blog en el navegador
2. Ve a un artículo individual
3. Inspecciona el código fuente (Ctrl+U o Cmd+U)
4. Busca `<script type="application/ld+json">`
5. Deberías ver dos bloques:
   - Breadcrumbs (en el componente de navegación)
   - BlogPosting (en el artículo)

### Validar con Google

Usa la herramienta oficial de Google:
https://search.google.com/test/rich-results

Pega la URL de tu artículo y verifica que no haya errores.

## ❓ Preguntas Frecuentes

### ¿Por qué .env.local no está en Git?

Por seguridad. Este archivo puede contener claves API y datos sensibles. El archivo `.env.example` sirve como plantilla.

### ¿Qué pasa si no configuro NEXT_PUBLIC_SITE_URL?

El código usa un fallback a `http://localhost:3000`, pero **debes configurarlo en producción** para que el SEO funcione correctamente.

### ¿Puedo tener diferentes URLs por ambiente?

Sí, puedes crear:

- `.env.development.local` para desarrollo
- `.env.production.local` para producción
- `.env.test.local` para pruebas

Next.js automáticamente cargará el archivo correcto según `NODE_ENV`.

## 📚 Recursos Adicionales

- [Next.js - Variables de Entorno](https://nextjs.org/docs/basic-features/environment-variables)
- [Google - Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Schema.org - BlogPosting](https://schema.org/BlogPosting)
