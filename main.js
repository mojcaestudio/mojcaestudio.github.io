// ========================================
// MOJCA ESTUDIO — Main JavaScript (Limpio y Funcional)
// ========================================

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkjnkdvl";

const DEFAULT_DATA = {
    sections: { hero: true, marquee: true, sobre: true, quienesSomos: true, testimonios: true, audiovisual: true, fotos: true, branding: true, redes: true, webdev: true, proceso: true, contacto: true },
    texts: {
        logoText: "MOJCA", heroLabel: "Estudio Creativo", heroTitle: "DAMOS VIDA A TUS IDEAS CON DISEÑO, CREATIVIDAD Y ESTRATEGIA VISUAL", heroSub: "Creamos contenido que se ve, se siente y se comparte.",
        sobreTag: "Sobre Nosotros", sobreTitle: "Damos vida a ideas a través de la imagen", sobreSubtitle: "Un estudio donde la técnica se encuentra con la sensibilidad artística",
        quienesTag: "El Equipo", quienesTitle: "Quiénes Somos", quienesSubtitle: "Las personas detrás de cada proyecto",
        stat1: "50+", stat1Label: "Proyectos Realizados", stat2: "30+", stat2Label: "Clientes Satisfechos", stat3: "5", stat3Label: "Años de Trayectoria", stat4: "12", stat4Label: "Premios y Reconocimientos",
        contactEmail: "mojcaestudio@gmail.com", contactLocation: "Villa María, Córdoba, Argentina", footerText: "Diseño, creatividad y estrategia visual con alma artesanal."
    },
    style: {
        heroFontSize: "clamp(34px, 5.2vw, 68px)", heroFontFamily: "'Space Grotesk', sans-serif", bodyFontFamily: "'Inter', sans-serif",
        accentColor: "#ff6b35", accentLight: "#ff8c42", bgDark: "#0a0a0a", bgPanel: "#111111", bgCard: "#161616", textPrimary: "#f0f0f0", textSecondary: "#a0a0a0", textMuted: "#666666", borderColor: "#242424"
    },
    hero: { videoSrc: "", glassEnabled: true, glassBlur: "12px", glassOpacity: "0.03", overlayEnabled: true, overlayColor: "rgba(10,10,10,0.45)" },
    quienesSomos: { enabled: true, members: [
        { id: "m1", name: "María López", role: "Directora Creativa", photo: "", tags: ["Dirección", "Branding"], description: "Transforma ideas en experiencias visuales memorables." },
        { id: "m2", name: "Juan Pérez", role: "Productor Audiovisual", photo: "", tags: ["Video", "Fotografía"], description: "Especialista en narrativa visual cinematográfica." },
        { id: "m3", name: "Lucía Martínez", role: "Diseñadora UX/UI", photo: "", tags: ["Web", "Diseño"], description: "Crea interfaces que no solo se ven bien, sino que funcionan." }
    ]},
    testimonios: { enabled: true, items: [
        { id: "t1", nombre: "María González", empresa: "Marca X", texto: "Trabajar con Mojca fue una experiencia transformadora. Entendieron exactamente lo que necesitábamos.", avatar: "" },
        { id: "t2", nombre: "Carlos Rodríguez", empresa: "Startup Y", texto: "La atención al detalle y la creatividad que ponen en cada proyecto es impresionante.", avatar: "" },
        { id: "t3", nombre: "Juan López", empresa: "Restaurante Z", texto: "Nuestra imagen cambió por completo gracias a ellos. El rebranding superó todas nuestras expectativas.", avatar: "" }
    ]},
    videosHorizontal: [
        { id: "vh1", src: "", title: "Spot Comercial", description: "Lanzamiento y color grading.", views: "12.4K", likes: "856", tag: "Comercial" },
        { id: "vh2", src: "", title: "Video Musical", description: "Dirección de arte.", views: "45.2K", likes: "2.1K", tag: "Musical" }
    ],
    videosVertical: [
        { id: "vv1", src: "", title: "Behind the Scenes", description: "Día de rodaje", views: "89K", likes: "4.2K" },
        { id: "vv2", src: "", title: "Tutorial Color", description: "Color grading", views: "156K", likes: "8.7K" }
    ],
    photos: [
        { id: "p1", src: "", title: "Campaña Skincare", category: "producto", size: "1x1", description: "Iluminación difusa para ecommerce." },
        { id: "p2", src: "", title: "Retrato Editorial", category: "retrato", size: "1x2", description: "Fotografía de estudio." },
        { id: "p3", src: "", title: "Evento Nocturno", category: "evento", size: "1x1", description: "" },
        { id: "p4", src: "", title: "Urban Lifestyle", category: "lifestyle", size: "1x1", description: "Luz natural metropolitana." }
    ],
    branding: [
        { id: "b1", src: "", title: "Marca A — Identidad", description: "Diseño de logo, paleta cromática y aplicaciones.", tags: ["Logo", "Packaging", "Social"] },
        { id: "b2", src: "", title: "Restaurante B", description: "Renovación completa de imagen comercial.", tags: ["Rebranding", "Menú", "Web"] }
    ],
    redes: [
        { id: "r1", type: "carousel", slides: [{ src: "", label: "Campaña 1" }], likes: "1,247", caption: "Nueva campaña de verano.", hashtags: "#audiovisual", time: "Hace 2 días", location: "Buenos Aires" }
    ],
    webdev: [
        { id: "w1", src: "", title: "E-commerce Moda", description: "Tienda online con pasarela de pagos.", stack: ["React", "Next.js", "Tailwind"], linkLive: "#", linkRepo: "#" }
    ],
    whatsapp: { number: "5493534000000", message: "Hola Mojca Estudio", floatEnabled: true, floatLabel: "Escribinos" }
};

