// ========================================
// MOJCA ESTUDIO — Main JavaScript
// ========================================

// ========================================
// DATOS POR DEFECTO
// ========================================
const DEFAULT_DATA = {
    texts: {
        logoText: "MOJCA",
        heroLabel: "Estudio Creativo",
        heroTitle: "Damos vida a tus ideas con diseno, creatividad y estrategia visual",
        heroSub: "Creamos contenido que se ve, se siente y se comparte.",
        sobreTag: "Sobre Nosotros",
        sobreTitle: "Damos vida a ideas a traves de la imagen",
        sobreSubtitle: "Un estudio donde la tecnica se encuentra con la sensibilidad artistica",
        sobreLead: "Nos especializamos en diseno audiovisual, fotografia, produccion de video y estrategias para redes sociales.",
        sobreText: "Creemos en las ideas que emocionan y perduran, en relatos capaces de conectar de verdad con las personas.",
        stat1: "50+",
        stat1Label: "Proyectos Realizados",
        stat2: "30+",
        stat2Label: "Clientes Satisfechos",
        stat3: "5",
        stat3Label: "Anos de Trayectoria",
        contactEmail: "mojcaestudio@gmail.com",
        contactLocation: "Buenos Aires, Argentina",
        footerText: "Diseno, creatividad y estrategia visual con alma artesanal."
    },
    videosHorizontal: [
        { id: "vh1", type: "video", src: "", title: "Spot Comercial — Marca X", description: "Direccion, filmacion y postproduccion para campana de lanzamiento.", views: "12.4K", likes: "856", tag: "Comercial" },
        { id: "vh2", type: "video", src: "", title: "Video Musical — Artista Y", description: "Concepto visual, direccion de arte y edicion para single debut.", views: "45.2K", likes: "2.1K", tag: "Musical" },
        { id: "vh3", type: "video", src: "", title: "Corporativo — Empresa Z", description: "Video institucional con tomas aereas en drone, entrevistas y motion graphics.", views: "8.7K", likes: "423", tag: "Corporativo" },
        { id: "vh4", type: "video", src: "", title: "Documental — Proyecto Social", description: "Cobertura documental de 3 dias. Edicion narrativa con arco emocional.", views: "3.1K", likes: "189", tag: "Documental" }
    ],
    videosVertical: [
        { id: "vv1", type: "video", src: "", title: "Behind the Scenes", description: "Un dia de produccion en el estudio", views: "89K", likes: "4.2K" },
        { id: "vv2", type: "video", src: "", title: "Tutorial de Color", description: "Antes y despues del color grading", views: "156K", likes: "8.7K" },
        { id: "vv3", type: "video", src: "", title: "Transiciones Creativas", description: "Edicion con match cuts y speed ramps", views: "234K", likes: "12K" },
        { id: "vv4", type: "video", src: "", title: "Motion Graphics", description: "Animaciones tipograficas y visuales", views: "67K", likes: "3.4K" },
        { id: "vv5", type: "video", src: "", title: "Producto en 15s", description: "Spot rapido para redes sociales", views: "312K", likes: "18K" }
    ],
    photos: [
        { id: "p1", src: "", title: "Skincare Campaign", category: "producto", size: "1x1" },
        { id: "p2", src: "", title: "Retrato Editorial", category: "retrato", size: "1x2" },
        { id: "p3", src: "", title: "Evento Corporativo", category: "evento", size: "1x1" },
        { id: "p4", src: "", title: "Urban Lifestyle", category: "lifestyle", size: "1x1" },
        { id: "p5", src: "", title: "Flat Lay E-commerce", category: "producto", size: "2x1" },
        { id: "p6", src: "", title: "Retrato Artistico", category: "retrato", size: "1x1" }
    ],
    branding: [
        { id: "b1", src: "", title: "Marca A — Identidad Completa", description: "Diseno de logo, paleta cromatica, tipografia y aplicaciones.", tags: ["Logo", "Packaging", "Social"] },
        { id: "b2", src: "", title: "Restaurante B — Rebranding", description: "Renovacion completa de imagen: desde el menu fisico hasta la presencia digital.", tags: ["Rebranding", "Menu", "Web"] },
        { id: "b3", src: "", title: "Startup C — Brand Book", description: "Manual de marca completo con guidelines de uso.", tags: ["Brand Book", "Guidelines"] }
    ],
    redes: [
        { id: "r1", type: "carousel", slides: [{ src: "", label: "Campana Verano 1/3" }, { src: "", label: "Campana Verano 2/3" }, { src: "", label: "Campana Verano 3/3" }], likes: "1,247", caption: "Nueva campana de verano para @marcacliente.", hashtags: "#audiovisual #redessociales", time: "Hace 2 dias", location: "Buenos Aires, Argentina" },
        { id: "r2", type: "reel", src: "", label: "Behind the Scenes Reel", likes: "3,892", caption: "Behind the scenes de nuestra ultima produccion.", hashtags: "#behindthescenes #produccion", time: "Hace 5 dias", location: "Cordoba, Argentina" },
        { id: "r3", type: "carousel", slides: [{ src: "", label: "Branding 1/4" }, { src: "", label: "Branding 2/4" }, { src: "", label: "Branding 3/4" }, { src: "", label: "Branding 4/4" }], likes: "892", caption: "Branding completo para un nuevo emprendimiento local.", hashtags: "#branding #diseno #emprendedores", time: "Hace 1 semana", location: "Rosario, Argentina" }
    ],
    webdev: [
        { id: "w1", src: "", title: "E-commerce — Tienda de Moda", description: "Tienda online completa con carrito, pasarela de pagos y panel de administracion.", stack: ["React", "Next.js", "Stripe", "Tailwind"], linkLive: "#", linkRepo: "#" },
        { id: "w2", src: "", title: "Landing Page — SaaS", description: "Landing page de alta conversion para startup de software.", stack: ["Vue 3", "Vite", "GSAP", "Netlify"], linkLive: "#", linkRepo: "#" },
        { id: "w3", src: "", title: "Portfolio Interactivo — Artista", description: "Portfolio inmersivo con scroll horizontal, WebGL effects.", stack: ["Three.js", "React", "Framer Motion", "Vercel"], linkLive: "#", linkRepo: "#" }
    ]
};

