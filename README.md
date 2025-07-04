# 🚀 Mi Blog Personal

Un blog personal moderno construido con Next.js 15, React 19, TypeScript y Tailwind CSS.

## ✨ Características

- 🎨 **Diseño moderno** con Tailwind CSS v4
- 🌓 **Tema oscuro/claro** automático
- 📱 **Responsive** para todos los dispositivos
- ⚡ **Optimización de rendimiento** con Next.js 15
- 🔍 **SEO optimizado** con metadatos dinámicos
- 🎯 **TypeScript** para mayor seguridad de tipos
- 🚀 **App Router** de Next.js
- 📊 **Paginación** inteligente
- 🔄 **Loading states** y manejo de errores

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **UI Components**: Radix UI
- **Iconos**: Lucide React
- **Fuentes**: Poppins & Source Code Pro (optimizadas)

## 📁 Estructura del Proyecto

```
src/
├── app/                 # App Router de Next.js
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página de inicio
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

## 🔧 Configuración

### Variables de Entorno

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Mi Blog Personal"
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

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