function getData() {
    try {
        const saved = localStorage.getItem('mojcaData');
        if (saved) return deepMerge(JSON.parse(JSON.stringify(DEFAULT_DATA)), JSON.parse(saved));
    } catch (e) { console.error(e); }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && !Array.isArray(source[key])) {
            Object.assign(source[key], deepMerge(target[key] || {}, source[key]));
        }
    }
    Object.assign(target || {}, source);
    return target;
}

// Generador para Carruseles (Autoplay silenciado, sin controles) vs Modal (Con sonido y controles)
function createMediaElement(src, label, type, isBackground = true) {
    if (!src || src.trim() === '') return `<div class="ph-inner"><span>${label}</span></div>`;
    
    if (src.includes('drive.google.com')) {
        const driveId = src.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || src.match(/id=([a-zA-Z0-9_-]+)/);
        if (driveId && driveId[1]) {
            return `<iframe src="https://drive.google.com/file/d/${driveId[1]}/preview" frameborder="0" allow="autoplay; fullscreen" style="position:absolute;inset:0;width:100%;height:100%;${isBackground?'pointer-events:none;':''}"></iframe>`;
        }
    }
    if (src.includes('youtube.com') || src.includes('youtu.be')) {
        const yt = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
        if (yt && yt[1]) {
            const params = isBackground ? "autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1" : "autoplay=1&mute=0&controls=1&rel=0&modestbranding=1";
            return `<iframe src="https://www.youtube.com/embed/${yt[1]}?${params}&loop=1&playlist=${yt[1]}" frameborder="0" allow="autoplay; encrypted-media; fullscreen" style="position:absolute;inset:0;width:100%;height:100%;${isBackground?'pointer-events:none;':''}"></iframe>`;
        }
    }
    if (src.includes('vimeo.com')) {
        const vim = src.match(/vimeo\.com\/(\d+)/);
        if (vim && vim[1]) {
            const params = isBackground ? "autoplay=1&muted=1&background=1" : "autoplay=1&muted=0";
            return `<iframe src="https://player.vimeo.com/video/${vim[1]}?${params}&loop=1" frameborder="0" allow="autoplay; fullscreen" style="position:absolute;inset:0;width:100%;height:100%;${isBackground?'pointer-events:none;':''}"></iframe>`;
        }
    }
    if (type === 'video' || src.match(/\.(mp4|webm|ogg)$/i)) {
        if(isBackground) return `<video src="${src}" autoplay muted loop playsinline preload="metadata" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;"></video>`;
        return `<video src="${src}" autoplay controls playsinline preload="metadata" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"></video>`;
    }
    return `<img src="${src}" alt="${label}" oncontextmenu="return false;" draggable="false" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">`;
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

function initBackgroundGradient() {
    const plates = document.querySelectorAll('.bg-color-plate');
    const sections = document.querySelectorAll('.section-bg');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetBg = entry.target.getAttribute('data-bg');
                plates.forEach(plate => { plate.classList.toggle('active', plate.getAttribute('data-plate') === targetBg); });
            }
        });
    }, { threshold: 0.2, rootMargin: "-10% 0px -10% 0px" });
    sections.forEach(s => observer.observe(s));
}

