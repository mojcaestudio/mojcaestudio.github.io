// ========================================
// MOJCA ESTUDIO — Main JavaScript
// ========================================

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkjnkdvl";

const DEFAULT_DATA = {
    sections: {
        hero: true,
        marquee: true,
        sobre: true,
        quienesSomos: true,
        testimonios: true,
        videos: true,
        reels: true,
        fotos: true,
        branding: true,
        redes: true,
        webdev: true,
        proceso: true,
        contacto: true
    },
    texts: {
        logoText: "MOJCA",
        heroLabel: "Estudio Creativo",
        heroTitle: "DAMOS VIDA A TUS IDEAS CON DISEÑO, CREATIVIDAD Y ESTRATEGIA VISUAL",
        heroSub: "Creamos contenido que se ve, se siente y se comparte.",
        sobreTag: "Sobre Nosotros",
        sobreTitle: "Damos vida a ideas a través de la imagen",
        sobreSubtitle: "Un estudio donde la técnica se encuentra con la sensibilidad artística",
        quienesTag: "El Equipo",
        quienesTitle: "Quiénes Somos",
        quienesSubtitle: "Las personas detrás de cada proyecto",
        stat1: "50+",
        stat1Label: "Proyectos Realizados",
        stat2: "30+",
        stat2Label: "Clientes Satisfechos",
        stat3: "5",
        stat3Label: "Años de Trayectoria",
        stat4: "12",
        stat4Label: "Premios y Reconocimientos",
        contactEmail: "mojcaestudio@gmail.com",
        contactLocation: "Villa María, Córdoba, Argentina",
        footerText: "Diseño, creatividad y estrategia visual con alma artesanal."
    },
    style: {
        heroFontSize: "clamp(34px, 5.2vw, 68px)",
        heroFontFamily: "'Space Grotesk', sans-serif",
        bodyFontFamily: "'Inter', sans-serif",
        accentColor: "#ff6b35",
        accentLight: "#ff8c42",
        bgDark: "#0a0a0a",
        bgPanel: "#111111",
        bgCard: "#161616",
        textPrimary: "#f0f0f0",
        textSecondary: "#a0a0a0",
        textMuted: "#666666",
        borderColor: "#2a2a2a"
    },
    hero: {
        videoSrc: "",
        glassEnabled: true,
        glassBlur: "20px",
        glassOpacity: "0.15",
        glassBorder: "1px solid rgba(255,255,255,0.1)",
        overlayEnabled: true,
        overlayColor: "rgba(10,10,10,0.4)",
        textShadow: "0 4px 30px rgba(0,0,0,0.5)"
    },
    quienesSomos: {
        enabled: true,
        members: [
            { id: "m1", name: "María López", role: "Directora Creativa", photo: "", tags: ["Dirección", "Branding"], description: "Transforma ideas en experiencias visuales memorables." },
            { id: "m2", name: "Juan Pérez", role: "Productor Audiovisual", photo: "", tags: ["Video", "Fotografía"], description: "Especialista en contar historias a través del lente cinematográfico." }
        ]
    },
    testimonios: {
        enabled: true,
        items: [
            { id: "t1", nombre: "María González", empresa: "Marca X", texto: "Trabajar con Mojca fue una experiencia transformadora. Entendieron exactamente lo que necesitábamos.", avatar: "" },
            { id: "t2", nombre: "Carlos Rodríguez", empresa: "Startup Y", texto: "La atención al detalle y la creatividad que ponen en cada proyecto es impresionante.", avatar: "" }
        ]
    },
    videosHorizontal: [
        { id: "vh1", src: "", title: "Spot Comercial — Marca X", description: "Campaña de lanzamiento con rodaje y color grading.", views: "12.4K", likes: "856", tag: "Comercial" },
        { id: "vh2", src: "", title: "Video Musical — Artista Y", description: "Concepto visual y dirección de arte.", views: "45.2K", likes: "2.1K", tag: "Musical" },
        { id: "vh3", src: "", title: "Corporativo — Empresa Z", description: "Video institucional con tomas aéreas.", views: "8.7K", likes: "423", tag: "Corporativo" },
        { id: "vh4", src: "", title: "Documental — Proyecto Social", description: "Cobertura de 3 días y edición narrativa.", views: "3.1K", likes: "189", tag: "Documental" }
    ],
    videosVertical: [
        { id: "vv1", src: "", title: "Behind the Scenes", description: "Un día de rodaje en estudio", views: "89K", likes: "4.2K" },
        { id: "vv2", src: "", title: "Tutorial de Color", description: "Antes y después de grading", views: "156K", likes: "8.7K" },
        { id: "vv3", src: "", title: "Transiciones Creativas", description: "Edición con speed ramps", views: "234K", likes: "12K" }
    ],
    photos: [
        { id: "p1", src: "", title: "Campaña Skincare", category: "producto", size: "1x1", description: "Iluminación suave y texturas de producto para ecommerce." },
        { id: "p2", src: "", title: "Retrato Editorial", category: "retrato", size: "1x2", description: "Fotografía de estudio con luz de recorte y contrastes altos." },
        { id: "p3", src: "", title: "Evento Nocturno", category: "evento", size: "1x1", description: "" },
        { id: "p4", src: "", title: "Urban Lifestyle", category: "lifestyle", size: "1x1", description: "Toma urbana en luz natural con atmósfera cinematográfica." }
    ],
    branding: [],
    redes: [],
    webdev: [],
    whatsapp: {
        number: "5493534000000",
        message: "Hola Mojca Estudio",
        floatEnabled: true,
        floatLabel: "Escribinos"
    }
};

