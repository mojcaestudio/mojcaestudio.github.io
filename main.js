// ========================================
// MOJCA ESTUDIO — Main JavaScript Optimizado
// ========================================

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkjnkdvl";

const DEFAULT_DATA = {
    sections: { hero: true, marquee: true, sobre: true, quienesSomos: true, testimonios: true, videos: true, reels: true, fotos: true, branding: true, redes: true, webdev: true, proceso: true, contacto: true },
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
    quienesSomos: { enabled: true, members: [{ id: "m1", name: "María López", role: "Directora Creativa", photo: "", tags: ["Dirección", "Branding"], description: "Transforma ideas en experiencias visuales memorables." }] },
    testimonios: { enabled: true, items: [{ id: "t1", nombre: "María González", empresa: "Marca X", texto: "Excelente trabajo.", avatar: "" }] },
    videosHorizontal: [{ id: "vh1", src: "", title: "Spot Comercial", description: "Campaña de lanzamiento.", views: "12.4K", likes: "856", tag: "Comercial" }],
    videosVertical: [{ id: "vv1", src: "", title: "Behind the Scenes", description: "Un día de rodaje en estudio", views: "89K", likes: "4.2K" }],
    photos: [{ id: "p1", src: "", title: "Campaña Skincare", category: "producto", size: "1x1", description: "Iluminación difusa." }],
    branding: [], redes: [], webdev: [],
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

// Generador de IFRAME y VIDEO permitiendo interacción al cliquear
function createMediaElement(src, label, type, isHero = false) {
    if (!src || src.trim() === '') return `<div class="ph-inner"><span>${label}</span></div>`;

    let pointerEvents = isHero ? 'pointer-events:none;' : 'pointer-events:auto;';

    if (src.includes('drive.google.com')) {
        const driveId = src.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || src.match(/id=([a-zA-Z0-9_-]+)/);
        if (driveId && driveId[1]) {
            return `<iframe src="https://drive.google.com/file/d/${driveId[1]}/preview" frameborder="0" allow="autoplay; fullscreen" style="position:absolute;inset:0;width:100%;height:100%;${pointerEvents}"></iframe>`;
        }
    }

    if (src.includes('youtube.com') || src.includes('youtu.be')) {
        const yt = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
        if (yt && yt[1]) {
            const params = isHero ? "autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1" : "autoplay=0&mute=0&controls=1&rel=0&modestbranding=1";
            return `<iframe src="https://www.youtube.com/embed/${yt[1]}?${params}&loop=1&playlist=${yt[1]}" frameborder="0" allow="autoplay; encrypted-media; fullscreen" style="position:absolute;inset:0;width:100%;height:100%;${pointerEvents}"></iframe>`;
        }
    }

    if (src.includes('vimeo.com')) {
        const vim = src.match(/vimeo\.com\/(\d+)/);
        if (vim && vim[1]) {
            const params = isHero ? "autoplay=1&muted=1&background=1" : "autoplay=0&muted=0";
            return `<iframe src="https://player.vimeo.com/video/${vim[1]}?${params}&loop=1" frameborder="0" allow="autoplay; fullscreen" style="position:absolute;inset:0;width:100%;height:100%;${pointerEvents}"></iframe>`;
        }
    }

    if (type === 'video' || src.match(/\.(mp4|webm|ogg)$/i)) {
        const auto = isHero ? 'autoplay' : '';
        return `<video src="${src}" ${auto} muted loop playsinline preload="metadata" controlsList="nodownload noplaybackrate" disablePictureInPicture oncontextmenu="return false;" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;${pointerEvents}"></video>`;
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
                plates.forEach(plate => {
                    plate.classList.toggle('active', plate.getAttribute('data-plate') === targetBg);
                });
            }
        });
    }, { threshold: 0.2, rootMargin: "-10% 0px -10% 0px" });
    sections.forEach(s => observer.observe(s));
}

