# ✅ Checklist SEO - Personal Blog

## 📋 Pre-Despliegue

### Configuración Básica

- [ ] Copiar `.env.example` a `.env.local`
- [ ] Configurar `NEXT_PUBLIC_SITE_URL` con dominio real
- [ ] Actualizar `METADATA` en `src/constants/index.ts`
- [ ] Personalizar info RSS en `src/app/feed.xml/route.ts`
- [ ] Actualizar URLs en `public/robots.txt`

### Pruebas Locales

- [ ] Ejecutar `npm run dev`
- [ ] Probar `http://localhost:3000/robots.txt`
- [ ] Probar `http://localhost:3000/sitemap.xml`
- [ ] Probar `http://localhost:3000/feed.xml`
- [ ] Verificar que no haya errores en consola

### Build de Producción

- [ ] Ejecutar `npm run build` sin errores
- [ ] Verificar tamaño del bundle
- [ ] Probar `npm start` localmente

---

## 🚀 Post-Despliegue

### Validación de Endpoints

- [ ] Visitar `https://tu-dominio.com/robots.txt`
- [ ] Visitar `https://tu-dominio.com/sitemap.xml`
- [ ] Visitar `https://tu-dominio.com/feed.xml`
- [ ] Verificar que todos respondan con código 200

### Validadores Online

- [ ] Validar sitemap en [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- [ ] Validar RSS en [W3C Feed Validator](https://validator.w3.org/feed/)
- [ ] Probar robots.txt en [Robots Testing Tool](https://support.google.com/webmasters/answer/6062598)

### Google Search Console

- [ ] Crear cuenta en [Google Search Console](https://search.google.com/search-console)
- [ ] Agregar y verificar tu sitio
- [ ] Enviar sitemap: `https://tu-dominio.com/sitemap.xml`
- [ ] Esperar confirmación de indexación (3-14 días)

### Bing Webmaster Tools (Opcional)

- [ ] Crear cuenta en [Bing Webmaster](https://www.bing.com/webmasters)
- [ ] Agregar y verificar tu sitio
- [ ] Enviar sitemap: `https://tu-dominio.com/sitemap.xml`

---

## 📊 Optimizaciones Adicionales

### Metadata SEO

- [ ] Cada post tiene `title` descriptivo
- [ ] Cada post tiene `excerpt` de 150-160 caracteres
- [ ] Cada post tiene `featuredImage`
- [ ] Tags relevantes en cada post
- [ ] Categorías bien definidas

### Structured Data

- [ ] `BlogPostJsonLd` implementado en posts individuales
- [ ] Breadcrumbs con JSON-LD (opcional)
- [ ] Author schema configurado

### Social Media

- [ ] Open Graph tags configurados
- [ ] Twitter Card tags configurados
- [ ] Imágenes de compartir (1200x630px)

### Performance

- [ ] Imágenes optimizadas (WebP preferentemente)
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3.5s

---

## 🎯 Marketing y Promoción

### RSS Feed

- [ ] Agregar botón "Suscribirse RSS" visible
- [ ] Link a RSS en footer
- [ ] Promocionar RSS en redes sociales

### Content Strategy

- [ ] Plan de publicación definido (frecuencia)
- [ ] Keywords research realizado
- [ ] Calendario editorial creado

### Backlinks

- [ ] Compartir posts en redes sociales
- [ ] Comentar en blogs relacionados
- [ ] Guest posting en otros blogs
- [ ] Directorio de blogs (si aplica)

---

## 📈 Monitoreo (Mensual)

### Google Search Console

- [ ] Revisar impresiones y clics
- [ ] Analizar keywords top
- [ ] Corregir errores de indexación
- [ ] Verificar cobertura de páginas

### Google Analytics (Si está instalado)

- [ ] Revisar tráfico orgánico
- [ ] Analizar páginas más visitadas
- [ ] Verificar tasa de rebote
- [ ] Revisar fuentes de tráfico

### Mantenimiento de Contenido

- [ ] Actualizar posts antiguos
- [ ] Corregir enlaces rotos
- [ ] Añadir enlaces internos
- [ ] Mejorar posts con bajo rendimiento

---

## 🔄 Mantenimiento Trimestral

### Auditoría SEO

- [ ] Ejecutar Lighthouse audit
- [ ] Verificar velocidad de carga
- [ ] Revisar mobile-friendliness
- [ ] Verificar enlaces rotos

### Actualización de Contenido

- [ ] Refrescar posts con mejor tráfico
- [ ] Actualizar screenshots/imágenes antiguas
- [ ] Revisar y actualizar keywords
- [ ] Eliminar/actualizar contenido obsoleto

### Competencia

- [ ] Analizar blogs competidores
- [ ] Identificar gaps de contenido
- [ ] Actualizar estrategia de keywords
- [ ] Mejorar diferenciación

---

## 🆘 Troubleshooting

### Sitemap no se actualiza

- [ ] Hacer rebuild: `npm run build`
- [ ] Verificar cache (purgar si es necesario)
- [ ] Revisar logs de errores

### Google no indexa

- [ ] Verificar robots.txt no bloquee Google
- [ ] Confirmar sitemap en Search Console
- [ ] Esperar más tiempo (puede tardar semanas)
- [ ] Solicitar indexación manual en Search Console

### RSS no funciona

- [ ] Verificar sintaxis XML válida
- [ ] Validar con W3C Feed Validator
- [ ] Revisar configuración de cache
- [ ] Verificar que haya posts publicados

---

## ✅ Estado de Implementación

**Última revisión:** ******\_\_\_******

**Endpoints funcionando:**

- [ ] robots.txt
- [ ] sitemap.xml
- [ ] feed.xml

**Integración con herramientas:**

- [ ] Google Search Console
- [ ] Bing Webmaster Tools
- [ ] Google Analytics

**Metadata completa:**

- [ ] Título del sitio
- [ ] Descripción
- [ ] Keywords
- [ ] Autor
- [ ] Open Graph
- [ ] Twitter Cards

---

## 📝 Notas Adicionales

_Espacio para notas personales, fechas importantes, o recordatorios_

---

---

---

**Creado:** [Fecha]  
**Actualizado:** [Fecha]  
**Próxima revisión:** [Fecha]

---

## 🎉 ¡Felicidades!

Una vez completado este checklist, tu blog estará completamente optimizado para SEO y listo para aparecer en los resultados de búsqueda.

**¡Éxito con tu blog! 🚀**