function getData() {
    try {
        const saved = localStorage.getItem('mojcaData');
        if (saved) {
            const parsed = JSON.parse(saved);
            return deepMerge(JSON.parse(JSON.stringify(DEFAULT_DATA)), parsed);
        }
    } catch (e) {
        console.error('Error cargando localStorage:', e);
    }
    localStorage.setItem('mojcaData', JSON.stringify(DEFAULT_DATA));
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function deepMerge(defaults, saved) {
    const result = JSON.parse(JSON.stringify(defaults));
    for (const key in saved) {
        if (saved[key] !== null && typeof saved[key] === 'object' && !Array.isArray(saved[key])) {
            result[key] = deepMerge(defaults[key] || {}, saved[key]);
        } else {
            result[key] = saved[key];
        }
    }
    return result;
}

// Convertidor e integrador de enlaces de video (Google Drive, YouTube, Vimeo, MP4)
function createMediaElement(src, label, type) {
    if (!src || src.trim() === '') return placeholderHTML(label, type === 'video' ? 'video' : 'image');

    // Integración Google Drive
    if (src.includes('drive.google.com')) {
        const driveIdMatch = src.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || src.match(/id=([a-zA-Z0-9_-]+)/);
        if (driveIdMatch && driveIdMatch[1]) {
            const embedUrl = `https://drive.google.com/file/d/${driveIdMatch[1]}/preview`;
            return `<iframe src="${embedUrl}" width="100%" height="100%" allow="autoplay" frameborder="0" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;"></iframe>`;
        }
    }

    // YouTube
    if (src.includes('youtube.com') || src.includes('youtu.be')) {
        const ytMatch = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
        if (ytMatch && ytMatch[1]) {
            return `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${ytMatch[1]}?mute=1&loop=1&playlist=${ytMatch[1]}&controls=0&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;"></iframe>`;
        }
    }

    // Vimeo
    if (src.includes('vimeo.com')) {
        const vimeoMatch = src.match(/vimeo\.com\/(\d+)/);
        if (vimeoMatch && vimeoMatch[1]) {
            return `<iframe src="https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1&background=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;"></iframe>`;
        }
    }

    // Video directo (MP4, WebM)
    if (type === 'video' || src.match(/\.(mp4|webm|ogg)$/i)) {
        return `<video src="${src}" muted loop playsinline preload="metadata" controlsList="nodownload noplaybackrate" disablePictureInPicture oncontextmenu="return false;" style="width:100%;height:100%;object-fit:cover;display:block;"></video>`;
    }

    return `<img src="${src}" alt="${label}" oncontextmenu="return false;" draggable="false" style="width:100%;height:100%;object-fit:cover;display:block;">`;
}

function placeholderHTML(label, iconType) {
    const icons = {
        image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`,
        video: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`
    };
    return `<div class="ph-inner">${icons[iconType] || icons.image}<span>${label}</span></div>`;
}

function applyDynamicStyles(data) {
    const s = data.style;
    const styleEl = document.getElementById('dynamic-styles') || document.createElement('style');
    styleEl.id = 'dynamic-styles';
    styleEl.textContent = `
        .hero-title, .section-title, .logo, .stat-num { font-family: ${s.heroFontFamily} !important; }
        body, p, span, a, input, select, textarea { font-family: ${s.bodyFontFamily} !important; }
        :root {
            --accent: ${s.accentColor} !important;
            --accent-light: ${s.accentLight} !important;
            --bg: ${s.bgDark} !important;
            --bg-elevated: ${s.bgPanel} !important;
            --bg-card: ${s.bgCard} !important;
            --text-primary: ${s.textPrimary} !important;
            --text-secondary: ${s.textSecondary} !important;
            --text-muted: ${s.textMuted} !important;
            --border: ${s.borderColor} !important;
        }
    `;
    document.head.appendChild(styleEl);
}

// Transición de fondo suave por activación de placas superpuestas
function initBackgroundGradient() {
    const plates = document.querySelectorAll('.bg-color-plate');
    const sections = document.querySelectorAll('.section-bg');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetBg = entry.target.getAttribute('data-bg');
                plates.forEach(plate => {
                    plate.classList.toggle('active', plate.getAttribute('data-plate') === targetBg);
                });
            }
        });
    }, { 
        threshold: 0.25,
        rootMargin: "-10% 0px -10% 0px"
    });

    sections.forEach(s => observer.observe(s));
}