function initHero(data) {
    const heroVideoBg = document.getElementById('heroVideoBg');
    if (!heroVideoBg) return;
    if (data.hero.videoSrc && data.hero.videoSrc.trim() !== '') {
        heroVideoBg.innerHTML = createMediaElement(data.hero.videoSrc, 'Hero', 'video', true);
        heroVideoBg.style.display = 'block';
    } else { heroVideoBg.style.display = 'none'; }
}

function renderTexts(data) {
    document.querySelectorAll('[data-editable]').forEach(el => {
        const key = el.getAttribute('data-editable');
        if (data.texts[key]) el.innerHTML = data.texts[key].replace(/\n/g, '<br>');
    });
}

function applySectionVisibility(data) {
    const sec = data.sections || DEFAULT_DATA.sections;
    const mapping = {
        hero: { el: document.getElementById('inicio'), link: 'a[href="#inicio"]' },
        marquee: { el: document.querySelector('.marquee-section'), link: null },
        sobre: { el: document.getElementById('sobre'), link: 'a[href="#sobre"]' },
        quienesSomos: { el: document.getElementById('quienes-somos'), link: 'a[href="#quienes-somos"]' },
        testimonios: { el: document.getElementById('testimonios'), link: null },
        audiovisual: { el: document.getElementById('audiovisual'), link: 'a[href="#audiovisual"]' },
        fotos: { el: document.getElementById('fotos'), link: 'a[href="#fotos"]' },
        branding: { el: document.getElementById('branding'), link: 'a[href="#branding"]' },
        redes: { el: document.getElementById('redes'), link: 'a[href="#redes"]' },
        webdev: { el: document.getElementById('webdev'), link: 'a[href="#webdev"]' },
        proceso: { el: document.getElementById('proceso'), link: null },
        contacto: { el: document.getElementById('contacto'), link: 'a[href="#contacto"]' }
    };
    for (const [key, conf] of Object.entries(mapping)) {
        const isVisible = sec[key] !== false;
        if (conf.el) conf.el.style.display = isVisible ? '' : 'none';
        if (conf.link) document.querySelectorAll(conf.link).forEach(a => {
            const parentLi = a.closest('li');
            if (parentLi) parentLi.style.display = isVisible ? '' : 'none';
            else a.style.display = isVisible ? '' : 'none';
        });
    }
}

function renderMarquee() {
    const track = document.getElementById('marqueeTrack');
    if(!track) return;
    const itemsHTML = `<span>Producción Audiovisual</span><span class="marquee-dot"></span>
        <span>Fotografía</span><span class="marquee-dot"></span>
        <span>Branding</span><span class="marquee-dot"></span>
        <span>Motion Graphics</span><span class="marquee-dot"></span>
        <span>Color Grading</span><span class="marquee-dot"></span>
        <span>Desarrollo Web</span><span class="marquee-dot"></span>`;
    // Dos bloques idénticos para el loop perfecto 50%
    track.innerHTML = `<div class="marquee-content">${itemsHTML}</div><div class="marquee-content">${itemsHTML}</div>`;
}

function renderQuienesSomos(data) {
    const grid = document.getElementById('quienesSomosGrid');
    if (!grid) return;
    const qs = data.quienesSomos;
    if (!qs.enabled || !qs.members || qs.members.length === 0) {
        grid.innerHTML = '<p style="text-align:center;color:var(--text-muted);">No hay miembros del equipo aún.</p>'; return;
    }
    grid.innerHTML = qs.members.map(m => `
        <div class="member-card scroll-reveal">
            <div class="member-photo">${m.photo ? `<img src="${m.photo}" alt="${m.name}" oncontextmenu="return false;">` : `<div class="img-placeholder avatar" data-label="${m.name.charAt(0)}"><div class="ph-inner"><span>${m.name.charAt(0)}</span></div></div>`}</div>
            <h3 class="member-name">${m.name}</h3>
            <p class="member-role">${m.role}</p>
        </div>
    `).join('');
}

function renderVideosHorizontal(data) {
    const track = document.getElementById('carousel-horizontal');
    if (!track) return;
    track.innerHTML = data.videosHorizontal.map(v => `
        <div class="video-card-large" data-src="${v.src}" data-type="video">
            <div class="video-thumb-large">
                ${createMediaElement(v.src, v.title, 'video', true)}
                <div class="video-play-overlay"><div class="play-circle"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></div></div>
            </div>
            <div class="video-meta">
                <h4>${v.title}</h4>
                <p>${v.description}</p>
            </div>
        </div>
    `).join('');
}

