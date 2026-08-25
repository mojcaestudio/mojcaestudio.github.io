// ========================================
// MOJCA ESTUDIO — Panel de Administracion
// ========================================

const ADMIN_PASSWORD_KEY = 'mojcaAdminPass';
const DEFAULT_PASSWORD = 'mojca2024';
let currentData = null;
let currentModalType = null;
let currentEditId = null;

// ========================================
// LOGIN
// ========================================
function doLogin() {
    const input = document.getElementById('passwordInput').value;
    const savedPass = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (input === savedPass) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminLayout').classList.add('active');
        initAdmin();
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
}

function logout() {
    document.getElementById('adminLayout').classList.remove('active');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('passwordInput').value = '';
    document.getElementById('loginError').style.display = 'none';
}

// ========================================
// UTILIDADES
// ========================================
function getData() {
    const saved = localStorage.getItem('mojcaData');
    if (saved) return JSON.parse(saved);
    return null;
}

function saveData(data) {
    localStorage.setItem('mojcaData', JSON.stringify(data));
    currentData = data;
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
}

// ========================================
// NAVEGACION
// ========================================
function showSection(section) {
    document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sidebar-nav button').forEach(b => b.classList.remove('active'));
    document.getElementById('panel-' + section).classList.add('active');
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
}

// ========================================
// INICIALIZACION
// ========================================
function initAdmin() {
    currentData = getData();
    if (!currentData) {
        showToast('Cargando datos por defecto...');
        setTimeout(() => location.reload(), 1500);
        return;
    }
    renderTextEditor();
    renderVideosH();
    renderVideosV();
    renderPhotoGrid();
    renderBranding();
    renderRedes();
    renderWebdev();
}

// ========================================
// EDITOR DE TEXTOS
// ========================================
function renderTextEditor() {
    const grid = document.getElementById('textEditorGrid');
    if (!grid || !currentData) return;

    const textMap = {
        logoText: 'Logo / Marca',
        heroLabel: 'Hero — Etiqueta',
        heroTitle: 'Hero — Titulo',
        heroSub: 'Hero — Subtitulo',
        sobreTag: 'Sobre — Etiqueta',
        sobreTitle: 'Sobre — Titulo',
        sobreSubtitle: 'Sobre — Subtitulo',
        sobreLead: 'Sobre — Texto Principal',
        sobreText: 'Sobre — Texto Secundario',
        stat1: 'Estadistica 1 — Numero',
        stat1Label: 'Estadistica 1 — Label',
        stat2: 'Estadistica 2 — Numero',
        stat2Label: 'Estadistica 2 — Label',
        stat3: 'Estadistica 3 — Numero',
        stat3Label: 'Estadistica 3 — Label',
        contactEmail: 'Contacto — Email',
        contactLocation: 'Contacto — Ubicacion',
        footerText: 'Footer — Texto'
    };

    grid.innerHTML = Object.keys(textMap).map(key => `
        <div class="text-editor-card">
            <h4>${textMap[key]}</h4>
            <div class="form-group-admin">
                <textarea id="text-${key}" rows="3">${currentData.texts[key] || ''}</textarea>
            </div>
        </div>
    `).join('');
}

function saveTexts() {
    if (!currentData) return;
    document.querySelectorAll('[id^="text-"]').forEach(el => {
        const key = el.id.replace('text-', '');
        currentData.texts[key] = el.value;
    });
    saveData(currentData);
    showToast('Textos guardados correctamente');
}

function resetTexts() {
    if (!confirm('¿Seguro que queres restaurar los textos por defecto?')) return;
    localStorage.removeItem('mojcaData');
    location.reload();
}

