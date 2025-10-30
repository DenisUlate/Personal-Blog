# 🚀 Mi Blog Personal

Un blog personal moderno construido con Next.js 15, React 19, TypeScript y Tailwind CSS. Ahora con soporte para Markdown y MDX para crear contenido rico e interactivo.

## ✨ Características

- 🎨 **Diseño moderno** con Tailwind CSS v4
- 🌓 **Tema oscuro/claro** automático
- 📱 **Responsive** para todos los dispositivos
- ⚡ **Optimización de rendimiento** con Next.js 15
- 🔍 **SEO optimizado** con metadatos dinámicos, sitemap y RSS feed
- 🤖 **robots.txt** configurado para motores de búsqueda
- 🗺️ **Sitemap XML dinámico** generado automáticamente
- 📡 **RSS Feed** para suscriptores
- 🎯 **TypeScript** para mayor seguridad de tipos
- 🚀 **App Router** de Next.js
- 📊 **Paginación** inteligente
- 🔄 **Loading states** y manejo de errores
- 📝 **Soporte Markdown/MDX** para contenido rico
- 🎮 **Componentes interactivos** en posts

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **UI Components**: Radix UI
- **Iconos**: Lucide React
- **Fuentes**: Poppins & Source Code Pro (optimizadas)
- **Contenido**: Markdown/MDX con Gray Matter

## 📁 Estructura del Proyecto

```
src/
├── app/                 # App Router de Next.js
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página de inicio
│   ├── sitemap.xml/     # Sitemap dinámico (SEO)
│   ├── feed.xml/        # RSS feed dinámico
│   └── [rutas]/         # Rutas dinámicas
├── components/          # Componentes reutilizables
│   ├── ui/              # Componentes UI base
│   └── layout/          # Componentes de layout
├── constants/           # Constantes de la aplicación
├── data/               # Servicios de datos
├── hooks/              # Custom hooks
├── lib/                # Utilidades y configuraciones
├── styles/             # Estilos globales
├── types/              # Definiciones de tipos
└── utils/              # Funciones auxiliares

content/
└── blog/               # Archivos Markdown/MDX de posts

docs/
├── SEO_IMPLEMENTATION.md    # Guía completa de SEO
├── GUIA_RAPIDA_SEO.md      # Checklist de producción
├── VERIFICACION_SEO.md     # Cómo probar SEO
├── EJEMPLOS_CODIGO_SEO.md  # Componentes adicionales
└── INDEX_SEO.md            # Índice de documentación SEO

public/
└── robots.txt          # Instrucciones para bots de búsqueda
```

## 🚀 Instalación y Uso

1. **Clonar el repositorio**

   ```bash
   git clone [url-del-repo]
   cd personal-blog
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   ```bash
   cp .env.local.example .env.local
   ```

4. **Ejecutar en desarrollo**

   ```bash
   npm run dev
   ```

5. **Construir para producción**
   ```bash
   npm run build
   npm start
   ```

## 📝 Scripts Disponibles

- `npm run dev` - Ejecuta en modo desarrollo
- `npm run build` - Construye para producción
- `npm start` - Ejecuta la versión de producción
- `npm run lint` - Ejecuta ESLint
- `npm run new-post` - Crea un nuevo post de blog

## 📖 Documentación SEO

Este blog incluye optimización SEO completa. Consulta la documentación:

- **[📚 Índice SEO](./docs/INDEX_SEO.md)** - Punto de entrada a toda la documentación
- **[📋 Resumen](./RESUMEN_SEO.md)** - Vista general de lo implementado
- **[⚡ Guía Rápida](./docs/GUIA_RAPIDA_SEO.md)** - Checklist antes de producción
- **[🧪 Verificación](./docs/VERIFICACION_SEO.md)** - Cómo probar SEO
- **[💻 Ejemplos de Código](./docs/EJEMPLOS_CODIGO_SEO.md)** - Componentes adicionales

### Endpoints SEO Disponibles

- `/robots.txt` - Instrucciones para bots
- `/sitemap.xml` - Mapa del sitio (dinámico)
- `/feed.xml` - RSS feed (dinámico)

## 🔧 Configuración

### Variables de Entorno

```env
# URL del sitio (IMPORTANTE para SEO)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# En producción, usar tu dominio real:
# NEXT_PUBLIC_SITE_URL=https://tu-dominio.com

NEXT_PUBLIC_APP_NAME="Mi Blog Personal"
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

> ⚠️ **Importante:** Configura `NEXT_PUBLIC_SITE_URL` con tu dominio real antes de desplegar a producción para que sitemap.xml y feed.xml funcionen correctamente.

### Personalización

1. **Metadatos**: Edita `src/constants/index.ts`
2. **Colores**: Modifica `src/styles/globals.css`
3. **Fuentes**: Cambia en `src/app/layout.tsx`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) por el framework
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de estilos
- [Radix UI](https://radix-ui.com/) por los componentes accesibles
- [Lucide](https://lucide.dev/) por los iconos