function renderVideosVertical(data) {
    const track = document.getElementById('carousel-vertical');
    if (!track) return;
    track.innerHTML = data.videosVertical.map(v => `
        <div class="video-card-vertical" data-src="${v.src}" data-type="video">
            <div class="video-thumb-vertical">
                ${createMediaElement(v.src, v.title, 'video', true)}
                <div class="video-play-overlay"><div class="play-circle-small"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></div></div>
            </div>
            <div class="video-meta-v">
                <h4>${v.title}</h4>
                <p>${v.description}</p>
            </div>
        </div>
    `).join('');
}

// Media Modal Logic (Para Videos a Pantalla Completa y Fotos)
function openMediaModal(src, type, info = null) {
    const modal = document.getElementById('mediaModal');
    const content = document.getElementById('mediaModalContent');
    const infoBox = document.getElementById('mediaModalInfo');
    if (!modal) return;
    
    content.innerHTML = createMediaElement(src, '', type, false); // false = con sonido/controles
    
    if (info && info.title) {
        infoBox.style.display = 'flex';
        document.getElementById('mediaModalTitle').textContent = info.title;
        document.getElementById('mediaModalTag').textContent = info.tag || '';
        document.getElementById('mediaModalDesc').textContent = info.desc || '';
    } else {
        infoBox.style.display = 'none';
    }
    modal.classList.add('active');
}

function initMediaModal() {
    const modal = document.getElementById('mediaModal');
    if (!modal) return;
    document.getElementById('mediaModalClose').addEventListener('click', () => {
        modal.classList.remove('active');
        document.getElementById('mediaModalContent').innerHTML = ''; // Detiene el video
    });
    modal.addEventListener('click', (e) => { 
        if (e.target === modal) { modal.classList.remove('active'); document.getElementById('mediaModalContent').innerHTML = ''; } 
    });

    // Delegación de clicks para abrir videos en Modal
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.video-card-large, .video-card-vertical');
        if (card) {
            const src = card.getAttribute('data-src');
            openMediaModal(src, 'video');
        }
    });
}

// Filtro de fotos sin bugs
let filterInterval = null;
let currentFilterIndex = 0;
const filterCategories = ['all', 'producto', 'retrato', 'evento', 'lifestyle'];

function renderPhotos(data, filter) {
    const grid = document.getElementById('photoGrid');
    if (!grid) return;
    const photos = filter === 'all' ? data.photos : data.photos.filter(p => p.category === filter);
    grid.innerHTML = photos.map(p => `
        <div class="photo-item size-${p.size}" data-id="${p.id}">
            <div class="photo-frame">${createMediaElement(p.src, p.title, 'image', true)}</div>
            <div class="photo-overlay"><h4>${p.title}</h4><p>${p.category}</p></div>
        </div>
    `).join('');

    grid.querySelectorAll('.photo-item').forEach(item => {
        item.addEventListener('click', () => {
            const photo = data.photos.find(p => p.id === item.getAttribute('data-id'));
            if (photo) openMediaModal(photo.src, 'image', { title: photo.title, tag: photo.category, desc: photo.description });
        });
    });
}

function initAutoGalleryFilter(data) {
    const filterContainer = document.getElementById('galleryFilter');
    const grid = document.getElementById('photoGrid');
    const buttons = document.querySelectorAll('.filter-btn');
    if (!filterContainer || !grid) return;

    function setFilter(cat) {
        buttons.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-filter') === cat));
        renderPhotos(data, cat);
    }
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            if(filterInterval) clearInterval(filterInterval);
            setFilter(btn.getAttribute('data-filter'));
        });
    });
    function startTimer() {
        if(filterInterval) clearInterval(filterInterval);
        filterInterval = setInterval(() => {
            currentFilterIndex = (currentFilterIndex + 1) % filterCategories.length;
            setFilter(filterCategories[currentFilterIndex]);
        }, 4000);
    }
    startTimer();
    [filterContainer, grid].forEach(el => {
        el.addEventListener('mouseenter', () => { if(filterInterval) clearInterval(filterInterval); });
        el.addEventListener('mouseleave', startTimer);
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true; submitBtn.textContent = 'Enviando...'; status.style.display = 'none';
        try {
            const response = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
            if (response.ok) { status.textContent = '¡Mensaje enviado con éxito!'; status.className = 'form-status success'; form.reset(); } 
            else throw new Error();
        } catch (err) { status.textContent = 'Error al enviar. Intentá nuevamente.'; status.className = 'form-status error'; } 
        finally { submitBtn.disabled = false; submitBtn.textContent = 'Enviar mensaje'; }
    });
}