// ========================================
// VIDEOS HORIZONTALES
// ========================================
function renderVideosH() {
    const list = document.getElementById('videosHList');
    if (!list || !currentData) return;

    list.innerHTML = currentData.videosHorizontal.map((v, i) => `
        <div class="item-card" data-id="${v.id}">
            <div class="item-card-header">
                <span class="item-card-title">${i + 1}. ${v.title}</span>
                <div class="item-card-actions">
                    <button onclick="editItem('video-h', '${v.id}')">Editar</button>
                    <button onclick="deleteItem('videosHorizontal', '${v.id}')">Eliminar</button>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group-admin">
                    <label>URL del video (YouTube, Vimeo, o archivo)</label>
                    <input type="text" value="${v.src}" onchange="updateField('videosHorizontal', '${v.id}', 'src', this.value)">
                </div>
                <div class="form-group-admin">
                    <label>Titulo</label>
                    <input type="text" value="${v.title}" onchange="updateField('videosHorizontal', '${v.id}', 'title', this.value)">
                </div>
            </div>
            <div class="form-group-admin">
                <label>Descripcion</label>
                <textarea onchange="updateField('videosHorizontal', '${v.id}', 'description', this.value)">${v.description}</textarea>
            </div>
            <div class="form-row">
                <div class="form-group-admin">
                    <label>Vistas</label>
                    <input type="text" value="${v.views}" onchange="updateField('videosHorizontal', '${v.id}', 'views', this.value)">
                </div>
                <div class="form-group-admin">
                    <label>Likes</label>
                    <input type="text" value="${v.likes}" onchange="updateField('videosHorizontal', '${v.id}', 'likes', this.value)">
                </div>
                <div class="form-group-admin">
                    <label>Tag</label>
                    <input type="text" value="${v.tag}" onchange="updateField('videosHorizontal', '${v.id}', 'tag', this.value)">
                </div>
            </div>
        </div>
    `).join('');
}

// ========================================
// VIDEOS VERTICALES
// ========================================
function renderVideosV() {
    const list = document.getElementById('videosVList');
    if (!list || !currentData) return;

    list.innerHTML = currentData.videosVertical.map((v, i) => `
        <div class="item-card" data-id="${v.id}">
            <div class="item-card-header">
                <span class="item-card-title">${i + 1}. ${v.title}</span>
                <div class="item-card-actions">
                    <button onclick="editItem('video-v', '${v.id}')">Editar</button>
                    <button onclick="deleteItem('videosVertical', '${v.id}')">Eliminar</button>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group-admin">
                    <label>URL del video</label>
                    <input type="text" value="${v.src}" onchange="updateField('videosVertical', '${v.id}', 'src', this.value)">
                </div>
                <div class="form-group-admin">
                    <label>Titulo</label>
                    <input type="text" value="${v.title}" onchange="updateField('videosVertical', '${v.id}', 'title', this.value)">
                </div>
            </div>
            <div class="form-group-admin">
                <label>Descripcion</label>
                <textarea onchange="updateField('videosVertical', '${v.id}', 'description', this.value)">${v.description}</textarea>
            </div>
            <div class="form-row">
                <div class="form-group-admin">
                    <label>Vistas</label>
                    <input type="text" value="${v.views}" onchange="updateField('videosVertical', '${v.id}', 'views', this.value)">
                </div>
                <div class="form-group-admin">
                    <label>Likes</label>
                    <input type="text" value="${v.likes}" onchange="updateField('videosVertical', '${v.id}', 'likes', this.value)">
                </div>
            </div>
        </div>
    `).join('');
}

// ========================================
// GRILLA DE FOTOS
// ========================================
function renderPhotoGrid() {
    const grid = document.getElementById('photoGridEditor');
    if (!grid || !currentData) return;

    const maxCells = Math.max(12, currentData.photos.length);
    grid.innerHTML = '';

    for (let i = 0; i < maxCells; i++) {
        const photo = currentData.photos[i];
        const cell = document.createElement('div');
        cell.className = 'photo-grid-cell' + (photo ? ' occupied' : '');
        cell.onclick = () => photo ? editPhoto(photo.id) : openModal('foto');

        if (photo) {
            cell.innerHTML = `
                <div class="cell-actions">
                    <button onclick="event.stopPropagation();editPhoto('${photo.id}')" title="Editar">&#9998;</button>
                    <button onclick="event.stopPropagation();deleteItem('photos', '${photo.id}')" title="Eliminar">&#10005;</button>
                </div>
                ${photo.src ? `<img src="${photo.src}" alt="${photo.title}">` : `<span style="color:var(--text-muted);font-size:12px;">${photo.title}</span>`}
                <span class="cell-label">${photo.title}</span>
                <span class="cell-size">${photo.size}</span>
            `;
        } else {
            cell.innerHTML = `<span style="color:var(--text-muted);font-size:24px;">+</span>`;
        }
        grid.appendChild(cell);
    }
}