function initHero(data) {
    const heroVideoBg = document.getElementById('heroVideoBg');
    const heroVideo = document.getElementById('heroVideo');
    const heroGlass = document.getElementById('heroGlass');
    const heroOverlay = document.getElementById('heroVideoOverlay');
    const heroContent = document.querySelector('.hero-content');
    const h = data.hero;
    if (!heroVideoBg || !heroVideo) return;
    if (h.videoSrc && h.videoSrc.trim() !== '') {
        heroVideoBg.innerHTML = createMediaElement(h.videoSrc, 'Hero Video', 'video');
        heroVideoBg.style.display = 'block';
    } else {
        heroVideoBg.style.display = 'none';
    }
    if (heroOverlay && h.overlayEnabled) {
        heroOverlay.style.background = h.overlayColor;
        heroOverlay.style.display = 'block';
    }
    if (heroGlass && h.glassEnabled) {
        heroGlass.style.display = 'block';
        heroGlass.style.backdropFilter = `blur(${h.glassBlur})`;
        heroGlass.style.background = `rgba(255,255,255,${h.glassOpacity})`;
    }
}

function renderTexts(data) {
    document.querySelectorAll('[data-editable]').forEach(el => {
        const key = el.getAttribute('data-editable');
        if (data.texts[key]) el.innerHTML = data.texts[key].replace(/\n/g, '<br>');
    });
}