function getData() {
    const saved = localStorage.getItem('mojcaData');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('mojcaData', JSON.stringify(DEFAULT_DATA));
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveData(data) {
    localStorage.setItem('mojcaData', JSON.stringify(data));
}

function resetData() {
    localStorage.setItem('mojcaData', JSON.stringify(DEFAULT_DATA));
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function placeholderHTML(label, iconType) {
    const icons = {
        image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`,
        video: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
        web: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`
    };
    return `<div class="ph-inner">${icons[iconType] || icons.image}<span>${label}</span></div>`;
}

function createMediaElement(src, label, type) {
    if (src && src.trim() !== '') {
        if (type === 'video' || src.match(/\.(mp4|webm|ogg)$/i) || src.includes('youtube') || src.includes('vimeo')) {
            if (src.includes('youtube')) {
                const id = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
                if (id) return `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id[1]}?mute=1&loop=1&playlist=${id[1]}&controls=0&rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"></iframe>`;
            }
            if (src.includes('vimeo')) {
                const id = src.match(/vimeo\.com\/(\d+)/);
                if (id) return `<iframe src="https://player.vimeo.com/video/${id[1]}?autoplay=1&muted=1&loop=1&background=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"></iframe>`;
            }
            return `<video src="${src}" muted loop playsinline preload="metadata" style="width:100%;height:100%;object-fit:cover;display:block;"></video>`;
        }
        return `<img src="${src}" alt="${label}" style="width:100%;height:100%;object-fit:cover;display:block;">`;
    }
    return placeholderHTML(label, type === 'video' ? 'video' : 'image');
}

// ========================================
// RENDER SECCIONES
// ========================================
function renderTexts(data) {
    document.querySelectorAll('[data-editable]').forEach(el => {
        const key = el.getAttribute('data-editable');
        if (data.texts[key]) {
            if (el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'P' || el.tagName === 'SPAN') {
                el.innerHTML = data.texts[key].replace(/\n/g, '<br>');
            } else {
                el.textContent = data.texts[key];
            }
        }
    });
}

function renderVideosHorizontal(data) {
    const track = document.getElementById('carousel-horizontal');
    if (!track) return;
    track.innerHTML = data.videosHorizontal.map(v => `
        <div class="video-card-large" data-video-id="${v.id}">
            <div class="video-thumb-large">
                <div class="img-placeholder landscape" data-label="${v.title}">
                    ${createMediaElement(v.src, v.title, 'video')}
                </div>
                <div class="video-play-overlay">
                    <div class="play-circle">
                        <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                </div>
            </div>
            <div class="video-meta">
                <h4>${v.title}</h4>
                <p>${v.description}</p>
                <div class="video-metrics">
                    <span class="metric"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> ${v.views} vistas</span>
                    <span class="metric"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> ${v.likes} likes</span>
                    <span class="metric tag">${v.tag}</span>
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
                <div class="img-placeholder portrait" data-label="${v.title}">
                    ${createMediaElement(v.src, v.title, 'video')}
                </div>
                <div class="video-play-overlay">
                    <div class="play-circle-small">
                        <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                </div>
            </div>
            <div class="video-meta-v">
                <h4>${v.title}</h4>
                <p>${v.description}</p>
                <div class="video-metrics">
                    <span class="metric"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> ${v.views}</span>
                    <span class="metric"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> ${v.likes}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderPhotos(data, filter = 'all') {
    const grid = document.getElementById('photoGrid');
    if (!grid) return;
    const photos = filter === 'all' ? data.photos : data.photos.filter(p => p.category === filter);
    grid.innerHTML = photos.map(p => `
        <div class="photo-item size-${p.size}" data-category="${p.category}" data-photo-id="${p.id}">
            <div class="photo-frame">
                <div class="img-placeholder ${p.size === '1x2' || p.size === '1x3' ? 'tall' : p.size === '2x1' || p.size === '3x1' || p.size === '4x1' ? 'wide' : 'square'}" data-label="${p.title}">
                    ${createMediaElement(p.src, p.title, 'image')}
                </div>
            </div>
            <div class="photo-overlay">
                <h4>${p.title}</h4>
                <p>${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</p>
            </div>
        </div>
    `).join('');
}

function renderBranding(data) {
    const grid = document.getElementById('brandingGrid');
    if (!grid) return;
    grid.innerHTML = data.branding.map(b => `
        <div class="branding-card scroll-reveal">
            <div class="branding-visual">
                <div class="img-placeholder wide" data-label="${b.title}">
                    ${createMediaElement(b.src, b.title, 'image')}
                </div>
            </div>
            <div class="branding-info">
                <h3>${b.title}</h3>
                <p>${b.description}</p>
                <div class="branding-tags">${b.tags.map(t => `<span>${t}</span>`).join('')}</div>
            </div>
        </div>
    `).join('');
}

function renderRedes(data) {
    const grid = document.getElementById('redesGrid');
    if (!grid) return;
    grid.innerHTML = data.redes.map((r, idx) => {
        if (r.type === 'carousel') {
            return `
            <article class="ig-post-full scroll-reveal">
                <div class="ig-header">
                    <div class="ig-avatar">
                        <div class="img-placeholder avatar" data-label="M"><div class="ph-inner"><span>M</span></div></div>
                    </div>
                    <div class="ig-user"><strong>mojcaestudio</strong><span>${r.location}</span></div>
                    <a href="https://www.instagram.com/mojcaestudio/" target="_blank" class="ig-follow-btn">Seguir</a>
                </div>
                <div class="ig-carousel">
                    <div class="ig-carousel-track" id="carousel-${r.id}">
                        ${r.slides.map((s, i) => `
                            <div class="ig-carousel-slide">
                                <div class="img-placeholder square" data-label="${s.label}">
                                    ${createMediaElement(s.src, s.label, 'image')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="ig-carousel-dots" id="dots-${r.id}">${r.slides.map((_, i) => `<span class="${i === 0 ? 'active' : ''}"></span>`).join('')}</div>
                    <button class="ig-carousel-prev" onclick="moveIGCarousel('${r.id}', -1)" aria-label="Anterior">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <button class="ig-carousel-next" onclick="moveIGCarousel('${r.id}', 1)" aria-label="Siguiente">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                </div>
                <div class="ig-actions">
                    <button class="ig-like" onclick="toggleLike(this)" aria-label="Me gusta">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                    <button class="ig-comment-btn" aria-label="Comentar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    </button>
                    <button class="ig-share" aria-label="Compartir">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </button>
                    <button class="ig-save" aria-label="Guardar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                    </button>
                </div>
                <div class="ig-likes"><span class="like-count">${r.likes}</span> Me gusta</div>
                <div class="ig-caption"><strong>mojcaestudio</strong> ${r.caption} <span class="hashtag">${r.hashtags}</span></div>
                <div class="ig-time">${r.time}</div>
            </article>`;
        } else {
            return `
            <article class="ig-post-full scroll-reveal">
                <div class="ig-header">
                    <div class="ig-avatar">
                        <div class="img-placeholder avatar" data-label="M"><div class="ph-inner"><span>M</span></div></div>
                    </div>
                    <div class="ig-user"><strong>mojcaestudio</strong><span>${r.location}</span></div>
                    <a href="https://www.instagram.com/mojcaestudio/" target="_blank" class="ig-follow-btn">Seguir</a>
                </div>
                <div class="ig-media-reel">
                    <div class="img-placeholder portrait" data-label="${r.label}">
                        ${createMediaElement(r.src, r.label, 'video')}
                    </div>
                    <div class="reel-badge">REEL</div>
                    <div class="video-play-overlay" style="pointer-events:none;">
                        <div class="play-circle-small">
                            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        </div>
                    </div>
                </div>
                <div class="ig-actions">
                    <button class="ig-like" onclick="toggleLike(this)" aria-label="Me gusta">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                    <button class="ig-comment-btn" aria-label="Comentar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    </button>
                    <button class="ig-share" aria-label="Compartir">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </button>
                    <button class="ig-save" aria-label="Guardar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                    </button>
                </div>
                <div class="ig-likes"><span class="like-count">${r.likes}</span> Me gusta</div>
                <div class="ig-caption"><strong>mojcaestudio</strong> ${r.caption} <span class="hashtag">${r.hashtags}</span></div>
                <div class="ig-time">${r.time}</div>
            </article>`;
        }
    }).join('');
}

function renderWebdev(data) {
    const grid = document.getElementById('webdevGrid');
    if (!grid) return;
    grid.innerHTML = data.webdev.map(w => `
        <div class="webdev-card scroll-reveal">
            <div class="webdev-preview">
                <div class="browser-mockup">
                    <div class="browser-bar"><span></span><span></span><span></span></div>
                    <div class="img-placeholder wide" data-label="${w.title}">
                        ${createMediaElement(w.src, w.title, 'web')}
                    </div>
                </div>
            </div>
            <div class="webdev-info">
                <h3>${w.title}</h3>
                <p>${w.description}</p>
                <div class="webdev-stack">${w.stack.map(s => `<span>${s}</span>`).join('')}</div>
                <div class="webdev-links"><a href="${w.linkLive}" class="link-live">Ver sitio</a><a href="${w.linkRepo}" class="link-repo">Codigo</a></div>
            </div>
        </div>
    `).join('');
}

// ========================================
// CARRUSELES INFINITOS CON VIDEO
// ========================================
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
        this.gap = 24;
        this.isDragging = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.autoplayInterval = null;
        this.isHovered = false;

        this.init();
    }

    init() {
        if (!this.track) return;
        this.cloneItems();
        this.updateDimensions();
        this.bindEvents();
        this.startAutoplay();
        this.setupVideoHandling();
    }

    cloneItems() {
        const original = Array.from(this.track.children);
        if (original.length === 0) return;
        original.forEach(item => {
            const cloneEnd = item.cloneNode(true);
            cloneEnd.setAttribute('data-clone', 'end');
            this.track.appendChild(cloneEnd);
        });
        for (let i = original.length - 1; i >= 0; i--) {
            const cloneStart = original[i].cloneNode(true);
            cloneStart.setAttribute('data-clone', 'start');
            this.track.insertBefore(cloneStart, this.track.firstChild);
        }
        this.items = Array.from(this.track.children);
        this.currentIndex = original.length;
        this.updatePosition(false);
    }

    updateDimensions() {
        if (this.items.length === 0) return;
        const first = this.items[0];
        this.itemWidth = first.offsetWidth + this.gap;
        this.updatePosition(false);
    }

    updatePosition(animate = true) {
        if (animate) {
            this.track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        } else {
            this.track.style.transition = 'none';
        }
        const offset = -this.currentIndex * this.itemWidth;
        this.track.style.transform = `translateX(${offset}px)`;
    }

    next() {
        this.currentIndex++;
        this.updatePosition();
        this.checkInfinite();
    }

    prev() {
        this.currentIndex--;
        this.updatePosition();
        this.checkInfinite();
    }

    checkInfinite() {
        const originalCount = this.items.length / 3;
        setTimeout(() => {
            if (this.currentIndex >= originalCount * 2) {
                this.track.style.transition = 'none';
                this.currentIndex = originalCount;
                this.updatePosition(false);
            } else if (this.currentIndex < originalCount) {
                this.track.style.transition = 'none';
                this.currentIndex = originalCount * 2 - 1;
                this.updatePosition(false);
            }
        }, 500);
    }

    bindEvents() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

        this.outer.addEventListener('mouseenter', () => { this.isHovered = true; this.stopAutoplay(); });
        this.outer.addEventListener('mouseleave', () => { this.isHovered = false; this.startAutoplay(); });

        this.wrapper.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.startX = e.pageX - this.wrapper.offsetLeft;
            this.scrollLeft = this.currentIndex * this.itemWidth;
            this.stopAutoplay();
        });

        this.wrapper.addEventListener('mouseleave', () => { this.isDragging = false; this.startAutoplay(); });
        this.wrapper.addEventListener('mouseup', () => { this.isDragging = false; this.startAutoplay(); });

        this.wrapper.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            const x = e.pageX - this.wrapper.offsetLeft;
            const walk = (x - this.startX);
            const newIndex = Math.round((this.scrollLeft - walk) / this.itemWidth);
            if (newIndex !== this.currentIndex) {
                this.currentIndex = newIndex;
                this.updatePosition(false);
            }
        });

        this.wrapper.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.startX = e.touches[0].pageX - this.wrapper.offsetLeft;
            this.scrollLeft = this.currentIndex * this.itemWidth;
            this.stopAutoplay();
        }, { passive: true });

        this.wrapper.addEventListener('touchend', () => { this.isDragging = false; this.startAutoplay(); });

        this.wrapper.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            const x = e.touches[0].pageX - this.wrapper.offsetLeft;
            const walk = (x - this.startX);
            const newIndex = Math.round((this.scrollLeft - walk) / this.itemWidth);
            if (newIndex !== this.currentIndex) {
                this.currentIndex = newIndex;
                this.updatePosition(false);
            }
        }, { passive: true });

        window.addEventListener('resize', () => this.updateDimensions());
    }

    startAutoplay() {
        if (this.autoplayInterval) return;
        this.autoplayInterval = setInterval(() => {
            if (!this.isHovered && !this.isDragging) {
                this.next();
            }
        }, 3000);
    }

    stopAutoplay() {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null;
    }

    setupVideoHandling() {
        this.track.addEventListener('click', (e) => {
            const card = e.target.closest('.video-card-large, .video-card-vertical');
            if (!card) return;

            this.track.querySelectorAll('video').forEach(v => {
                v.muted = true;
                v.volume = 0;
            });

            const video = card.querySelector('video');
            if (video) {
                video.muted = false;
                video.volume = 0.3;
                if (video.paused) video.play();
            }

            this.track.querySelectorAll('.video-play-overlay').forEach(o => o.style.opacity = '1');
            const overlay = card.querySelector('.video-play-overlay');
            if (overlay) overlay.style.opacity = '0';
        });

        document.addEventListener('click', (e) => {
            if (!this.outer.contains(e.target)) {
                this.track.querySelectorAll('video').forEach(v => {
                    v.muted = true;
                    v.volume = 0;
                });
                this.track.querySelectorAll('.video-play-overlay').forEach(o => o.style.opacity = '1');
            }
        });
    }
}