function editPhoto(id) {
    currentEditId = id;
    currentModalType = 'foto-edit';
    const photo = currentData.photos.find(p => p.id === id);
    if (!photo) return;

    document.getElementById('modalTitle').textContent = 'Editar Foto';
    document.getElementById('modalBody').innerHTML = `
        <div class="form-group-admin">
            <label>URL de la imagen</label>
            <input type="text" id="edit-foto-src" value="${photo.src}" placeholder="https://...">
        </div>
        <div class="form-group-admin">
            <label>Titulo</label>
            <input type="text" id="edit-foto-title" value="${photo.title}">
        </div>
        <div class="form-group-admin">
            <label>Categoria</label>
            <select id="edit-foto-category">
                <option value="producto" ${photo.category === 'producto' ? 'selected' : ''}>Producto</option>
                <option value="retrato" ${photo.category === 'retrato' ? 'selected' : ''}>Retrato</option>
                <option value="evento" ${photo.category === 'evento' ? 'selected' : ''}>Evento</option>
                <option value="lifestyle" ${photo.category === 'lifestyle' ? 'selected' : ''}>Lifestyle</option>
            </select>
        </div>
        <div class="form-group-admin">
            <label>Tamano en la grilla</label>
            <div class="size-selector">
                ${['1x1','1x2','2x1','2x2','3x1','1x3','4x1'].map(s => `
                    <span class="size-option ${photo.size === s ? 'active' : ''}" onclick="selectSize(this,'${s}')">${s}</span>
                `).join('')}
            </div>
            <input type="hidden" id="edit-foto-size" value="${photo.size}">
        </div>
    `;
    document.getElementById('modalOverlay').classList.add('active');
}

