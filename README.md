# Mojca Estudio — Sitio Web + Panel de Administracion

## Estructura del proyecto

```
mojca-portfolio/
├── index.html      # Pagina principal (lo que ven los visitantes)
├── style.css       # Estilos del sitio (dark modern)
├── main.js         # Logica del sitio (carruseles, datos, formulario)
├── admin.html      # Panel de administracion
├── admin.js        # Logica del panel
└── README.md       # Este archivo
```

---

## Como usar el sitio

1. **Abri `index.html`** en tu navegador (doble clic o con Live Server).
2. Navega por las secciones: Inicio, Nosotros, Audiovisual, Fotografia, Branding, Redes, Web y Contacto.
3. El sitio es completamente responsive: funciona en celular, tablet, 1080p, 2K y 4K.

---

## Como acceder al panel de administracion

1. **Abri `admin.html`** en tu navegador.
2. **Ingresa la contrasena:** `mojca2024`
3. Desde alli podes editar todo sin tocar codigo:
   - **Textos del Sitio** — Titulos, subtitulos, stats, email, footer, etc.
   - **Videos Horizontales / Reels Verticales** — Agrega, edita o elimina videos.
   - **Fotografia** — Grilla visual. Hace clic en cualquier celda para editar imagen, titulo, categoria y tamano.
   - **Branding / Redes / Web y Codigo** — Mismo sistema de edicion inline o agregar nuevos con el boton "+".

### ¿Es visible el admin para cualquiera?

**No.** El panel esta protegido por contrasena. Solo quien conozca la clave (`mojca2024`) puede entrar. Los visitantes normales del sitio no ven ningun enlace al admin.

> **Nota:** Si queres cambiar la contrasena, abri la consola del navegador en `admin.html` y ejecuta:
> ```js
> localStorage.setItem('mojcaAdminPass', 'tuNuevaClave')
> ```

---

## Como funciona el guardado

Los datos se guardan en el **localStorage del navegador**. Esto significa:

- **Ventaja:** Podes editar todo desde el admin y ver los cambios instantaneamente en `index.html` (si los abris en el mismo navegador).
- **Limitacion:** Cada persona que visite tu sitio desde su propia computadora vera los datos que tenga guardados en SU navegador. Para que todos vean lo mismo, necesitas un backend (no es posible con GitHub Pages solo).

**Para publicar con tus datos editados:**
1. Edita todo desde el admin.
2. Abri la consola del navegador y ejecuta:
   ```js
   copy(localStorage.getItem('mojcaData'))
   ```
3. Eso copia un JSON. Pegalo en el archivo `main.js`, reemplazando la constante `DEFAULT_DATA`.
4. Sube los archivos a GitHub Pages.

---

## Formulario de contacto

El formulario de contacto **no usa Formspree ni ningun servicio externo**. Al enviar, abre el cliente de correo del usuario (Outlook, Gmail, Apple Mail, etc.) con un mensaje pre-armado dirigido a:

```
mojcaestudio@gmail.com
```

El usuario solo tiene que apretar "Enviar" en su cliente de correo.

---

## Funcionalidades del sitio

| Feature | Como funciona |
|---|---|
| **Panel de Admin** | Entra a `admin.html`. Contrasena: `mojca2024`. Edita todo sin tocar codigo. |
| **Agregar elementos** | En cada seccion del panel hay un boton **"+"**. Apretas, completas el formulario y listo. |
| **Editar textos** | Seccion "Textos del Sitio" en el panel. Edita todo el copy desde campos de texto. |
| **Videos con audio controlado** | Se reproducen **muteados y en loop** automaticamente. Al hacer **click** en uno, se activa el volumen bajo (30%). Si haces click en otro video o fuera del carrusel, se silencia de nuevo. |
| **Carruseles infinitos** | Los videos pasan solos cada 3 segundos. Al poner el mouse encima o empezar a arrastrar, se pausa. Botones de anterior/siguiente aparecen al pasar el mouse. Tambien se puede **deslizar con el dedo/mouse** para moverlos. |
| **Fondo degradado** | Cada seccion tiene un color de fondo distinto que va cambiando suavemente a medida que scrolleas. |
| **Responsive 2K/4K** | El contenedor se expande hasta 2200px en pantallas grandes. Ya no queda todo centrado con bordes vacios. |
| **Grilla de fotos sin huecos** | Usa `grid-auto-flow: dense` para que las imagenes se acomoden automaticamente ocupando todos los espacios. En el panel admin podes elegir el tamano de cada foto (1x1, 1x2, 2x1, 2x2, etc.) |
| **Descripciones por seccion** | Cada seccion tiene un texto elegante y reflexivo que explica que hace Mojca en esa area. |

---

## Como subir a GitHub Pages

1. Descarga el ZIP y descomprimilo.
2. Sube los 5 archivos (`index.html`, `style.css`, `main.js`, `admin.html`, `admin.js`) a tu repo `mojcaestudio.github.io`.
3. La pagina principal es `index.html`.
4. Para entrar al panel admin, anda a: `https://mojcaestudio.com/admin.html` (o tu dominio correspondiente).
5. Activa GitHub Pages en Settings → Pages → main branch.

---

## Fuentes usadas

- **Space Grotesk** — Titulos y display
- **Inter** — Texto body y UI

---

## Paleta de colores

- Fondo: `#0a0a0a`
- Tarjetas: `#161616`
- Texto principal: `#f0f0f0`
- Texto secundario: `#a0a0a0`
- Acento naranja: `#ff6b35`

---

Hecho con pasion en Buenos Aires — 2026 Mojca Estudio.