// ========================================
// CARRUSEL INSTAGRAM INTERNO
// ========================================
function moveIGCarousel(postId, direction) {
    const track = document.getElementById('carousel-' + postId);
    const dots = document.getElementById('dots-' + postId);
    if (!track || !dots) return;

    const slides = track.children.length;
    let current = 0;
    const activeDot = dots.querySelector('.active');
    if (activeDot) {
        current = Array.from(dots.children).indexOf(activeDot);
    }

    let next = current + direction;
    if (next < 0) next = slides - 1;
    if (next >= slides) next = 0;

    track.style.transform = `translateX(-${next * 100}%)`;
    dots.querySelectorAll('span').forEach((d, i) => {
        d.classList.toggle('active', i === next);
    });
}

function toggleLike(btn) {
    btn.classList.toggle('liked');
    const countEl = btn.closest('.ig-post-full').querySelector('.like-count');
    if (countEl) {
        let count = parseInt(countEl.textContent.replace(/,/g, ''));
        if (btn.classList.contains('liked')) {
            count++;
        } else {
            count--;
        }
        countEl.textContent = count.toLocaleString();
    }
}

// ========================================
// FONDO DEGRADADO QUE CAMBIA POR SECCION
// ========================================
function initBackgroundGradient() {
    const bgLayer = document.getElementById('bgGradient');
    if (!bgLayer) return;

    const sections = document.querySelectorAll('.section-bg');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bg = entry.target.getAttribute('data-bg');
                if (bg) bgLayer.setAttribute('data-active', bg);
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(s => observer.observe(s));

    const hero = document.querySelector('.section-bg');
    if (hero) {
        const bg = hero.getAttribute('data-bg');
        if (bg) bgLayer.setAttribute('data-active', bg);
    }
}