function selectSize(el, size) {
    document.querySelectorAll('.size-option').forEach(o => o.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('edit-foto-size').value = size;
}

// ========================================
// BRANDING
// ========================================
function renderBranding() {
    const list = document.getElementById('brandingList');
    if (!list || !currentData) return;

    list.innerHTML = currentData.branding.map((b, i) => `
        <div class="item-card" data-id="${b.id}">
            <div class="item-card-header">
                <span class="item-card-title">${i + 1}. ${b.title}</span>
                <div class="item-card-actions">
                    <button onclick="editItem('branding', '${b.id}')">Editar</button>
                    <button onclick="deleteItem('branding', '${b.id}')">Eliminar</button>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group-admin">
                    <label>URL de la imagen</label>
                    <input type="text" value="${b.src}" onchange="updateField('branding', '${b.id}', 'src', this.value)">
                </div>
                <div class="form-group-admin">
                    <label>Titulo</label>
                    <input type="text" value="${b.title}" onchange="updateField('branding', '${b.id}', 'title', this.value)">
                </div>
            </div>
            <div class="form-group-admin">
                <label>Descripcion</label>
                <textarea onchange="updateField('branding', '${b.id}', 'description', this.value)">${b.description}</textarea>
            </div>
            <div class="form-group-admin">
                <label>Tags (separados por coma)</label>
                <input type="text" value="${b.tags.join(', ')}" onchange="updateField('branding', '${b.id}', 'tags', this.value.split(',').map(t=>t.trim()))">
            </div>
        </div>
    `).join('');
}

// ========================================
// REDES SOCIALES
// ========================================
function renderRedes() {
    const list = document.getElementById('redesList');
    if (!list || !currentData) return;

    list.innerHTML = currentData.redes.map((r, i) => `
        <div class="item-card" data-id="${r.id}">
            <div class="item-card-header">
                <span class="item-card-title">${i + 1}. ${r.type === 'carousel' ? 'Carrusel' : 'Reel'} — ${r.caption.substring(0, 40)}...</span>
                <div class="item-card-actions">
                    <button onclick="editItem('redes', '${r.id}')">Editar</button>
                    <button onclick="deleteItem('redes', '${r.id}')">Eliminar</button>
                </div>
            </div>
            ${r.type === 'carousel' ? `
                <div class="form-group-admin">
                    <label>Slides (${r.slides.length} imagenes)</label>
                    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
                        ${r.slides.map((s, idx) => `
                            <div style="width:80px;height:80px;background:var(--bg-input);border-radius:4px;overflow:hidden;position:relative;">
                                ${s.src ? `<img src="${s.src}" style="width:100%;height:100%;object-fit:cover;">` : '<span style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);font-size:10px;">'+s.label+'</span>'}
                                <button onclick="removeRedesSlide('${r.id}', ${idx})" style="position:absolute;top:2px;right:2px;width:18px;height:18px;background:var(--accent-terracotta);color:white;border:none;border-radius:50%;font-size:10px;cursor:pointer;">&#10005;</button>
                            </div>
                        `).join('')}
                        <button onclick="addRedesSlide('${r.id}')" style="width:80px;height:80px;background:var(--bg-input);border:2px dashed var(--border);border-radius:4px;color:var(--text-muted);cursor:pointer;font-size:20px;">+</button>
                    </div>
                </div>
            ` : `
                <div class="form-row">
                    <div class="form-group-admin">
                        <label>URL del video/imagen</label>
                        <input type="text" value="${r.src}" onchange="updateField('redes', '${r.id}', 'src', this.value)">
                    </div>
                    <div class="form-group-admin">
                        <label>Label</label>
                        <input type="text" value="${r.label}" onchange="updateField('redes', '${r.id}', 'label', this.value)">
                    </div>
                </div>
            `}
            <div class="form-row">
                <div class="form-group-admin">
                    <label>Likes</label>
                    <input type="text" value="${r.likes}" onchange="updateField('redes', '${r.id}', 'likes', this.value)">
                </div>
                <div class="form-group-admin">
                    <label>Tiempo</label>
                    <input type="text" value="${r.time}" onchange="updateField('redes', '${r.id}', 'time', this.value)">
                </div>
            </div>
            <div class="form-group-admin">
                <label>Caption</label>
                <textarea onchange="updateField('redes', '${r.id}', 'caption', this.value)">${r.caption}</textarea>
            </div>
            <div class="form-row">
                <div class="form-group-admin">
                    <label>Hashtags</label>
                    <input type="text" value="${r.hashtags}" onchange="updateField('redes', '${r.id}', 'hashtags', this.value)">
                </div>
                <div class="form-group-admin">
                    <label>Ubicacion</label>
                    <input type="text" value="${r.location}" onchange="updateField('redes', '${r.id}', 'location', this.value)">
                </div>
            </div>
        </div>
    `).join('');
}

function addRedesSlide(postId) {
    const post = currentData.redes.find(r => r.id === postId);
    if (!post || post.type !== 'carousel') return;
    post.slides.push({ src: '', label: 'Nueva imagen' });
    saveData(currentData);
    renderRedes();
    showToast('Slide agregado');
}

function removeRedesSlide(postId, slideIndex) {
    const post = currentData.redes.find(r => r.id === postId);
    if (!post || post.type !== 'carousel') return;
    if (post.slides.length <= 1) {
        showToast('Debe tener al menos un slide');
        return;
    }
    post.slides.splice(slideIndex, 1);
    saveData(currentData);
    renderRedes();
    showToast('Slide eliminado');
}

// ========================================
// WEBDEV
// ========================================
function renderWebdev() {
    const list = document.getElementById('webdevList');
    if (!list || !currentData) return;

    list.innerHTML = currentData.webdev.map((w, i) => `
        <div class="item-card" data-id="${w.id}">
            <div class="item-card-header">
                <span class="item-card-title">${i + 1}. ${w.title}</span>
                <div class="item-card-actions">
                    <button onclick="editItem('webdev', '${w.id}')">Editar</button>
                    <button onclick="deleteItem('webdev', '${w.id}')">Eliminar</button>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group-admin">
                    <label>URL de la imagen</label>
                    <input type="text" value="${w.src}" onchange="updateField('webdev', '${w.id}', 'src', this.value)">
                </div>
                <div class="form-group-admin">
                    <label>Titulo</label>
                    <input type="text" value="${w.title}" onchange="updateField('webdev', '${w.id}', 'title', this.value)">
                </div>
            </div>
            <div class="form-group-admin">
                <label>Descripcion</label>
                <textarea onchange="updateField('webdev', '${w.id}', 'description', this.value)">${w.description}</textarea>
            </div>
            <div class="form-group-admin">
                <label>Stack tecnico (separados por coma)</label>
                <input type="text" value="${w.stack.join(', ')}" onchange="updateField('webdev', '${w.id}', 'stack', this.value.split(',').map(t=>t.trim()))">
            </div>
            <div class="form-row">
                <div class="form-group-admin">
                    <label>Link al sitio</label>
                    <input type="text" value="${w.linkLive}" onchange="updateField('webdev', '${w.id}', 'linkLive', this.value)">
                </div>
                <div class="form-group-admin">
                    <label>Link al codigo</label>
                    <input type="text" value="${w.linkRepo}" onchange="updateField('webdev', '${w.id}', 'linkRepo', this.value)">
                </div>
            </div>
        </div>
    `).join('');
}

// ========================================
// ACTUALIZAR / ELIMINAR / EDITAR
// ========================================
function updateField(section, id, field, value) {
    if (!currentData) return;
    const item = currentData[section].find(x => x.id === id);
    if (item) {
        item[field] = value;
        saveData(currentData);
        showToast('Cambio guardado');
    }
}

function deleteItem(section, id) {
    if (!confirm('¿Seguro que queres eliminar este elemento?')) return;
    if (!currentData) return;
    currentData[section] = currentData[section].filter(x => x.id !== id);
    saveData(currentData);
    if (section === 'videosHorizontal') renderVideosH();
    if (section === 'videosVertical') renderVideosV();
    if (section === 'photos') renderPhotoGrid();
    if (section === 'branding') renderBranding();
    if (section === 'redes') renderRedes();
    if (section === 'webdev') renderWebdev();
    showToast('Elemento eliminado');
}

function editItem(section, id) {
    if (section === 'branding') {
        currentEditId = id;
        currentModalType = 'branding-edit';
        const item = currentData.branding.find(b => b.id === id);
        if (!item) return;
        document.getElementById('modalTitle').textContent = 'Editar Branding';
        document.getElementById('modalBody').innerHTML = `
            <div class="form-group-admin"><label>Imagen URL</label><input type="text" id="edit-branding-src" value="${item.src}"></div>
            <div class="form-group-admin"><label>Titulo</label><input type="text" id="edit-branding-title" value="${item.title}"></div>
            <div class="form-group-admin"><label>Descripcion</label><textarea id="edit-branding-desc">${item.description}</textarea></div>
            <div class="form-group-admin"><label>Tags (coma)</label><input type="text" id="edit-branding-tags" value="${item.tags.join(', ')}"></div>
        `;
        document.getElementById('modalOverlay').classList.add('active');
    }
    if (section === 'webdev') {
        currentEditId = id;
        currentModalType = 'webdev-edit';
        const item = currentData.webdev.find(w => w.id === id);
        if (!item) return;
        document.getElementById('modalTitle').textContent = 'Editar Proyecto Web';
        document.getElementById('modalBody').innerHTML = `
            <div class="form-group-admin"><label>Imagen URL</label><input type="text" id="edit-webdev-src" value="${item.src}"></div>
            <div class="form-group-admin"><label>Titulo</label><input type="text" id="edit-webdev-title" value="${item.title}"></div>
            <div class="form-group-admin"><label>Descripcion</label><textarea id="edit-webdev-desc">${item.description}</textarea></div>
            <div class="form-group-admin"><label>Stack (coma)</label><input type="text" id="edit-webdev-stack" value="${item.stack.join(', ')}"></div>
            <div class="form-group-admin"><label>Link al sitio</label><input type="text" id="edit-webdev-live" value="${item.linkLive}"></div>
            <div class="form-group-admin"><label>Link al codigo</label><input type="text" id="edit-webdev-repo" value="${item.linkRepo}"></div>
        `;
        document.getElementById('modalOverlay').classList.add('active');
    }
}

function saveAll() {
    showToast('Todos los cambios guardados');
}

// ========================================
// MODAL — AGREGAR / EDITAR
// ========================================
function openModal(type) {
    currentModalType = type;
    currentEditId = null;
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    if (type === 'video-h') {
        modalTitle.textContent = 'Agregar Video Horizontal';
        modalBody.innerHTML = `
            <div class="form-group-admin"><label>URL del video (YouTube, Vimeo, o archivo)</label><input type="text" id="modal-src" placeholder="https://..."></div>
            <div class="form-group-admin"><label>Titulo</label><input type="text" id="modal-title" placeholder="Ej: Spot Comercial — Marca X"></div>
            <div class="form-group-admin"><label>Descripcion</label><textarea id="modal-desc" placeholder="Describe el proyecto..."></textarea></div>
            <div class="form-row">
                <div class="form-group-admin"><label>Vistas</label><input type="text" id="modal-views" placeholder="12.4K"></div>
                <div class="form-group-admin"><label>Likes</label><input type="text" id="modal-likes" placeholder="856"></div>
            </div>
            <div class="form-group-admin"><label>Tag</label><input type="text" id="modal-tag" placeholder="Ej: Comercial"></div>
        `;
    } else if (type === 'video-v') {
        modalTitle.textContent = 'Agregar Reel/Short Vertical';
        modalBody.innerHTML = `
            <div class="form-group-admin"><label>URL del video</label><input type="text" id="modal-src" placeholder="https://..."></div>
            <div class="form-group-admin"><label>Titulo</label><input type="text" id="modal-title" placeholder="Ej: Behind the Scenes"></div>
            <div class="form-group-admin"><label>Descripcion</label><textarea id="modal-desc" placeholder="Describe el contenido..."></textarea></div>
            <div class="form-row">
                <div class="form-group-admin"><label>Vistas</label><input type="text" id="modal-views" placeholder="89K"></div>
                <div class="form-group-admin"><label>Likes</label><input type="text" id="modal-likes" placeholder="4.2K"></div>
            </div>
        `;
    } else if (type === 'foto') {
        modalTitle.textContent = 'Agregar Foto';
        modalBody.innerHTML = `
            <div class="form-group-admin"><label>URL de la imagen</label><input type="text" id="modal-src" placeholder="https://..."></div>
            <div class="form-group-admin"><label>Titulo</label><input type="text" id="modal-title" placeholder="Ej: Skincare Campaign"></div>
            <div class="form-group-admin"><label>Categoria</label>
                <select id="modal-category">
                    <option value="producto">Producto</option>
                    <option value="retrato">Retrato</option>
                    <option value="evento">Evento</option>
                    <option value="lifestyle">Lifestyle</option>
                </select>
            </div>
            <div class="form-group-admin"><label>Tamano en la grilla</label>
                <div class="size-selector">
                    ${['1x1','1x2','2x1','2x2','3x1','1x3','4x1'].map(s => `
                        <span class="size-option ${s === '1x1' ? 'active' : ''}" onclick="selectSize(this,'${s}')">${s}</span>
                    `).join('')}
                </div>
                <input type="hidden" id="modal-size" value="1x1">
            </div>
        `;
    } else if (type === 'branding') {
        modalTitle.textContent = 'Agregar Proyecto de Branding';
        modalBody.innerHTML = `
            <div class="form-group-admin"><label>Imagen URL</label><input type="text" id="modal-src" placeholder="https://..."></div>
            <div class="form-group-admin"><label>Titulo</label><input type="text" id="modal-title" placeholder="Ej: Marca A — Identidad Completa"></div>
            <div class="form-group-admin"><label>Descripcion</label><textarea id="modal-desc" placeholder="Describe el proyecto..."></textarea></div>
            <div class="form-group-admin"><label>Tags (separados por coma)</label><input type="text" id="modal-tags" placeholder="Logo, Packaging, Social"></div>
        `;
    } else if (type === 'redes-carousel') {
        modalTitle.textContent = 'Agregar Post con Carrusel';
        modalBody.innerHTML = `
            <div class="form-group-admin"><label>URL de la primera imagen</label><input type="text" id="modal-src" placeholder="https://..."></div>
            <div class="form-group-admin"><label>Caption</label><textarea id="modal-caption" placeholder="Escribe el caption..."></textarea></div>
            <div class="form-group-admin"><label>Hashtags</label><input type="text" id="modal-hashtags" placeholder="#hashtag #hashtag2"></div>
            <div class="form-row">
                <div class="form-group-admin"><label>Likes</label><input type="text" id="modal-likes" placeholder="1,247"></div>
                <div class="form-group-admin"><label>Tiempo</label><input type="text" id="modal-time" placeholder="Hace 2 dias"></div>
            </div>
            <div class="form-group-admin"><label>Ubicacion</label><input type="text" id="modal-location" placeholder="Buenos Aires, Argentina"></div>
        `;
    } else if (type === 'redes-reel') {
        modalTitle.textContent = 'Agregar Reel';
        modalBody.innerHTML = `
            <div class="form-group-admin"><label>URL del video</label><input type="text" id="modal-src" placeholder="https://..."></div>
            <div class="form-group-admin"><label>Label</label><input type="text" id="modal-label" placeholder="Ej: Behind the Scenes Reel"></div>
            <div class="form-group-admin"><label>Caption</label><textarea id="modal-caption" placeholder="Escribe el caption..."></textarea></div>
            <div class="form-group-admin"><label>Hashtags</label><input type="text" id="modal-hashtags" placeholder="#hashtag #hashtag2"></div>
            <div class="form-row">
                <div class="form-group-admin"><label>Likes</label><input type="text" id="modal-likes" placeholder="3,892"></div>
                <div class="form-group-admin"><label>Tiempo</label><input type="text" id="modal-time" placeholder="Hace 5 dias"></div>
            </div>
            <div class="form-group-admin"><label>Ubicacion</label><input type="text" id="modal-location" placeholder="Cordoba, Argentina"></div>
        `;
    } else if (type === 'webdev') {
        modalTitle.textContent = 'Agregar Proyecto Web';
        modalBody.innerHTML = `
            <div class="form-group-admin"><label>Imagen URL</label><input type="text" id="modal-src" placeholder="https://..."></div>
            <div class="form-group-admin"><label>Titulo</label><input type="text" id="modal-title" placeholder="Ej: E-commerce — Tienda de Moda"></div>
            <div class="form-group-admin"><label>Descripcion</label><textarea id="modal-desc" placeholder="Describe el proyecto..."></textarea></div>
            <div class="form-group-admin"><label>Stack tecnico (coma)</label><input type="text" id="modal-stack" placeholder="React, Next.js, Stripe, Tailwind"></div>
            <div class="form-row">
                <div class="form-group-admin"><label>Link al sitio</label><input type="text" id="modal-live" placeholder="https://..."></div>
                <div class="form-group-admin"><label>Link al codigo</label><input type="text" id="modal-repo" placeholder="https://..."></div>
            </div>
        `;
    }

    document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    currentModalType = null;
    currentEditId = null;
}

function saveModal() {
    if (!currentData) return;

    if (currentModalType === 'video-h') {
        const newItem = {
            id: generateId(),
            type: 'video',
            src: document.getElementById('modal-src').value,
            title: document.getElementById('modal-title').value,
            description: document.getElementById('modal-desc').value,
            views: document.getElementById('modal-views').value,
            likes: document.getElementById('modal-likes').value,
            tag: document.getElementById('modal-tag').value
        };
        currentData.videosHorizontal.push(newItem);
        saveData(currentData);
        renderVideosH();
        showToast('Video horizontal agregado');
    } else if (currentModalType === 'video-v') {
        const newItem = {
            id: generateId(),
            type: 'video',
            src: document.getElementById('modal-src').value,
            title: document.getElementById('modal-title').value,
            description: document.getElementById('modal-desc').value,
            views: document.getElementById('modal-views').value,
            likes: document.getElementById('modal-likes').value
        };
        currentData.videosVertical.push(newItem);
        saveData(currentData);
        renderVideosV();
        showToast('Reel/Short agregado');
    } else if (currentModalType === 'foto') {
        const newItem = {
            id: generateId(),
            src: document.getElementById('modal-src').value,
            title: document.getElementById('modal-title').value,
            category: document.getElementById('modal-category').value,
            size: document.getElementById('modal-size').value
        };
        currentData.photos.push(newItem);
        saveData(currentData);
        renderPhotoGrid();
        showToast('Foto agregada');
    } else if (currentModalType === 'foto-edit') {
        const photo = currentData.photos.find(p => p.id === currentEditId);
        if (photo) {
            photo.src = document.getElementById('edit-foto-src').value;
            photo.title = document.getElementById('edit-foto-title').value;
            photo.category = document.getElementById('edit-foto-category').value;
            photo.size = document.getElementById('edit-foto-size').value;
            saveData(currentData);
            renderPhotoGrid();
            showToast('Foto actualizada');
        }
    } else if (currentModalType === 'branding') {
        const newItem = {
            id: generateId(),
            src: document.getElementById('modal-src').value,
            title: document.getElementById('modal-title').value,
            description: document.getElementById('modal-desc').value,
            tags: document.getElementById('modal-tags').value.split(',').map(t => t.trim()).filter(t => t)
        };
        currentData.branding.push(newItem);
        saveData(currentData);
        renderBranding();
        showToast('Proyecto de branding agregado');
    } else if (currentModalType === 'branding-edit') {
        const item = currentData.branding.find(b => b.id === currentEditId);
        if (item) {
            item.src = document.getElementById('edit-branding-src').value;
            item.title = document.getElementById('edit-branding-title').value;
            item.description = document.getElementById('edit-branding-desc').value;
            item.tags = document.getElementById('edit-branding-tags').value.split(',').map(t => t.trim()).filter(t => t);
            saveData(currentData);
            renderBranding();
            showToast('Branding actualizado');
        }
    } else if (currentModalType === 'redes-carousel') {
        const newItem = {
            id: generateId(),
            type: 'carousel',
            slides: [{ src: document.getElementById('modal-src').value, label: 'Slide 1' }],
            likes: document.getElementById('modal-likes').value,
            caption: document.getElementById('modal-caption').value,
            hashtags: document.getElementById('modal-hashtags').value,
            time: document.getElementById('modal-time').value,
            location: document.getElementById('modal-location').value
        };
        currentData.redes.push(newItem);
        saveData(currentData);
        renderRedes();
        showToast('Post con carrusel agregado');
    } else if (currentModalType === 'redes-reel') {
        const newItem = {
            id: generateId(),
            type: 'reel',
            src: document.getElementById('modal-src').value,
            label: document.getElementById('modal-label').value,
            likes: document.getElementById('modal-likes').value,
            caption: document.getElementById('modal-caption').value,
            hashtags: document.getElementById('modal-hashtags').value,
            time: document.getElementById('modal-time').value,
            location: document.getElementById('modal-location').value
        };
        currentData.redes.push(newItem);
        saveData(currentData);
        renderRedes();
        showToast('Reel agregado');
    } else if (currentModalType === 'webdev') {
        const newItem = {
            id: generateId(),
            src: document.getElementById('modal-src').value,
            title: document.getElementById('modal-title').value,
            description: document.getElementById('modal-desc').value,
            stack: document.getElementById('modal-stack').value.split(',').map(t => t.trim()).filter(t => t),
            linkLive: document.getElementById('modal-live').value,
            linkRepo: document.getElementById('modal-repo').value
        };
        currentData.webdev.push(newItem);
        saveData(currentData);
        renderWebdev();
        showToast('Proyecto web agregado');
    } else if (currentModalType === 'webdev-edit') {
        const item = currentData.webdev.find(w => w.id === currentEditId);
        if (item) {
            item.src = document.getElementById('edit-webdev-src').value;
            item.title = document.getElementById('edit-webdev-title').value;
            item.description = document.getElementById('edit-webdev-desc').value;
            item.stack = document.getElementById('edit-webdev-stack').value.split(',').map(t => t.trim()).filter(t => t);
            item.linkLive = document.getElementById('edit-webdev-live').value;
            item.linkRepo = document.getElementById('edit-webdev-repo').value;
            saveData(currentData);
            renderWebdev();
            showToast('Proyecto web actualizado');
        }
    }

    closeModal();
}

// Cerrar modal al hacer click fuera
document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});
