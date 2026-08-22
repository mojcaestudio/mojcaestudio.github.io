# 🎬 Mojca Estudio — Portfolio

Portafolio moderno y responsive para Mojca Estudio. Diseñado para publicarse en **GitHub Pages** de forma gratuita.

## 🚀 Estructura del sitio

| Sección | Descripción |
|---------|-------------|
| **Inicio (Hero)** | Video de fondo + título + CTAs |
| **Sobre Nosotros** | Historia, estadísticas, imagen del equipo |
| **Audiovisual** | Galería de videos con lightbox (YouTube/Vimeo) |
| **Fotografía** | Galería masonry con filtros por categoría y lightbox |
| **Branding** | Casos de estudio con tags |
| **Redes Sociales** | Feed estilo Instagram con likes interactivos y comentarios |
| **Web & Código** | Proyectos de desarrollo web con stack técnico |
| **Contacto** | Formulario + info de contacto |

## 📁 Estructura de archivos

```
├── index.html          # Página principal (todo en una página)
├── css/
│   └── style.css       # Estilos completos
├── js/
│   └── main.js         # Interactividad
├── assets/
│   ├── images/         # Tus fotos y screenshots
│   └── videos/         # Videos locales (opcional)
└── README.md
```

## 🛠️ Configuración necesaria

### 1. Reemplazar imágenes placeholder

Necesitás agregar tus propias imágenes en `assets/images/`. Los nombres que espera el sitio:

| Archivo | Uso |
|---------|-----|
| `hero-poster.jpg` | Poster del video del hero |
| `sobre-estudio.jpg` | Foto del equipo/estudio |
| `video-1.jpg` a `video-3.jpg` | Thumbnails de videos audiovisuales |
| `foto-1.jpg` a `foto-6.jpg` | Fotos para la galería |
| `branding-1.jpg` a `branding-3.jpg` | Proyectos de branding |
| `redes-1.jpg` a `redes-3.jpg` | Posts para el feed de redes |
| `web-1.jpg` a `web-3.jpg` | Screenshots de proyectos web |
| `logo-mojca.jpg` | Logo para avatar del feed |

> 💡 **Tip:** Convertí tus fotos a **WebP** para que carguen más rápido. Usá [squoosh.app](https://squoosh.app) gratis.

### 2. Configurar videos

En la sección Audiovisual, los videos usan **embeds de YouTube**. Reemplazá los links en `index.html`:

```html
<a href="https://www.youtube.com/watch?v=TU_VIDEO_ID" class="video-card glightbox">
```

Si querés usar videos propios, subilos a YouTube o Vimeo y usá los embeds.

### 3. Configurar Formspree (formulario de contacto)

1. Andá a [formspree.io](https://formspree.io)
2. Creá un formulario gratis
3. Copiá tu endpoint (ej: `https://formspree.io/f/xnqkvpzy`)
4. Reemplazalo en `index.html`:

```html
<form action="https://formspree.io/f/TU_ENDPOINT" method="POST">
```

### 4. Configurar Disqus (comentarios en Redes)

1. Andá a [disqus.com](https://disqus.com)
2. Creá un sitio nuevo (ej: `mojcaestudio`)
3. El código ya está en `index.html`, solo tenés que cambiar el nombre del sitio:

```javascript
s.src = 'https://TU_SITIO.disqus.com/embed.js';
```

> ⚠️ **Nota:** Disqus permite un solo thread por página. Los "comentarios por post" se muestran como un único feed general.

### 5. Personalizar contenido

Editá `index.html` y cambiá:
- Textos de cada sección
- Nombres de proyectos
- Links a redes sociales (footer y contacto)
- Stats del estudio (números en Sobre Nosotros)

## 🚀 Subir a GitHub Pages

### Paso 1: Crear repositorio
1. Andá a [github.com](https://github.com)
2. Creá un repositorio llamado `mojcaestudio.github.io`
3. Marcá "Add a README"

### Paso 2: Subir archivos
```bash
git clone https://github.com/tuusuario/mojcaestudio.github.io.git
cd mojcaestudio.github.io
# Copiá todos los archivos de esta carpeta acá
git add .
git commit -m "Primer commit del portafolio"
git push origin main
```

O subilos manualmente desde la interfaz web de GitHub.

### Paso 3: Activar GitHub Pages
1. En tu repo, andá a **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Guardá y esperá 1-2 minutos

Tu sitio estará en: `https://mojcaestudio.github.io`

### Paso 4: Dominio personalizado (opcional)
Si querés usar `mojcaestudio.com`:
1. En **Settings → Pages → Custom domain** agregá tu dominio
2. Creá un archivo `CNAME` en la raíz con: `mojcaestudio.com`
3. Configurá los DNS de tu proveedor apuntando a GitHub Pages

## 🎨 Personalización de estilos

Los colores principales están en `css/style.css` al inicio:

```css
:root {
    --bg: #0a0a0a;           /* Fondo */
    --accent: #ff6b35;       /* Color principal (coral/naranja) */
    --text-primary: #f5f5f5; /* Texto principal */
}
```

Cambiá `--accent` para otro color de marca.

## 📱 Responsive

El sitio está optimizado para:
- Desktop (1200px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

Incluye menú hamburguesa, grids adaptativas y tipografía fluida.

## 📝 Licencia

Uso libre para Mojca Estudio.