// ========================================
// SCROLL REVEAL
// ========================================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => observer.observe(el));
}

// ========================================
// NAVEGACION
// ========================================
function initNav() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            links.classList.toggle('open');
        });

        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                toggle.classList.remove('active');
                links.classList.remove('open');
            });
        });
    }
}

// ========================================
// FILTROS GALERIA
// ========================================
function initGalleryFilter(data) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            renderPhotos(data, filter);
        });
    });
}

// ========================================
// FORMULARIO DE CONTACTO NATIVO
// ========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const servicio = document.getElementById('servicio').value;
        const mensaje = document.getElementById('mensaje').value;

        const subject = encodeURIComponent(`Nuevo mensaje desde la web - ${servicio || 'Consulta general'}`);
        const body = encodeURIComponent(
            `Nombre: ${nombre}\n` +
            `Email: ${email}\n` +
            `Servicio: ${servicio || 'No especificado'}\n\n` +
            `Mensaje:\n${mensaje}`
        );

        window.location.href = `mailto:mojcaestudio@gmail.com?subject=${subject}&body=${body}`;
    });
}

// ========================================
// INICIALIZACION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const data = getData();

    renderTexts(data);
    renderVideosHorizontal(data);
    renderVideosVertical(data);
    renderPhotos(data);
    renderBranding(data);
    renderRedes(data);
    renderWebdev(data);

    initNav();
    initScrollReveal();
    initBackgroundGradient();
    initGalleryFilter(data);
    initContactForm();

    document.querySelectorAll('.carousel-outer').forEach(outer => {
        new InfiniteCarousel(outer);
    });

    setTimeout(() => {
        const newReveals = document.querySelectorAll('.scroll-reveal:not(.revealed)');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        newReveals.forEach(el => observer.observe(el));
    }, 100);
});