function initHero(data) {
    const heroVideoBg = document.getElementById('heroVideoBg');
    const h = data.hero;
    if (!heroVideoBg) return;
    if (h.videoSrc && h.videoSrc.trim() !== '') {
        heroVideoBg.innerHTML = createMediaElement(h.videoSrc, 'Hero Video', 'video', true);
        heroVideoBg.style.display = 'block';
    } else {
        heroVideoBg.style.display = 'none';
    }
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
        videos: { el: document.getElementById('videos'), link: 'a[href="#videos"]' },
        reels: { el: document.getElementById('reels'), link: 'a[href="#reels"]' },
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

function renderVideosHorizontal(data) {
    const track = document.getElementById('carousel-horizontal');
    if (!track) return;
    track.innerHTML = data.videosHorizontal.map(v => `
        <div class="video-card-large" data-video-id="${v.id}">
            <div class="video-thumb-large">
                ${createMediaElement(v.src, v.title, 'video', false)}
                <div class="video-play-overlay"><div class="play-circle"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></div></div>
            </div>
            <div class="video-meta">
                <h4>${v.title}</h4>
                <p>${v.description}</p>
                <div class="video-metrics"><span class="metric tag">${v.tag}</span><span class="metric">${v.views} views</span></div>
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
                ${createMediaElement(v.src, v.title, 'video', false)}
                <div class="video-play-overlay"><div class="play-circle-small"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></div></div>
            </div>
            <div class="video-meta-v">
                <h4>${v.title}</h4>
                <p>${v.description}</p>
            </div>
        </div>
    `).join('');
}

// Filtro automático de fotos y Modal
let filterInterval = null;
let currentFilterIndex = 0;
const filterCategories = ['all', 'producto', 'retrato', 'evento', 'lifestyle'];

function renderPhotos(data, filter) {
    const grid = document.getElementById('photoGrid');
    if (!grid) return;
    const photos = filter === 'all' ? data.photos : data.photos.filter(p => p.category === filter);
    grid.innerHTML = photos.map(p => `
        <div class="photo-item size-${p.size}" data-id="${p.id}" data-category="${p.category}">
            <div class="photo-frame">${createMediaElement(p.src, p.title, 'image')}</div>
            <div class="photo-overlay"><h4>${p.title}</h4><p>${p.category}</p></div>
        </div>
    `).join('');

    grid.querySelectorAll('.photo-item').forEach(item => {
        item.addEventListener('click', () => {
            const photo = data.photos.find(p => p.id === item.getAttribute('data-id'));
            if (photo) openPhotoModal(photo);
        });
    });
}

function openPhotoModal(photo) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('photoModalImg');
    const modalInfo = document.getElementById('photoModalInfo');
    if (!modal || !modalImg) return;
    modalImg.src = photo.src;
    
    if (photo.description && photo.description.trim() !== '') {
        modalInfo.style.display = 'flex';
        document.getElementById('photoModalTitle').textContent = photo.title || '';
        document.getElementById('photoModalTag').textContent = photo.category || '';
        document.getElementById('photoModalDesc').textContent = photo.description;
    } else {
        modalInfo.style.display = 'none';
    }
    modal.classList.add('active');
}

function initPhotoModal() {
    const modal = document.getElementById('photoModal');
    if (!modal) return;
    document.getElementById('photoModalClose').addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
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
            clearInterval(filterInterval);
            setFilter(btn.getAttribute('data-filter'));
        });
    });
    function startTimer() {
        filterInterval = setInterval(() => {
            currentFilterIndex = (currentFilterIndex + 1) % filterCategories.length;
            setFilter(filterCategories[currentFilterIndex]);
        }, 4000);
    }
    startTimer();
    [filterContainer, grid].forEach(el => {
        el.addEventListener('mouseenter', () => clearInterval(filterInterval));
        el.addEventListener('mouseleave', () => { clearInterval(filterInterval); startTimer(); });
    });
}

// Formulario con API Fetch directa
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

// Carrusel que permite hacer click en los reproductores
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
        this.setupVideoHandling();
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
        this.autoplayInterval = setInterval(() => this.next(), 3600);
        this.outer.addEventListener('mouseenter', () => clearInterval(this.autoplayInterval));
        this.outer.addEventListener('mouseleave', () => this.startAutoplay());
    }
    // Lógica para que al cliquear desaparezca el overlay de protección y puedas darle Play a YouTube o Drive
    setupVideoHandling() {
        this.track.addEventListener('click', (e) => {
            const card = e.target.closest('.video-card-large, .video-card-vertical');
            if (!card) return;
            
            clearInterval(this.autoplayInterval); // Frena el carrusel cuando vas a ver un video

            const iframe = card.querySelector('iframe');
            if (iframe) {
                const overlay = card.querySelector('.video-play-overlay');
                if (overlay) {
                    overlay.style.pointerEvents = 'none';
                    overlay.style.opacity = '0';
                }
                return;
            }

            const video = card.querySelector('video');
            if (video) {
                this.track.querySelectorAll('video').forEach(v => { if (v !== video) { v.muted = true; v.pause(); } });
                this.track.querySelectorAll('.video-play-overlay').forEach(o => {
                    if (o.closest('.video-card-large, .video-card-vertical') !== card) {
                        o.style.opacity = '1'; o.style.pointerEvents = 'auto';
                    }
                });
                video.muted = false;
                if (video.paused) {
                    video.play();
                    const overlay = card.querySelector('.video-play-overlay');
                    if (overlay) overlay.style.opacity = '0';
                } else {
                    video.pause();
                    const overlay = card.querySelector('.video-play-overlay');
                    if (overlay) overlay.style.opacity = '1';
                }
            }
        });
    }
}

function initNav() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 40); }, { passive: true });
    if (toggle && links) {
        toggle.addEventListener('click', () => { toggle.classList.toggle('active'); links.classList.toggle('open'); });
        links.querySelectorAll('a').forEach(a => { a.addEventListener('click', () => { toggle.classList.remove('active'); links.classList.remove('open'); }); });
    }
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); } });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));
}

function init() {
    const data = getData();
    applyDynamicStyles(data);
    applySectionVisibility(data);
    renderTexts(data);
    initHero(data);
    renderVideosHorizontal(data);
    renderVideosVertical(data);
    renderPhotos(data, 'all');
    initAutoGalleryFilter(data);
    initPhotoModal();
    initContactForm();
    initNav();
    initScrollReveal();
    initBackgroundGradient();
    document.querySelectorAll('.carousel-outer').forEach(outer => new InfiniteCarousel(outer));
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
