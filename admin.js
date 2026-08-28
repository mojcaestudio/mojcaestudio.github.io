// ========================================
// MOJCA ESTUDIO — Panel de Administración
// ========================================

const ADMIN_PASS = 'mojca2024';
let currentData = null;
let currentModalType = null;
let currentModalIndex = null;
let currentModalSubIndex = null;

// ========================================
// DATOS POR DEFECTO AMPLIADOS
// ========================================
const DEFAULT_DATA = {
    texts: {
        logoText: "MOJCA",
        heroLabel: "Estudio Creativo",
        heroTitle: "DAMOS VIDA A TUS IDEAS CON DISEÑO, CREATIVAD Y ESTRATEGIA VISUAL",
        heroSub: "Creamos contenido que se ve, se siente y se comparte.",
        sobreTag: "Sobre Nosotros",
        sobreTitle: "Damos vida a ideas a través de la imagen",
        sobreSubtitle: "Un estudio donde la técnica se encuentra con la sensibilidad artística",
        sobreLead: "Nos especializamos en diseño audiovisual, fotografía, producción de video y estrategias para redes sociales.",
        sobreText: "Creemos en las ideas que emocionan y perduran, en relatos capaces de conectar de verdad con las personas.",
        stat1: "50+",
        stat1Label: "Proyectos Realizados",
        stat2: "30+",
        stat2Label: "Clientes Satisfechos",
        stat3: "5",
        stat3Label: "Años de Trayectoria",
        contactEmail: "mojcaestudio@gmail.com",
        contactLocation: "Villa María, Córdoba, Argentina",
        footerText: "Diseño, creatividad y estrategia visual con alma artesanal."
    },
    style: {
        heroFontSize: "clamp(36px, 5.5vw, 72px)",
        heroFontFamily: "'Space Grotesk', sans-serif",
        heroColor: "#f0f0f0",
        heroLabelColor: "#ff6b35",
        heroSubColor: "#a0a0a0",
        heroLabelSize: "12px",
        heroSubSize: "18px",
        sectionTitleSize: "clamp(32px, 4.5vw, 56px)",
        sectionTitleColor: "#f0f0f0",
        sectionSubtitleColor: "#a0a0a0",
        sectionTagColor: "#ff6b35",
        sectionTagSize: "11px",
        bodyFontSize: "16px",
        bodyFontFamily: "'Inter', sans-serif",
        bodyColor: "#f0f0f0",
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
    testimonios: {
        enabled: true,
        bgType: "gradient",
        bgGradient: "linear-gradient(135deg, #1a0a05 0%, #0f0a05 50%, #1a0505 100%)",
        bgImage: "",
        bgColor: "#111111",
        items: [
            { id: "t1", nombre: "María González", empresa: "Marca X", texto: "Trabajar con Mojca fue una experiencia transformadora. Entendieron exactamente lo que necesitábamos y lo elevaron a otro nivel.", avatar: "" },
            { id: "t2", nombre: "Carlos Rodríguez", empresa: "Startup Y", texto: "La atención al detalle y la creatividad que ponen en cada proyecto es impresionante. Son nuestros aliados creativos de confianza.", avatar: "" },
            { id: "t3", nombre: "Lucía Martínez", empresa: "Restaurante Z", texto: "Nuestra imagen cambió por completo gracias a ellos. El rebranding superó todas nuestras expectativas.", avatar: "" },
            { id: "t4", nombre: "Juan Pérez", empresa: "Tienda Online W", texto: "Profesionalismo, creatividad y un trato humano excepcional. Recomiendo Mojca sin dudarlo.", avatar: "" }
        ]
    },
    videosHorizontal: [
        { id: "vh1", type: "video", src: "", title: "Spot Comercial — Marca X", description: "Dirección, filmación y postproducción para campaña de lanzamiento.", views: "12.4K", likes: "856", tag: "Comercial" },
        { id: "vh2", type: "video", src: "", title: "Video Musical — Artista Y", description: "Concepto visual, dirección de arte y edición para single debut.", views: "45.2K", likes: "2.1K", tag: "Musical" },
        { id: "vh3", type: "video", src: "", title: "Corporativo — Empresa Z", description: "Video institucional con tomas aéreas en drone, entrevistas y motion graphics.", views: "8.7K", likes: "423", tag: "Corporativo" },
        { id: "vh4", type: "video", src: "", title: "Documental — Proyecto Social", description: "Cobertura documental de 3 días. Edición narrativa con arco emocional.", views: "3.1K", likes: "189", tag: "Documental" }
    ],
    videosVertical: [
        { id: "vv1", type: "video", src: "", title: "Behind the Scenes", description: "Un día de producción en el estudio", views: "89K", likes: "4.2K" },
        { id: "vv2", type: "video", src: "", title: "Tutorial de Color", description: "Antes y después del color grading", views: "156K", likes: "8.7K" },
        { id: "vv3", type: "video", src: "", title: "Transiciones Creativas", description: "Edición con match cuts y speed ramps", views: "234K", likes: "12K" },
        { id: "vv4", type: "video", src: "", title: "Motion Graphics", description: "Animaciones tipográficas y visuales", views: "67K", likes: "3.4K" },
        { id: "vv5", type: "video", src: "", title: "Producto en 15s", description: "Spot rápido para redes sociales", views: "312K", likes: "18K" }
    ],
    photos: [
        { id: "p1", src: "", title: "Skincare Campaign", category: "producto", size: "1x1" },
        { id: "p2", src: "", title: "Retrato Editorial", category: "retrato", size: "1x2" },
        { id: "p3", src: "", title: "Evento Corporativo", category: "evento", size: "1x1" },
        { id: "p4", src: "", title: "Urban Lifestyle", category: "lifestyle", size: "1x1" },
        { id: "p5", src: "", title: "Flat Lay E-commerce", category: "producto", size: "2x1" },
        { id: "p6", src: "", title: "Retrato Artístico", category: "retrato", size: "1x1" }
    ],
    branding: [
        { id: "b1", src: "", title: "Marca A — Identidad Completa", description: "Diseño de logo, paleta cromática, tipografía y aplicaciones.", tags: ["Logo", "Packaging", "Social"] },
        { id: "b2", src: "", title: "Restaurante B — Rebranding", description: "Renovación completa de imagen: desde el menú físico hasta la presencia digital.", tags: ["Rebranding", "Menú", "Web"] },
        { id: "b3", src: "", title: "Startup C — Brand Book", description: "Manual de marca completo con guidelines de uso.", tags: ["Brand Book", "Guidelines"] }
    ],
    redes: [
        { id: "r1", type: "carousel", slides: [{ src: "", label: "Campaña Verano 1/3" }, { src: "", label: "Campaña Verano 2/3" }, { src: "", label: "Campaña Verano 3/3" }], likes: "1,247", caption: "Nueva campaña de verano para @marcacliente.", hashtags: "#audiovisual #redessociales", time: "Hace 2 días", location: "Buenos Aires, Argentina" },
        { id: "r2", type: "reel", src: "", label: "Behind the Scenes Reel", likes: "3,892", caption: "Behind the scenes de nuestra última producción.", hashtags: "#behindthescenes #produccion", time: "Hace 5 días", location: "Córdoba, Argentina" },
        { id: "r3", type: "carousel", slides: [{ src: "", label: "Branding 1/4" }, { src: "", label: "Branding 2/4" }, { src: "", label: "Branding 3/4" }, { src: "", label: "Branding 4/4" }], likes: "892", caption: "Branding completo para un nuevo emprendimiento local.", hashtags: "#branding #diseno #emprendedores", time: "Hace 1 semana", location: "Rosario, Argentina" }
    ],
    webdev: [
        { id: "w1", src: "", title: "E-commerce — Tienda de Moda", description: "Tienda online completa con carrito, pasarela de pagos y panel de administración.", stack: ["React", "Next.js", "Stripe", "Tailwind"], linkLive: "#", linkRepo: "#" },
        { id: "w2", src: "", title: "Landing Page — SaaS", description: "Landing page de alta conversión para startup de software.", stack: ["Vue 3", "Vite", "GSAP", "Netlify"], linkLive: "#", linkRepo: "#" },
        { id: "w3", src: "", title: "Portfolio Interactivo — Artista", description: "Portfolio inmersivo con scroll horizontal, WebGL effects.", stack: ["Three.js", "React", "Framer Motion", "Vercel"], linkLive: "#", linkRepo: "#" }
    ],
    whatsapp: {
        number: "5493534000000",
        message: "Hola Mojca Estudio, me interesa trabajar con ustedes",
        floatEnabled: true,
        floatLabel: "Escribinos"
    }
};

function getData() {
    const saved = localStorage.getItem('mojcaData');
    if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults for new fields
        const merged = deepMerge(JSON.parse(JSON.stringify(DEFAULT_DATA)), parsed);
        return merged;
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

function saveData(data) {
    localStorage.setItem('mojcaData', JSON.stringify(data));
}

function resetData() {
    localStorage.setItem('mojcaData', JSON.stringify(DEFAULT_DATA));
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

// ========================================
// LOGIN
// ========================================
function doLogin() {
    const input = document.getElementById('passwordInput');
    const error = document.getElementById('loginError');
    if (input.value === ADMIN_PASS) {
        localStorage.setItem('mojcaAdminLogged', 'true');
        showAdmin();
    } else {
        error.style.display = 'block';
        input.style.borderColor = 'var(--accent-terracotta)';
    }
}

function logout() {
    localStorage.removeItem('mojcaAdminLogged');
    location.reload();
}

function showAdmin() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminLayout').classList.add('active');
    currentData = getData();
    initAllPanels();
}

function checkLogin() {
    if (localStorage.getItem('mojcaAdminLogged') === 'true') {
        showAdmin();
    }
}

// ========================================
// NAVEGACIÓN
// ========================================
function showSection(section) {
    document.querySelectorAll('.sidebar-nav button').forEach(b => b.classList.remove('active'));
    document.querySelector(`.sidebar-nav button[data-section="${section}"]`).classList.add('active');
    document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-' + section).classList.add('active');
}

// ========================================
// TOAST
// ========================================
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ========================================
// MODAL
// ========================================
function openModal(type, index, subIndex) {
    currentModalType = type;
    currentModalIndex = index;
    currentModalSubIndex = subIndex;
    const overlay = document.getElementById('modalOverlay');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');

    overlay.classList.add('active');
    body.innerHTML = '';

    switch (type) {
        case 'video-h':
            title.textContent = index !== undefined ? 'Editar Video Horizontal' : 'Agregar Video Horizontal';
            body.innerHTML = buildVideoForm(currentData.videosHorizontal[index] || {});
            break;
        case 'video-v':
            title.textContent = index !== undefined ? 'Editar Reel/Short' : 'Agregar Reel/Short';
            body.innerHTML = buildVideoForm(currentData.videosVertical[index] || {}, true);
            break;
        case 'foto':
            title.textContent = index !== undefined ? 'Editar Foto' : 'Agregar Foto';
            body.innerHTML = buildFotoForm(currentData.photos[index] || {});
            break;
        case 'branding':
            title.textContent = index !== undefined ? 'Editar Proyecto Branding' : 'Agregar Proyecto Branding';
            body.innerHTML = buildBrandingForm(currentData.branding[index] || {});
            break;
        case 'redes-carousel':
            title.textContent = index !== undefined ? 'Editar Post Carrusel' : 'Agregar Post Carrusel';
            body.innerHTML = buildRedesCarouselForm(currentData.redes[index] || {});
            break;
        case 'redes-reel':
            title.textContent = index !== undefined ? 'Editar Reel' : 'Agregar Reel';
            body.innerHTML = buildRedesReelForm(currentData.redes[index] || {});
            break;
        case 'webdev':
            title.textContent = index !== undefined ? 'Editar Proyecto Web' : 'Agregar Proyecto Web';
            body.innerHTML = buildWebdevForm(currentData.webdev[index] || {});
            break;
        case 'testimonio':
            title.textContent = index !== undefined ? 'Editar Testimonio' : 'Agregar Testimonio';
            body.innerHTML = buildTestimonioForm(currentData.testimonios.items[index] || {});
            break;
    }
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    currentModalType = null;
    currentModalIndex = null;
    currentModalSubIndex = null;
}

function saveModal() {
    const form = document.getElementById('modalForm');
    if (!form) return;
    const fd = new FormData(form);
    const obj = {};
    fd.forEach((v, k) => {
        if (obj[k]) {
            if (!Array.isArray(obj[k])) obj[k] = [obj[k]];
            obj[k].push(v);
        } else {
            obj[k] = v;
        }
    });

    switch (currentModalType) {
        case 'video-h':
            saveToArray('videosHorizontal', obj, ['title', 'description', 'views', 'likes', 'tag', 'src']);
            renderVideosH();
            break;
        case 'video-v':
            saveToArray('videosVertical', obj, ['title', 'description', 'views', 'likes', 'src']);
            renderVideosV();
            break;
        case 'foto':
            saveToArray('photos', obj, ['title', 'category', 'size', 'src']);
            renderPhotos();
            break;
        case 'branding':
            obj.tags = (obj.tags || '').split(',').map(t => t.trim()).filter(Boolean);
            saveToArray('branding', obj, ['title', 'description', 'src', 'tags']);
            renderBranding();
            break;
        case 'redes-carousel':
            obj.slides = [];
            let i = 0;
            while (fd.has(`slide_src_${i}`)) {
                obj.slides.push({ src: fd.get(`slide_src_${i}`), label: fd.get(`slide_label_${i}`) });
                i++;
            }
            if (obj.slides.length === 0) obj.slides = [{ src: '', label: '' }];
            saveToArray('redes', obj, ['type', 'likes', 'caption', 'hashtags', 'time', 'location', 'slides']);
            obj.type = 'carousel';
            renderRedes();
            break;
        case 'redes-reel':
            saveToArray('redes', obj, ['type', 'src', 'label', 'likes', 'caption', 'hashtags', 'time', 'location']);
            obj.type = 'reel';
            renderRedes();
            break;
        case 'webdev':
            obj.stack = (obj.stack || '').split(',').map(t => t.trim()).filter(Boolean);
            saveToArray('webdev', obj, ['title', 'description', 'src', 'stack', 'linkLive', 'linkRepo']);
            renderWebdev();
            break;
        case 'testimonio':
            saveToArray('testimonios.items', obj, ['nombre', 'empresa', 'texto', 'avatar']);
            renderTestimonios();
            break;
    }

    saveData(currentData);
    closeModal();
    showToast('Guardado correctamente');
}

function saveToArray(path, obj, fields) {
    const keys = path.split('.');
    let arr = currentData;
    for (let i = 0; i < keys.length - 1; i++) arr = arr[keys[i]];
    arr = arr[keys[keys.length - 1]];

    const newItem = { id: obj.id || generateId() };
    fields.forEach(f => {
        if (obj[f] !== undefined) newItem[f] = obj[f];
    });

    if (currentModalIndex !== undefined) {
        arr[currentModalIndex] = { ...arr[currentModalIndex], ...newItem };
    } else {
        arr.push(newItem);
    }
}

function generateId() {
    return 'id' + Math.random().toString(36).substr(2, 9);
}

// ========================================
// FORM BUILDERS
// ========================================
function buildVideoForm(v, isVertical) {
    return `
    <form id="modalForm">
        <input type="hidden" name="id" value="${v.id || ''}">
        <div class="form-group-admin"><label>Título</label><input type="text" name="title" value="${esc(v.title || '')}" required></div>
        <div class="form-group-admin"><label>Descripción</label><textarea name="description" rows="3">${esc(v.description || '')}</textarea></div>
        <div class="form-row">
            <div class="form-group-admin"><label>Vistas</label><input type="text" name="views" value="${esc(v.views || '')}"></div>
            <div class="form-group-admin"><label>Likes</label><input type="text" name="likes" value="${esc(v.likes || '')}"></div>
        </div>
        ${!isVertical ? `<div class="form-group-admin"><label>Tag</label><input type="text" name="tag" value="${esc(v.tag || '')}"></div>` : ''}
        <div class="form-group-admin"><label>URL del Video (YouTube, Vimeo, MP4)</label><input type="text" name="src" value="${esc(v.src || '')}" placeholder="https://..."></div>
    </form>`;
}

function buildFotoForm(p) {
    return `
    <form id="modalForm">
        <input type="hidden" name="id" value="${p.id || ''}">
        <div class="form-group-admin"><label>Título</label><input type="text" name="title" value="${esc(p.title || '')}" required></div>
        <div class="form-row">
            <div class="form-group-admin"><label>Categoría</label>
                <select name="category">
                    <option value="producto" ${p.category === 'producto' ? 'selected' : ''}>Producto</option>
                    <option value="retrato" ${p.category === 'retrato' ? 'selected' : ''}>Retrato</option>
                    <option value="evento" ${p.category === 'evento' ? 'selected' : ''}>Evento</option>
                    <option value="lifestyle" ${p.category === 'lifestyle' ? 'selected' : ''}>Lifestyle</option>
                </select>
            </div>
            <div class="form-group-admin"><label>Tamaño</label>
                <select name="size">
                    <option value="1x1" ${p.size === '1x1' ? 'selected' : ''}>1x1</option>
                    <option value="1x2" ${p.size === '1x2' ? 'selected' : ''}>1x2</option>
                    <option value="2x1" ${p.size === '2x1' ? 'selected' : ''}>2x1</option>
                    <option value="2x2" ${p.size === '2x2' ? 'selected' : ''}>2x2</option>
                    <option value="1x3" ${p.size === '1x3' ? 'selected' : ''}>1x3</option>
                    <option value="3x1" ${p.size === '3x1' ? 'selected' : ''}>3x1</option>
                    <option value="4x1" ${p.size === '4x1' ? 'selected' : ''}>4x1</option>
                </select>
            </div>
        </div>
        <div class="form-group-admin"><label>URL de la Imagen</label><input type="text" name="src" value="${esc(p.src || '')}" placeholder="https://..."></div>
    </form>`;
}

function buildBrandingForm(b) {
    return `
    <form id="modalForm">
        <input type="hidden" name="id" value="${b.id || ''}">
        <div class="form-group-admin"><label>Título</label><input type="text" name="title" value="${esc(b.title || '')}" required></div>
        <div class="form-group-admin"><label>Descripción</label><textarea name="description" rows="3">${esc(b.description || '')}</textarea></div>
        <div class="form-group-admin"><label>Tags (separados por coma)</label><input type="text" name="tags" value="${esc((b.tags || []).join(', ')}" placeholder="Logo, Packaging, Social"></div>
        <div class="form-group-admin"><label>URL de la Imagen</label><input type="text" name="src" value="${esc(b.src || '')}" placeholder="https://..."></div>
    </form>`;
}

function buildRedesCarouselForm(r) {
    const slides = r.slides || [{ src: '', label: '' }];
    let slidesHTML = '';
    slides.forEach((s, i) => {
        slidesHTML += `
        <div class="form-row" style="border:1px solid var(--border);padding:12px;border-radius:8px;margin-bottom:8px;">
            <div class="form-group-admin"><label>Slide ${i + 1} - Imagen</label><input type="text" name="slide_src_${i}" value="${esc(s.src || '')}"></div>
            <div class="form-group-admin"><label>Slide ${i + 1} - Label</label><input type="text" name="slide_label_${i}" value="${esc(s.label || '')}"></div>
        </div>`;
    });
    return `
    <form id="modalForm">
        <input type="hidden" name="id" value="${r.id || ''}">
        <div class="form-group-admin"><label>Caption</label><textarea name="caption" rows="2">${esc(r.caption || '')}</textarea></div>
        <div class="form-row">
            <div class="form-group-admin"><label>Likes</label><input type="text" name="likes" value="${esc(r.likes || '')}"></div>
            <div class="form-group-admin"><label>Ubicación</label><input type="text" name="location" value="${esc(r.location || '')}"></div>
        </div>
        <div class="form-row">
            <div class="form-group-admin"><label>Hashtags</label><input type="text" name="hashtags" value="${esc(r.hashtags || '')}"></div>
            <div class="form-group-admin"><label>Tiempo</label><input type="text" name="time" value="${esc(r.time || '')}"></div>
        </div>
        <div style="margin-bottom:12px;"><strong>Slides</strong></div>
        ${slidesHTML}
    </form>`;
}

function buildRedesReelForm(r) {
    return `
    <form id="modalForm">
        <input type="hidden" name="id" value="${r.id || ''}">
        <div class="form-group-admin"><label>Label</label><input type="text" name="label" value="${esc(r.label || '')}"></div>
        <div class="form-group-admin"><label>Caption</label><textarea name="caption" rows="2">${esc(r.caption || '')}</textarea></div>
        <div class="form-row">
            <div class="form-group-admin"><label>Likes</label><input type="text" name="likes" value="${esc(r.likes || '')}"></div>
            <div class="form-group-admin"><label>Ubicación</label><input type="text" name="location" value="${esc(r.location || '')}"></div>
        </div>
        <div class="form-row">
            <div class="form-group-admin"><label>Hashtags</label><input type="text" name="hashtags" value="${esc(r.hashtags || '')}"></div>
            <div class="form-group-admin"><label>Tiempo</label><input type="text" name="time" value="${esc(r.time || '')}"></div>
        </div>
        <div class="form-group-admin"><label>URL del Video</label><input type="text" name="src" value="${esc(r.src || '')}" placeholder="https://..."></div>
    </form>`;
}

function buildWebdevForm(w) {
    return `
    <form id="modalForm">
        <input type="hidden" name="id" value="${w.id || ''}">
        <div class="form-group-admin"><label>Título</label><input type="text" name="title" value="${esc(w.title || '')}" required></div>
        <div class="form-group-admin"><label>Descripción</label><textarea name="description" rows="3">${esc(w.description || '')}</textarea></div>
        <div class="form-group-admin"><label>Stack (separado por coma)</label><input type="text" name="stack" value="${esc((w.stack || []).join(', ')}" placeholder="React, Next.js, Tailwind"></div>
        <div class="form-row">
            <div class="form-group-admin"><label>Link Live</label><input type="text" name="linkLive" value="${esc(w.linkLive || '')}"></div>
            <div class="form-group-admin"><label>Link Repo</label><input type="text" name="linkRepo" value="${esc(w.linkRepo || '')}"></div>
        </div>
        <div class="form-group-admin"><label>URL de la Imagen</label><input type="text" name="src" value="${esc(w.src || '')}" placeholder="https://..."></div>
    </form>`;
}

function buildTestimonioForm(t) {
    return `
    <form id="modalForm">
        <input type="hidden" name="id" value="${t.id || ''}">
        <div class="form-group-admin"><label>Nombre</label><input type="text" name="nombre" value="${esc(t.nombre || '')}" required></div>
        <div class="form-group-admin"><label>Empresa</label><input type="text" name="empresa" value="${esc(t.empresa || '')}"></div>
        <div class="form-group-admin"><label>Texto del testimonio</label><textarea name="texto" rows="4" required>${esc(t.texto || '')}</textarea></div>
        <div class="form-group-admin"><label>URL Avatar (opcional)</label><input type="text" name="avatar" value="${esc(t.avatar || '')}" placeholder="https://..."></div>
    </form>`;
}

function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ========================================
// RENDER PANELS
// ========================================
function initAllPanels() {
    renderTextEditor();
    renderStyleEditor();
    renderHeroEditor();
    renderTestimoniosEditor();
    renderVideosH();
    renderVideosV();
    renderPhotos();
    renderBranding();
    renderRedes();
    renderWebdev();
    renderWhatsappEditor();
}

// ---- TEXTOS ----
function renderTextEditor() {
    const grid = document.getElementById('textEditorGrid');
    if (!grid) return;
    const texts = currentData.texts;
    const fields = [
        ['logoText', 'Texto del Logo'],
        ['heroLabel', 'Label del Hero'],
        ['heroTitle', 'Título del Hero'],
        ['heroSub', 'Subtítulo del Hero'],
        ['sobreTag', 'Tag Sobre Nosotros'],
        ['sobreTitle', 'Título Sobre Nosotros'],
        ['sobreSubtitle', 'Subtítulo Sobre Nosotros'],
        ['sobreLead', 'Lead Sobre Nosotros'],
        ['sobreText', 'Texto Sobre Nosotros'],
        ['stat1', 'Stat 1 Número'],
        ['stat1Label', 'Stat 1 Label'],
        ['stat2', 'Stat 2 Número'],
        ['stat2Label', 'Stat 2 Label'],
        ['stat3', 'Stat 3 Número'],
        ['stat3Label', 'Stat 3 Label'],
        ['contactEmail', 'Email de Contacto'],
        ['contactLocation', 'Ubicación'],
        ['footerText', 'Texto del Footer']
    ];

    grid.innerHTML = fields.map(([key, label]) => `
        <div class="text-editor-card">
            <h4>${label}</h4>
            <div class="form-group-admin">
                <textarea id="text-${key}" rows="3">${esc(texts[key] || '')}</textarea>
            </div>
        </div>
    `).join('');
}

function saveTexts() {
    const texts = currentData.texts;
    Object.keys(texts).forEach(key => {
        const el = document.getElementById('text-' + key);
        if (el) texts[key] = el.value;
    });
    saveData(currentData);
    showToast('Textos guardados');
}

function resetTexts() {
    if (!confirm('¿Restaurar textos por defecto?')) return;
    const defaults = JSON.parse(JSON.stringify(DEFAULT_DATA)).texts;
    currentData.texts = defaults;
    saveData(currentData);
    renderTextEditor();
    showToast('Textos restaurados');
}

// ---- ESTILOS / CONFIG VISUAL ----
function renderStyleEditor() {
    const container = document.getElementById('styleEditorContainer');
    if (!container) return;
    const s = currentData.style;
    container.innerHTML = `
        <div class="text-editor-grid">
            <div class="text-editor-card">
                <h4>Tipografía Hero</h4>
                <div class="form-group-admin"><label>Tamaño</label><input type="text" id="style-heroFontSize" value="${esc(s.heroFontSize)}"></div>
                <div class="form-group-admin"><label>Fuente</label><input type="text" id="style-heroFontFamily" value="${esc(s.heroFontFamily)}"></div>
                <div class="form-group-admin"><label>Color</label><input type="color" id="style-heroColor" value="${s.heroColor}"></div>
            </div>
            <div class="text-editor-card">
                <h4>Label y Subtítulo Hero</h4>
                <div class="form-group-admin"><label>Color Label</label><input type="color" id="style-heroLabelColor" value="${s.heroLabelColor}"></div>
                <div class="form-group-admin"><label>Tamaño Label</label><input type="text" id="style-heroLabelSize" value="${esc(s.heroLabelSize)}"></div>
                <div class="form-group-admin"><label>Color Sub</label><input type="color" id="style-heroSubColor" value="${s.heroSubColor}"></div>
                <div class="form-group-admin"><label>Tamaño Sub</label><input type="text" id="style-heroSubSize" value="${esc(s.heroSubSize)}"></div>
            </div>
            <div class="text-editor-card">
                <h4>Títulos de Sección</h4>
                <div class="form-group-admin"><label>Tamaño</label><input type="text" id="style-sectionTitleSize" value="${esc(s.sectionTitleSize)}"></div>
                <div class="form-group-admin"><label>Color</label><input type="color" id="style-sectionTitleColor" value="${s.sectionTitleColor}"></div>
                <div class="form-group-admin"><label>Color Subtítulo</label><input type="color" id="style-sectionSubtitleColor" value="${s.sectionSubtitleColor}"></div>
                <div class="form-group-admin"><label>Color Tag</label><input type="color" id="style-sectionTagColor" value="${s.sectionTagColor}"></div>
                <div class="form-group-admin"><label>Tamaño Tag</label><input type="text" id="style-sectionTagSize" value="${esc(s.sectionTagSize)}"></div>
            </div>
            <div class="text-editor-card">
                <h4>Tipografía General</h4>
                <div class="form-group-admin"><label>Tamaño Body</label><input type="text" id="style-bodyFontSize" value="${esc(s.bodyFontSize)}"></div>
                <div class="form-group-admin"><label>Fuente Body</label><input type="text" id="style-bodyFontFamily" value="${esc(s.bodyFontFamily)}"></div>
                <div class="form-group-admin"><label>Color Body</label><input type="color" id="style-bodyColor" value="${s.bodyColor}"></div>
            </div>
            <div class="text-editor-card">
                <h4>Colores Principales</h4>
                <div class="form-group-admin"><label>Acento</label><input type="color" id="style-accentColor" value="${s.accentColor}"></div>
                <div class="form-group-admin"><label>Acento Claro</label><input type="color" id="style-accentLight" value="${s.accentLight}"></div>
                <div class="form-group-admin"><label>Fondo Oscuro</label><input type="color" id="style-bgDark" value="${s.bgDark}"></div>
                <div class="form-group-admin"><label>Fondo Panel</label><input type="color" id="style-bgPanel" value="${s.bgPanel}"></div>
                <div class="form-group-admin"><label>Fondo Tarjeta</label><input type="color" id="style-bgCard" value="${s.bgCard}"></div>
            </div>
            <div class="text-editor-card">
                <h4>Textos y Bordes</h4>
                <div class="form-group-admin"><label>Texto Principal</label><input type="color" id="style-textPrimary" value="${s.textPrimary}"></div>
                <div class="form-group-admin"><label>Texto Secundario</label><input type="color" id="style-textSecondary" value="${s.textSecondary}"></div>
                <div class="form-group-admin"><label>Texto Muted</label><input type="color" id="style-textMuted" value="${s.textMuted}"></div>
                <div class="form-group-admin"><label>Color Borde</label><input type="color" id="style-borderColor" value="${s.borderColor}"></div>
            </div>
        </div>
    `;
}

function saveStyles() {
    const s = currentData.style;
    Object.keys(s).forEach(key => {
        const el = document.getElementById('style-' + key);
        if (el) s[key] = el.value;
    });
    saveData(currentData);
    showToast('Estilos guardados');
}

function resetStyles() {
    if (!confirm('¿Restaurar estilos por defecto?')) return;
    currentData.style = JSON.parse(JSON.stringify(DEFAULT_DATA.style));
    saveData(currentData);
    renderStyleEditor();
    showToast('Estilos restaurados');
}

// ---- HERO EDITOR ----
function renderHeroEditor() {
    const container = document.getElementById('heroEditorContainer');
    if (!container) return;
    const h = currentData.hero;
    container.innerHTML = `
        <div class="text-editor-grid">
            <div class="text-editor-card">
                <h4>Video de Fondo</h4>
                <div class="form-group-admin"><label>URL del Video (MP4, WebM, YouTube, Vimeo)</label><input type="text" id="hero-videoSrc" value="${esc(h.videoSrc)}" placeholder="https://..."></div>
                <p style="font-size:12px;color:var(--text-muted);margin-top:4px;">Deja vacío para usar el fondo degradado por defecto.</p>
            </div>
            <div class="text-editor-card">
                <h4>Efecto Glass</h4>
                <div class="form-group-admin">
                    <label><input type="checkbox" id="hero-glassEnabled" ${h.glassEnabled ? 'checked' : ''}> Activar efecto vidrio</label>
                </div>
                <div class="form-group-admin"><label>Blur (px)</label><input type="text" id="hero-glassBlur" value="${esc(h.glassBlur)}"></div>
                <div class="form-group-admin"><label>Opacidad fondo glass (0-1)</label><input type="text" id="hero-glassOpacity" value="${esc(h.glassOpacity)}"></div>
                <div class="form-group-admin"><label>Borde glass</label><input type="text" id="hero-glassBorder" value="${esc(h.glassBorder)}"></div>
            </div>
            <div class="text-editor-card">
                <h4>Overlay</h4>
                <div class="form-group-admin">
                    <label><input type="checkbox" id="hero-overlayEnabled" ${h.overlayEnabled ? 'checked' : ''}> Activar overlay oscuro</label>
                </div>
                <div class="form-group-admin"><label>Color overlay</label><input type="text" id="hero-overlayColor" value="${esc(h.overlayColor)}"></div>
                <div class="form-group-admin"><label>Sombra de texto</label><input type="text" id="hero-textShadow" value="${esc(h.textShadow)}"></div>
            </div>
        </div>
    `;
}

function saveHero() {
    const h = currentData.hero;
    h.videoSrc = document.getElementById('hero-videoSrc').value;
    h.glassEnabled = document.getElementById('hero-glassEnabled').checked;
    h.glassBlur = document.getElementById('hero-glassBlur').value;
    h.glassOpacity = document.getElementById('hero-glassOpacity').value;
    h.glassBorder = document.getElementById('hero-glassBorder').value;
    h.overlayEnabled = document.getElementById('hero-overlayEnabled').checked;
    h.overlayColor = document.getElementById('hero-overlayColor').value;
    h.textShadow = document.getElementById('hero-textShadow').value;
    saveData(currentData);
    showToast('Configuración de Hero guardada');
}

// ---- TESTIMONIOS EDITOR ----
function renderTestimoniosEditor() {
    const container = document.getElementById('testimoniosEditorContainer');
    if (!container) return;
    const t = currentData.testimonios;
    container.innerHTML = `
        <div class="text-editor-grid">
            <div class="text-editor-card" style="grid-column:span 2;">
                <h4>Configuración General</h4>
                <div class="form-group-admin">
                    <label><input type="checkbox" id="test-enabled" ${t.enabled ? 'checked' : ''}> Mostrar sección de testimonios</label>
                </div>
                <div class="form-group-admin"><label>Tipo de fondo</label>
                    <select id="test-bgType">
                        <option value="gradient" ${t.bgType === 'gradient' ? 'selected' : ''}>Degradado</option>
                        <option value="solid" ${t.bgType === 'solid' ? 'selected' : ''}>Color sólido</option>
                        <option value="image" ${t.bgType === 'image' ? 'selected' : ''}>Imagen</option>
                    </select>
                </div>
                <div class="form-group-admin"><label>Fondo degradado (CSS)</label><input type="text" id="test-bgGradient" value="${esc(t.bgGradient)}"></div>
                <div class="form-group-admin"><label>Color sólido</label><input type="color" id="test-bgColor" value="${t.bgColor}"></div>
                <div class="form-group-admin"><label>URL imagen de fondo</label><input type="text" id="test-bgImage" value="${esc(t.bgImage)}" placeholder="https://..."></div>
            </div>
        </div>
        <h4 style="margin:24px 0 16px;font-family:var(--font-display);font-size:16px;">Testimonios</h4>
        <div class="items-list">
            ${t.items.map((item, idx) => `
                <div class="item-card">
                    <div class="item-card-header">
                        <span class="item-card-title">${esc(item.nombre)} — ${esc(item.empresa)}</span>
                        <div class="item-card-actions">
                            <button onclick="openModal('testimonio', ${idx})">Editar</button>
                            <button onclick="deleteTestimonio(${idx})">Eliminar</button>
                        </div>
                    </div>
                    <p style="font-size:13px;color:var(--text-secondary);font-style:italic;">"${esc(item.texto)}"</p>
                </div>
            `).join('')}
        </div>
        <button class="add-item-btn" onclick="openModal('testimonio')" style="margin-top:16px;">
            <span style="font-size:20px;">+</span> Agregar Testimonio
        </button>
    `;
}

function saveTestimoniosConfig() {
    const t = currentData.testimonios;
    t.enabled = document.getElementById('test-enabled').checked;
    t.bgType = document.getElementById('test-bgType').value;
    t.bgGradient = document.getElementById('test-bgGradient').value;
    t.bgColor = document.getElementById('test-bgColor').value;
    t.bgImage = document.getElementById('test-bgImage').value;
    saveData(currentData);
    showToast('Configuración de testimonios guardada');
}

function deleteTestimonio(idx) {
    if (!confirm('¿Eliminar este testimonio?')) return;
    currentData.testimonios.items.splice(idx, 1);
    saveData(currentData);
    renderTestimoniosEditor();
    showToast('Testimonio eliminado');
}

// ---- WHATSAPP EDITOR ----
function renderWhatsappEditor() {
    const container = document.getElementById('whatsappEditorContainer');
    if (!container) return;
    const w = currentData.whatsapp;
    container.innerHTML = `
        <div class="text-editor-grid">
            <div class="text-editor-card">
                <h4>Número de WhatsApp</h4>
                <div class="form-group-admin"><label>Número (con código de país, sin +)</label><input type="text" id="wa-number" value="${esc(w.number)}" placeholder="5493534000000"></div>
                <p style="font-size:12px;color:var(--text-muted);">Ejemplo: 5493534000000 (Argentina)</p>
            </div>
            <div class="text-editor-card">
                <h4>Mensaje Predefinido</h4>
                <div class="form-group-admin"><label>Mensaje</label><input type="text" id="wa-message" value="${esc(w.message)}"></div>
            </div>
            <div class="text-editor-card">
                <h4>Botón Flotante</h4>
                <div class="form-group-admin">
                    <label><input type="checkbox" id="wa-floatEnabled" ${w.floatEnabled ? 'checked' : ''}> Mostrar botón flotante</label>
                </div>
                <div class="form-group-admin"><label>Texto del botón</label><input type="text" id="wa-floatLabel" value="${esc(w.floatLabel)}"></div>
            </div>
        </div>
    `;
}

function saveWhatsapp() {
    const w = currentData.whatsapp;
    w.number = document.getElementById('wa-number').value;
    w.message = document.getElementById('wa-message').value;
    w.floatEnabled = document.getElementById('wa-floatEnabled').checked;
    w.floatLabel = document.getElementById('wa-floatLabel').value;
    saveData(currentData);
    showToast('Configuración de WhatsApp guardada');
}

// ---- VIDEOS H ----
function renderVideosH() {
    const list = document.getElementById('videosHList');
    if (!list) return;
    list.innerHTML = currentData.videosHorizontal.map((v, i) => `
        <div class="item-card">
            <div class="item-card-header">
                <span class="item-card-title">${esc(v.title)}</span>
                <div class="item-card-actions">
                    <button onclick="openModal('video-h', ${i})">Editar</button>
                    <button onclick="deleteItem('videosHorizontal', ${i}, renderVideosH)">Eliminar</button>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group-admin" style="margin-bottom:0;"><label style="margin-bottom:2px;">Descripción</label><p style="font-size:13px;color:var(--text-secondary);">${esc(v.description)}</p></div>
                <div class="form-group-admin" style="margin-bottom:0;"><label style="margin-bottom:2px;">Tag</label><p style="font-size:13px;color:var(--text-secondary);">${esc(v.tag || '')}</p></div>
            </div>
        </div>
    `).join('');
}

// ---- VIDEOS V ----
function renderVideosV() {
    const list = document.getElementById('videosVList');
    if (!list) return;
    list.innerHTML = currentData.videosVertical.map((v, i) => `
        <div class="item-card">
            <div class="item-card-header">
                <span class="item-card-title">${esc(v.title)}</span>
                <div class="item-card-actions">
                    <button onclick="openModal('video-v', ${i})">Editar</button>
                    <button onclick="deleteItem('videosVertical', ${i}, renderVideosV)">Eliminar</button>
                </div>
            </div>
            <p style="font-size:13px;color:var(--text-secondary);">${esc(v.description)}</p>
        </div>
    `).join('');
}

// ---- FOTOS ----
function renderPhotos() {
    const grid = document.getElementById('photoGridEditor');
    if (!grid) return;
    grid.innerHTML = currentData.photos.map((p, i) => `
        <div class="photo-grid-cell occupied" onclick="openModal('foto', ${i})">
            ${p.src ? `<img src="${esc(p.src)}" alt="${esc(p.title)}">` : `<div class="ph-inner"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg></div>`}
            <span class="cell-label">${esc(p.title)}</span>
            <span class="cell-size">${esc(p.size)}</span>
            <div class="cell-actions">
                <button onclick="event.stopPropagation();openModal('foto', ${i})">✎</button>
                <button onclick="event.stopPropagation();deleteItem('photos', ${i}, renderPhotos)">×</button>
            </div>
        </div>
    `).join('');
}

// ---- BRANDING ----
function renderBranding() {
    const list = document.getElementById('brandingList');
    if (!list) return;
    list.innerHTML = currentData.branding.map((b, i) => `
        <div class="item-card">
            <div class="item-card-header">
                <span class="item-card-title">${esc(b.title)}</span>
                <div class="item-card-actions">
                    <button onclick="openModal('branding', ${i})">Editar</button>
                    <button onclick="deleteItem('branding', ${i}, renderBranding)">Eliminar</button>
                </div>
            </div>
            <p style="font-size:13px;color:var(--text-secondary);">${esc(b.description)}</p>
            <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;">${(b.tags || []).map(t => `<span style="font-size:10px;padding:3px 8px;background:var(--bg-card);border:1px solid var(--border);border-radius:4px;color:var(--text-muted);">${esc(t)}</span>`).join('')}</div>
        </div>
    `).join('');
}

// ---- REDES ----
function renderRedes() {
    const list = document.getElementById('redesList');
    if (!list) return;
    list.innerHTML = currentData.redes.map((r, i) => `
        <div class="item-card">
            <div class="item-card-header">
                <span class="item-card-title">${r.type === 'carousel' ? 'Carrusel' : 'Reel'} — ${esc(r.caption || r.label || '').substring(0, 40)}${(r.caption || r.label || '').length > 40 ? '...' : ''}</span>
                <div class="item-card-actions">
                    <button onclick="openModal('${r.type === 'carousel' ? 'redes-carousel' : 'redes-reel'}', ${i})">Editar</button>
                    <button onclick="deleteItem('redes', ${i}, renderRedes)">Eliminar</button>
                </div>
            </div>
            <p style="font-size:13px;color:var(--text-secondary);">${esc(r.location || '')} · ${esc(r.likes || '')} likes</p>
        </div>
    `).join('');
}

// ---- WEBDEV ----
function renderWebdev() {
    const list = document.getElementById('webdevList');
    if (!list) return;
    list.innerHTML = currentData.webdev.map((w, i) => `
        <div class="item-card">
            <div class="item-card-header">
                <span class="item-card-title">${esc(w.title)}</span>
                <div class="item-card-actions">
                    <button onclick="openModal('webdev', ${i})">Editar</button>
                    <button onclick="deleteItem('webdev', ${i}, renderWebdev)">Eliminar</button>
                </div>
            </div>
            <p style="font-size:13px;color:var(--text-secondary);">${esc(w.description)}</p>
            <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;">${(w.stack || []).map(s => `<span style="font-size:10px;padding:3px 8px;background:var(--bg-card);border:1px solid var(--border);border-radius:4px;color:var(--text-muted);">${esc(s)}</span>`).join('')}</div>
        </div>
    `).join('');
}

// ---- UTILS ----
function deleteItem(key, idx, renderFn) {
    if (!confirm('¿Eliminar este elemento?')) return;
    const keys = key.split('.');
    let arr = currentData;
    for (let i = 0; i < keys.length - 1; i++) arr = arr[keys[i]];
    arr = arr[keys[keys.length - 1]];
    arr.splice(idx, 1);
    saveData(currentData);
    renderFn();
    showToast('Eliminado');
}

function saveAll() {
    saveData(currentData);
    showToast('Todos los cambios guardados');
}

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    checkLogin();
});