function renderVideosHorizontal(data) {
    const track = document.getElementById('carousel-horizontal');
    if (!track) return;
    track.innerHTML = data.videosHorizontal.map(v => `
        <div class="video-card-large" data-video-id="${v.id}">
            <div class="video-thumb-large">
                <div class="img-placeholder landscape" data-label="${v.title}">${createMediaElement(v.src, v.title, 'video')}</div>
                <div class="video-play-overlay"><div class="play-circle"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></div></div>
            </div>
            <div class="video-meta">
                <h4>${v.title}</h4>
                <p>${v.description}</p>
                <div class="video-metrics">
                    <span class="metric tag">${v.tag}</span>
                    <span class="metric">${v.views} views</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderVideosVertical(data) {
    const track = document.getElementById('carousel-vertical');
    if (!track) return;
    track.innerHTML = data.videosVertical.map(v => `
        <div class="video-card-vertical" data-video-id="${v.id}">
            <div class="video-thumb-vertical">
                <div class="img-placeholder portrait" data-label="${v.title}">${createMediaElement(v.src, v.title, 'video')}</div>
                <div class="video-play-overlay"><div class="play-circle-small"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></div></div>
            </div>
            <div class="video-meta-v">
                <h4>${v.title}</h4>
                <p>${v.description}</p>
            </div>
        </div>
    `).join('');
}

// Renderizado de Galería y Modal Lightbox con Glassmorphism
function renderPhotos(data, filter) {
    const grid = document.getElementById('photoGrid');
    if (!grid) return;
    const photos = filter === 'all' ? data.photos : data.photos.filter(p => p.category === filter);
    grid.innerHTML = photos.map(p => `
        <div class="photo-item size-${p.size}" data-id="${p.id}" data-category="${p.category}">
            <div class="photo-frame">
                <div class="img-placeholder square" data-label="${p.title}">${createMediaElement(p.src, p.title, 'image')}</div>
            </div>
            <div class="photo-overlay">
                <h4>${p.title}</h4>
                <p>${p.category}</p>
            </div>
        </div>
    `).join('');

    // Listener para abrir el Modal
    grid.querySelectorAll('.photo-item').forEach(item => {
        item.addEventListener('click', () => {
            const photoId = item.getAttribute('data-id');
            const photo = data.photos.find(p => p.id === photoId);
            if (photo) openPhotoModal(photo);
        });
    });
}

function openPhotoModal(photo) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('photoModalImg');
    const modalInfo = document.getElementById('photoModalInfo');
    const modalTitle = document.getElementById('photoModalTitle');
    const modalTag = document.getElementById('photoModalTag');
    const modalDesc = document.getElementById('photoModalDesc');

    if (!modal || !modalImg) return;

    modalImg.src = photo.src;
    
    // Si tiene información adicional, mostramos el panel glass; si no, lo ocultamos
    if ((photo.description && photo.description.trim() !== '') || photo.title) {
        modalInfo.style.display = 'flex';
        modalTitle.textContent = photo.title || '';
        modalTag.textContent = photo.category || 'Fotografía';
        modalDesc.textContent = photo.description || '';
    } else {
        modalInfo.style.display = 'none';
    }

    modal.classList.add('active');
}

function initPhotoModal() {
    const modal = document.getElementById('photoModal');
    const closeBtn = document.getElementById('photoModalClose');
    if (!modal) return;

    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        status.className = 'form-status';

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                status.textContent = '¡Mensaje enviado con éxito!';
                status.className = 'form-status success';
                form.reset();
            } else {
                throw new Error();
            }
        } catch (err) {
            status.textContent = 'Hubo un error al enviar. Intentá nuevamente.';
            status.className = 'form-status error';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar mensaje';
        }
    });
}

class InfiniteCarousel {
    constructor(outerEl) {
        this.outer = outerEl;
        this.wrapper = outerEl.querySelector('.carousel-track-wrapper');
        this.track = outerEl.querySelector('.carousel-track');
        this.prevBtn = outerEl.querySelector('.carousel-btn.prev');
        this.nextBtn = outerEl.querySelector('.carousel-btn.next');
        this.items = [];
        this.currentIndex = 0;
        this.itemWidth = 0;
        this.gap = 20;
        this.autoplayInterval = null;
        this.init();
    }
    init() {
        if (!this.track || this.track.children.length === 0) return;
        this.cloneItems();
        this.updateDimensions();
        this.bindEvents();
        this.startAutoplay();
    }
    cloneItems() {
        const original = Array.from(this.track.children);
        original.forEach(item => { const clone = item.cloneNode(true); this.track.appendChild(clone); });
        for (let i = original.length - 1; i >= 0; i--) { const clone = original[i].cloneNode(true); this.track.insertBefore(clone, this.track.firstChild); }
        this.items = Array.from(this.track.children);
        this.currentIndex = original.length;
        this.updatePosition(false);
    }
    updateDimensions() {
        if (this.items.length === 0) return;
        this.itemWidth = this.items[0].offsetWidth + this.gap;
        this.updatePosition(false);
    }
    updatePosition(animate = true) {
        this.track.style.transition = animate ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
        this.track.style.transform = `translateX(${-this.currentIndex * this.itemWidth}px)`;
    }
    next() { this.currentIndex++; this.updatePosition(true); this.checkBounds(); }
    prev() { this.currentIndex--; this.updatePosition(true); this.checkBounds(); }
    checkBounds() {
        const count = this.items.length / 3;
        setTimeout(() => {
            if (this.currentIndex >= count * 2) { this.currentIndex = count; this.updatePosition(false); }
            else if (this.currentIndex < count) { this.currentIndex = count * 2 - 1; this.updatePosition(false); }
        }, 500);
    }
    bindEvents() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
        window.addEventListener('resize', () => this.updateDimensions());
    }
    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.next(), 3500);
        this.outer.addEventListener('mouseenter', () => clearInterval(this.autoplayInterval));
        this.outer.addEventListener('mouseleave', () => this.startAutoplay());
    }
}

function init() {
    const data = getData();
    applyDynamicStyles(data);
    renderTexts(data);
    initHero(data);
    renderVideosHorizontal(data);
    renderVideosVertical(data);
    renderPhotos(data, 'all');
    initPhotoModal();
    initContactForm();
    initBackgroundGradient();
    document.querySelectorAll('.carousel-outer').forEach(outer => new InfiniteCarousel(outer));
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