// Carrusel Anti-Bugs (Multiplica ítems si hay pocos para rotar suave)
class InfiniteCarousel {
    constructor(outerEl) {
        this.outer = outerEl;
        this.wrapper = outerEl.querySelector('.carousel-track-wrapper');
        this.track = outerEl.querySelector('.carousel-track');
        this.prevBtn = outerEl.querySelector('.carousel-btn.prev');
        this.nextBtn = outerEl.querySelector('.carousel-btn.next');
        this.itemWidth = 0;
        this.gap = 20;
        this.autoplayInterval = null;
        this.init();
    }
    init() {
        if (!this.track || this.track.children.length === 0) return;
        this.ensureEnoughItems();
        this.cloneItems();
        this.updateDimensions();
        this.bindEvents();
        this.startAutoplay();
    }
    ensureEnoughItems() {
        // Multiplica los ítems iniciales para que el scroll infinito no colapse si solo hay 1 o 2.
        const originals = Array.from(this.track.children);
        while (this.track.children.length > 0 && this.track.children.length < 8) {
            originals.forEach(item => this.track.appendChild(item.cloneNode(true)));
        }
    }
    cloneItems() {
        const originals = Array.from(this.track.children);
        originals.forEach(item => this.track.appendChild(item.cloneNode(true)));
        for (let i = originals.length - 1; i >= 0; i--) this.track.insertBefore(originals[i].cloneNode(true), this.track.firstChild);
        this.currentIndex = originals.length;
        this.originalCount = originals.length;
        this.updatePosition(false);
    }
    updateDimensions() {
        if (this.track.children.length === 0) return;
        this.itemWidth = this.track.children[0].offsetWidth + this.gap;
        this.updatePosition(false);
    }
    updatePosition(animate = true) {
        this.track.style.transition = animate ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
        this.track.style.transform = `translateX(${-this.currentIndex * this.itemWidth}px)`;
    }
    next() { this.currentIndex++; this.updatePosition(true); this.checkBounds(); }
    prev() { this.currentIndex--; this.updatePosition(true); this.checkBounds(); }
    checkBounds() {
        setTimeout(() => {
            if (this.currentIndex >= this.originalCount * 2) { this.currentIndex = this.originalCount; this.updatePosition(false); }
            else if (this.currentIndex < this.originalCount) { this.currentIndex = this.originalCount * 2 - 1; this.updatePosition(false); }
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

function initNav() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 40); }, { passive: true });
    if (toggle && links) {
        toggle.addEventListener('click', () => { toggle.classList.toggle('active'); links.classList.toggle('open'); });
        links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { toggle.classList.remove('active'); links.classList.remove('open'); }));
    }
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); } });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
}

function renderTestimonios(data) {
    const track = document.getElementById('testimoniosTrack');
    if (!track) return;
    const t = data.testimonios;
    if (!t.items || t.items.length === 0) return;
    const cardHTML = (item) => `
        <div class="testimonio-card">
            <div class="testimonio-quote">"${item.texto}"</div>
            <div class="testimonio-author">
                <div class="testimonio-avatar">${item.avatar ? `<img src="${item.avatar}">` : `<span>${item.nombre.charAt(0)}</span>`}</div>
                <div class="testimonio-info"><strong>${item.nombre}</strong><span>${item.empresa}</span></div>
            </div>
        </div>`;
    track.innerHTML = t.items.map(cardHTML).join('');
}

function init() {
    const data = getData();
    applyDynamicStyles(data);
    applySectionVisibility(data);
    renderTexts(data);
    initHero(data);
    renderMarquee();
    renderQuienesSomos(data);
    renderTestimonios(data);
    renderVideosHorizontal(data);
    renderVideosVertical(data);
    renderPhotos(data, 'all');
    initAutoGalleryFilter(data);
    initMediaModal();
    initContactForm();
    initNav();
    initScrollReveal();
    initBackgroundGradient();
    document.querySelectorAll('.carousel-outer').forEach(outer => new InfiniteCarousel(outer));
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
