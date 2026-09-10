// ========================================
// ADMIN.JS — Panel de Administración (Diseño Compacto y Preview)
// ========================================

const ADMIN_PASSWORD = "mojca2024";
let currentData = null;

function getData() {
    try {
        const saved = localStorage.getItem('mojcaData');
        if (saved) {
            const parsed = JSON.parse(saved);
            return deepMerge(JSON.parse(JSON.stringify(DEFAULT_DATA)), parsed);
        }
    } catch (e) {
        console.error('Error cargando datos de localStorage:', e);
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

function showAdmin() {
    try {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminLayout').classList.add('active');
        currentData = getData();
        injectAdminCompactStyles();
        initAllPanels();
    } catch (e) {
        console.error('Error al cargar el panel:', e);
        alert('Hubo un error al cargar los datos. Se restaurarán los valores por defecto.');
        resetData();
        currentData = getData();
        initAllPanels();
    }
}

// Inyección de estilos para que el admin sea compacto, horizontal y con preview
function injectAdminCompactStyles() {
    if (document.getElementById('admin-compact-styles')) return;
    const style = document.createElement('style');
    style.id = 'admin-compact-styles';
    style.textContent = `
        .item-card-row {
            display: flex;
            gap: 20px;
            background: var(--bg-elevated);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            padding: 16px;
            margin-bottom: 14px;
            align-items: flex-start;
        }
        .item-card-preview {
            width: 200px;
            height: 120px;
            background: #000;
            border-radius: var(--radius-sm);
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            border: 1px solid var(--border);
        }
        .item-card-preview.vertical {
            width: 100px;
            height: 160px;
        }
        .item-card-preview video, .item-card-preview iframe, .item-card-preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border: none;
        }
        .item-card-preview span {
            font-size: 11px;
            color: var(--text-muted);
            text-align: center;
            padding: 6px;
        }
        .item-card-fields {
            flex: 1;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
        }
        .item-card-fields .full-width {
            grid-column: span 2;
        }
        .item-card-fields .form-group {
            margin-bottom: 0;
        }
        .item-card-fields .form-group label {
            margin-bottom: 4px;
            font-size: 10px;
        }
        .item-card-fields input, .item-card-fields textarea, .item-card-fields select {
            padding: 8px 12px;
            font-size: 13px;
        }
        .item-card-delete-col {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .item-card-delete-col button {
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            font-size: 16px;
            padding: 6px;
            transition: var(--transition);
        }
        .item-card-delete-col button:hover {
            color: #ef4444;
        }
        @media (max-width: 900px) {
            .item-card-row { flex-direction: column; }
            .item-card-preview { width: 100%; height: 160px; }
            .item-card-fields { grid-template-columns: 1fr; }
            .item-card-fields .full-width { grid-column: span 1; }
        }
    `;
    document.head.appendChild(style);
}

function initAllPanels() {
    try {
        renderSeccionesEditor();
        renderTextEditor();
        renderStyleEditor();
        renderHeroEditor();
        renderQuienesSomosEditor();
        renderTestimoniosEditor();
        renderVideosH();
        renderVideosV();
        renderPhotos();
        renderBranding();
        renderRedes();
        renderWebdev();
        renderWhatsappEditor();
    } catch (e) {
        console.error('Error inicializando paneles:', e);
    }
}

function createInput(label, value, onChange, type = 'text') {
    const div = document.createElement('div');
    div.className = 'form-group';
    div.innerHTML = `<label>${label}</label>`;
    let input;
    if (type === 'textarea') {
        input = document.createElement('textarea');
        input.rows = 2;
    } else {
        input = document.createElement('input');
        input.type = type;
    }
    input.value = value || '';
    input.addEventListener('input', onChange);
    div.appendChild(input);
    return div;
}

function createCheckbox(label, checked, onChange) {
    const div = document.createElement('div');
    div.className = 'checkbox-group';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = !!checked;
    input.addEventListener('change', onChange);
    const lbl = document.createElement('label');
    lbl.textContent = label;
    lbl.style.cursor = 'pointer';
    lbl.addEventListener('click', () => { input.checked = !input.checked; onChange({ target: input }); });
    div.appendChild(input);
    div.appendChild(lbl);
    return div;
}

function createTagsInput(label, tags, onChange) {
    const div = document.createElement('div');
    div.className = 'form-group';
    const lbl = document.createElement('label');
    lbl.textContent = label;
    div.appendChild(lbl);
    const container = document.createElement('div');
    container.className = 'tags-input';
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.value = JSON.stringify(tags || []);
    function renderTags() {
        const currentTags = JSON.parse(hiddenInput.value || '[]');
        container.innerHTML = '';
        currentTags.forEach((tag, i) => {
            const chip = document.createElement('span');
            chip.className = 'tag-chip';
            chip.innerHTML = `${tag} <button type="button">&times;</button>`;
            chip.querySelector('button').addEventListener('click', () => {
                const t = JSON.parse(hiddenInput.value || '[]');
                t.splice(i, 1);
                hiddenInput.value = JSON.stringify(t);
                renderTags();
                onChange(t);
            });
            container.appendChild(chip);
        });
        const txt = document.createElement('input');
        txt.type = 'text';
        txt.placeholder = 'Tag y Enter...';
        txt.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && txt.value.trim()) {
                e.preventDefault();
                const t = JSON.parse(hiddenInput.value || '[]');
                if (!t.includes(txt.value.trim())) { t.push(txt.value.trim()); }
                hiddenInput.value = JSON.stringify(t);
                renderTags();
                onChange(t);
                txt.value = '';
            }
        });
        container.appendChild(txt);
    }
    renderTags();
    div.appendChild(container);
    div.appendChild(hiddenInput);
    return div;
}

function renderSeccionesEditor() {
    const container = document.getElementById('seccionesEditor');
    if (!container) return;
    container.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.innerHTML = '<h3>Activar / Desactivar Secciones en la Web</h3>';
    
    if (!currentData.sections) {
        currentData.sections = { ...DEFAULT_DATA.sections };
    }

    const secList = [
        ['hero', 'Sección de Inicio / Hero'],
        ['marquee', 'Cinta animada (Marquee)'],
        ['sobre', 'Sobre Nosotros'],
        ['quienesSomos', 'El Equipo (Quiénes Somos)'],
        ['testimonios', 'Testimonios'],
        ['videos', 'Videos Horizontales'],
        ['reels', 'Reels y Shorts'],
        ['fotos', 'Fotografía'],
        ['branding', 'Branding'],
        ['redes', 'Redes Sociales (Instagram)'],
        ['webdev', 'Web y Código'],
        ['proceso', 'Cómo Trabajamos (De la idea a la pantalla)'],
        ['contacto', 'Contacto']
    ];

    secList.forEach(([key, label]) => {
        card.appendChild(createCheckbox(`Mostrar ${label}`, currentData.sections[key] !== false, (e) => {
            currentData.sections[key] = e.target.checked;
            if (key === 'quienesSomos' && currentData.quienesSomos) {
                currentData.quienesSomos.enabled = e.target.checked;
            }
            if (key === 'testimonios' && currentData.testimonios) {
                currentData.testimonios.enabled = e.target.checked;
            }
        }));
    });

    container.appendChild(card);
}

function renderTextEditor() {
    const container = document.getElementById('textosEditor');
    if (!container) return;
    container.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.innerHTML = '<h3>Textos del sitio</h3>';
    const fields = [
        ['logoText', 'Logo / Marca'],
        ['heroLabel', 'Etiqueta del Hero'],
        ['heroTitle', 'Título del Hero'],
        ['heroSub', 'Subtítulo del Hero'],
        ['sobreTag', 'Tag Sobre Nosotros'],
        ['sobreTitle', 'Título Sobre Nosotros'],
        ['sobreSubtitle', 'Subtítulo Sobre Nosotros'],
        ['sobreLead', 'Lead Sobre Nosotros'],
        ['sobreText', 'Texto Sobre Nosotros'],
        ['quienesTag', 'Tag Quiénes Somos'],
        ['quienesTitle', 'Título Quiénes Somos'],
        ['quienesSubtitle', 'Subtítulo Quiénes Somos'],
        ['stat1', 'Estadística 1 (valor)'],
        ['stat1Label', 'Estadística 1 (etiqueta)'],
        ['stat2', 'Estadística 2 (valor)'],
        ['stat2Label', 'Estadística 2 (etiqueta)'],
        ['stat3', 'Estadística 3 (valor)'],
        ['stat3Label', 'Estadística 3 (etiqueta)'],
        ['stat4', 'Estadística 4 (valor)'],
        ['stat4Label', 'Estadística 4 (etiqueta)'],
        ['contactEmail', 'Email de contacto'],
        ['contactLocation', 'Ubicación'],
        ['footerText', 'Texto del footer']
    ];
    fields.forEach(([key, label]) => {
        const isLong = key.includes('Title') || key.includes('Lead') || key.includes('Text');
        card.appendChild(createInput(label, currentData.texts[key], (e) => {
            currentData.texts[key] = e.target.value;
        }, isLong ? 'textarea' : 'text'));
    });
    container.appendChild(card);
}

function renderStyleEditor() {
    const container = document.getElementById('styleEditor');
    if (!container) return;
    container.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.innerHTML = '<h3>Colores y Tipografía</h3>';
    const fields = [
        ['accentColor', 'Color principal (accent)'],
        ['accentLight', 'Color principal claro'],
        ['bgDark', 'Fondo oscuro'],
        ['bgPanel', 'Fondo panel'],
        ['bgCard', 'Fondo tarjeta'],
        ['textPrimary', 'Texto principal'],
        ['textSecondary', 'Texto secundario'],
        ['textMuted', 'Texto atenuado'],
        ['borderColor', 'Color de borde']
    ];
    fields.forEach(([key, label]) => {
        card.appendChild(createInput(label, currentData.style[key], (e) => {
            currentData.style[key] = e.target.value;
        }));
    });
    container.appendChild(card);

    const gradCard = document.createElement('div');
    gradCard.className = 'admin-card';
    gradCard.innerHTML = '<h3>Degradés de Fondo Dinámicos</h3><p style="color:var(--text-muted);font-size:13px;margin-bottom:16px;">Podés definir el CSS del degradé para cada cambio de sección:</p>';
    if (!currentData.gradients) {
        currentData.gradients = { ...DEFAULT_DATA.gradients };
    }
    const gradFields = [
        ['warm', 'Degradé Warm (Hero / Proceso)'],
        ['cream', 'Degradé Cream (Sobre Nosotros / Fotos / Contacto)'],
        ['terracotta', 'Degradé Terracotta (Testimonios / Branding)'],
        ['olive', 'Degradé Olive (Videos / Redes)'],
        ['wine', 'Degradé Wine (Reels / Webdev)']
    ];
    gradFields.forEach(([key, label]) => {
        gradCard.appendChild(createInput(label, currentData.gradients[key], (e) => {
            currentData.gradients[key] = e.target.value;
        }));
    });
    container.appendChild(gradCard);
}

function renderHeroEditor() {
    const container = document.getElementById('heroEditor');
    if (!container) return;
    container.innerHTML = '';
    const h = currentData.hero;
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.innerHTML = '<h3>Configuración del Hero</h3>';
    card.appendChild(createInput('URL del video (YouTube, Vimeo o archivo)', h.videoSrc, (e) => { currentData.hero.videoSrc = e.target.value; }));
    card.appendChild(createCheckbox('Glassmorphism activado', h.glassEnabled, (e) => { currentData.hero.glassEnabled = e.target.checked; }));
    card.appendChild(createInput('Blur del glass (px)', h.glassBlur, (e) => { currentData.hero.glassBlur = e.target.value; }));
    card.appendChild(createInput('Opacidad del glass', h.glassOpacity, (e) => { currentData.hero.glassOpacity = e.target.value; }));
    card.appendChild(createCheckbox('Overlay activado', h.overlayEnabled, (e) => { currentData.hero.overlayEnabled = e.target.checked; }));
    card.appendChild(createInput('Color del overlay', h.overlayColor, (e) => { currentData.hero.overlayColor = e.target.value; }));
    card.appendChild(createInput('Sombra del texto', h.textShadow, (e) => { currentData.hero.textShadow = e.target.value; }));
    container.appendChild(card);
}

function renderQuienesSomosEditor() {
    const container = document.getElementById('quienesSomosEditor');
    if (!container) return;
    container.innerHTML = '';
    const membersCard = document.createElement('div');
    membersCard.className = 'admin-card';
    membersCard.innerHTML = '<h3>Miembros del equipo</h3>';
    const membersList = document.createElement('div');
    membersList.id = 'quienes-somos-members-list';
    membersCard.appendChild(membersList);

    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.innerHTML = '+ Agregar miembro';
    addBtn.addEventListener('click', () => {
        const newMember = { id: 'm' + Date.now(), name: 'Nuevo Miembro', role: 'Rol', photo: '', tags: [], description: '' };
        currentData.quienesSomos.members.push(newMember);
        renderMembersList();
    });
    membersCard.appendChild(addBtn);
    container.appendChild(membersCard);

    function renderMembersList() {
        membersList.innerHTML = '';
        currentData.quienesSomos.members.forEach((m, idx) => {
            const item = document.createElement('div');
            item.className = 'item-card';
            item.innerHTML = `
                <div class="item-card-header">
                    <h4>Miembro #${idx + 1}</h4>
                    <div class="item-card-actions">
                        <button class="delete" title="Eliminar">🗑</button>
                    </div>
                </div>
            `;
            item.querySelector('.delete').addEventListener('click', () => {
                currentData.quienesSomos.members.splice(idx, 1);
                renderMembersList();
            });
            item.appendChild(createInput('Nombre', m.name, (e) => { currentData.quienesSomos.members[idx].name = e.target.value; }));
            item.appendChild(createInput('Rol / Cargo', m.role, (e) => { currentData.quienesSomos.members[idx].role = e.target.value; }));
            item.appendChild(createInput('Foto (URL)', m.photo, (e) => { currentData.quienesSomos.members[idx].photo = e.target.value; }));
            item.appendChild(createTagsInput('Tags / Características', m.tags, (tags) => { currentData.quienesSomos.members[idx].tags = tags; }));
            item.appendChild(createInput('Descripción', m.description, (e) => { currentData.quienesSomos.members[idx].description = e.target.value; }, 'textarea'));
            membersList.appendChild(item);
        });
    }
    renderMembersList();
}

function renderTestimoniosEditor() {
    const container = document.getElementById('testimoniosEditor');
    if (!container) return;
    container.innerHTML = '';
    const t = currentData.testimonios;
    const bgCard = document.createElement('div');
    bgCard.className = 'admin-card';
    bgCard.innerHTML = '<h3>Fondo de la sección</h3>';
    const bgSelect = document.createElement('div');
    bgSelect.className = 'form-group';
    bgSelect.innerHTML = '<label>Tipo de fondo</label>';
    const select = document.createElement('select');
    select.innerHTML = '<option value="gradient">Gradiente</option><option value="solid">Color sólido</option><option value="image">Imagen</option>';
    select.value = t.bgType;
    select.addEventListener('change', (e) => { currentData.testimonios.bgType = e.target.value; renderTestimoniosEditor(); });
    bgSelect.appendChild(select);
    bgCard.appendChild(bgSelect);
    if (t.bgType === 'gradient') bgCard.appendChild(createInput('Gradiente CSS', t.bgGradient, (e) => { currentData.testimonios.bgGradient = e.target.value; }));
    if (t.bgType === 'solid') bgCard.appendChild(createInput('Color', t.bgColor, (e) => { currentData.testimonios.bgColor = e.target.value; }));
    if (t.bgType === 'image') bgCard.appendChild(createInput('URL de imagen', t.bgImage, (e) => { currentData.testimonios.bgImage = e.target.value; }));
    container.appendChild(bgCard);
    const itemsCard = document.createElement('div');
    itemsCard.className = 'admin-card';
    itemsCard.innerHTML = '<h3>Testimonios</h3>';
    const list = document.createElement('div');
    itemsCard.appendChild(list);
    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.innerHTML = '+ Agregar testimonio';
    addBtn.addEventListener('click', () => {
        currentData.testimonios.items.push({ id: 't' + Date.now(), nombre: 'Nombre', empresa: 'Empresa', texto: 'Texto del testimonio...', avatar: '' });
        renderTestimoniosEditor();
    });
    itemsCard.appendChild(addBtn);
    container.appendChild(itemsCard);
    function renderList() {
        list.innerHTML = '';
        currentData.testimonios.items.forEach((item, idx) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'item-card';
            itemEl.innerHTML = `<div class="item-card-header"><h4>Testimonio #${idx + 1}</h4><div class="item-card-actions"><button class="delete">🗑</button></div></div>`;
            itemEl.querySelector('.delete').addEventListener('click', () => { currentData.testimonios.items.splice(idx, 1); renderList(); });
            itemEl.appendChild(createInput('Nombre', item.nombre, (e) => { currentData.testimonios.items[idx].nombre = e.target.value; }));
            itemEl.appendChild(createInput('Empresa', item.empresa, (e) => { currentData.testimonios.items[idx].empresa = e.target.value; }));
            itemEl.appendChild(createInput('Avatar (URL)', item.avatar, (e) => { currentData.testimonios.items[idx].avatar = e.target.value; }));
            itemEl.appendChild(createInput('Texto', item.texto, (e) => { currentData.testimonios.items[idx].texto = e.target.value; }, 'textarea'));
            list.appendChild(itemEl);
        });
    }
    renderList();
}

// Renderizado Horizontal y con Preview para Videos Horizontales
function renderVideosH() {
    const container = document.getElementById('videosHEditor');
    if (!container) return;
    container.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.innerHTML = '<h3>Videos Horizontales</h3>';
    const list = document.createElement('div');
    card.appendChild(list);
    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.innerHTML = '+ Agregar video';
    addBtn.addEventListener('click', () => {
        currentData.videosHorizontal.push({ id: 'vh' + Date.now(), type: 'video', src: '', title: 'Nuevo video', description: '', views: '0', likes: '0', tag: 'General' });
        renderVideosH();
    });
    card.appendChild(addBtn);
    container.appendChild(card);

    function renderList() {
        list.innerHTML = '';
        currentData.videosHorizontal.forEach((v, idx) => {
            const item = document.createElement('div');
            item.className = 'item-card-row';

            // Preview box
            const previewBox = document.createElement('div');
            previewBox.className = 'item-card-preview';
            function updatePreview() {
                if (v.src && v.src.trim() !== '') {
                    previewBox.innerHTML = createMediaElement(v.src, v.title, 'video');
                } else {
                    previewBox.innerHTML = `<span>Sin video cargado</span>`;
                }
            }
            updatePreview();

            // Inputs en grilla horizontal
            const fieldsBox = document.createElement('div');
            fieldsBox.className = 'item-card-fields';

            const titleInput = createInput('Título', v.title, (e) => { currentData.videosHorizontal[idx].title = e.target.value; });
            const tagInput = createInput('Tag', v.tag, (e) => { currentData.videosHorizontal[idx].tag = e.target.value; });
            const srcInput = createInput('URL del video (MP4, YouTube o Vimeo)', v.src, (e) => { 
                currentData.videosHorizontal[idx].src = e.target.value; 
                updatePreview();
            });
            srcInput.className = 'form-group full-width';

            const viewsInput = createInput('Vistas', v.views, (e) => { currentData.videosHorizontal[idx].views = e.target.value; });
            const likesInput = createInput('Likes', v.likes, (e) => { currentData.videosHorizontal[idx].likes = e.target.value; });
            const descInput = createInput('Descripción', v.description, (e) => { currentData.videosHorizontal[idx].description = e.target.value; }, 'textarea');
            descInput.className = 'form-group full-width';

            fieldsBox.appendChild(titleInput);
            fieldsBox.appendChild(tagInput);
            fieldsBox.appendChild(srcInput);
            fieldsBox.appendChild(viewsInput);
            fieldsBox.appendChild(likesInput);
            fieldsBox.appendChild(descInput);

            // Botón eliminar
            const delCol = document.createElement('div');
            delCol.className = 'item-card-delete-col';
            delCol.innerHTML = `<button title="Eliminar video">🗑</button>`;
            delCol.querySelector('button').addEventListener('click', () => {
                currentData.videosHorizontal.splice(idx, 1);
                renderVideosH();
            });

            item.appendChild(previewBox);
            item.appendChild(fieldsBox);
            item.appendChild(delCol);
            list.appendChild(item);
        });
    }
    renderList();
}

// Renderizado Horizontal y con Preview para Reels
function renderVideosV() {
    const container = document.getElementById('videosVEditor');
    if (!container) return;
    container.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.innerHTML = '<h3>Reels y Shorts</h3>';
    const list = document.createElement('div');
    card.appendChild(list);
    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.innerHTML = '+ Agregar reel';
    addBtn.addEventListener('click', () => {
        currentData.videosVertical.push({ id: 'vv' + Date.now(), type: 'video', src: '', title: 'Nuevo reel', description: '', views: '0', likes: '0' });
        renderVideosV();
    });
    card.appendChild(addBtn);
    container.appendChild(card);

    function renderList() {
        list.innerHTML = '';
        currentData.videosVertical.forEach((v, idx) => {
            const item = document.createElement('div');
            item.className = 'item-card-row';

            const previewBox = document.createElement('div');
            previewBox.className = 'item-card-preview vertical';
            function updatePreview() {
                if (v.src && v.src.trim() !== '') {
                    previewBox.innerHTML = createMediaElement(v.src, v.title, 'video');
                } else {
                    previewBox.innerHTML = `<span>Sin video</span>`;
                }
            }
            updatePreview();

            const fieldsBox = document.createElement('div');
            fieldsBox.className = 'item-card-fields';

            const titleInput = createInput('Título', v.title, (e) => { currentData.videosVertical[idx].title = e.target.value; });
            const srcInput = createInput('URL del video', v.src, (e) => { 
                currentData.videosVertical[idx].src = e.target.value; 
                updatePreview();
            });
            const viewsInput = createInput('Vistas', v.views, (e) => { currentData.videosVertical[idx].views = e.target.value; });
            const likesInput = createInput('Likes', v.likes, (e) => { currentData.videosVertical[idx].likes = e.target.value; });
            const descInput = createInput('Descripción', v.description, (e) => { currentData.videosVertical[idx].description = e.target.value; }, 'textarea');
            descInput.className = 'form-group full-width';

            fieldsBox.appendChild(titleInput);
            fieldsBox.appendChild(srcInput);
            fieldsBox.appendChild(viewsInput);
            fieldsBox.appendChild(likesInput);
            fieldsBox.appendChild(descInput);

            const delCol = document.createElement('div');
            delCol.className = 'item-card-delete-col';
            delCol.innerHTML = `<button title="Eliminar reel">🗑</button>`;
            delCol.querySelector('button').addEventListener('click', () => {
                currentData.videosVertical.splice(idx, 1);
                renderVideosV();
            });

            item.appendChild(previewBox);
            item.appendChild(fieldsBox);
            item.appendChild(delCol);
            list.appendChild(item);
        });
    }
    renderList();
}

function renderPhotos() {
    const container = document.getElementById('photosEditor');
    if (!container) return;
    container.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.innerHTML = '<h3>Fotos de la galería</h3>';
    const list = document.createElement('div');
    card.appendChild(list);
    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.innerHTML = '+ Agregar foto';
    addBtn.addEventListener('click', () => {
        currentData.photos.push({ id: 'p' + Date.now(), src: '', title: 'Nueva foto', category: 'producto', size: '1x1' });
        renderPhotos();
    });
    card.appendChild(addBtn);
    container.appendChild(card);
    function renderList() {
        list.innerHTML = '';
        currentData.photos.forEach((p, idx) => {
            const item = document.createElement('div');
            item.className = 'item-card-row';

            const previewBox = document.createElement('div');
            previewBox.className = 'item-card-preview';
            function updatePreview() {
                if (p.src && p.src.trim() !== '') {
                    previewBox.innerHTML = `<img src="${p.src}" alt="${p.title}">`;
                } else {
                    previewBox.innerHTML = `<span>Sin imagen</span>`;
                }
            }
            updatePreview();

            const fieldsBox = document.createElement('div');
            fieldsBox.className = 'item-card-fields';

            const titleInput = createInput('Título', p.title, (e) => { currentData.photos[idx].title = e.target.value; });
            const srcInput = createInput('URL de la imagen', p.src, (e) => { 
                currentData.photos[idx].src = e.target.value; 
                updatePreview();
            });

            const catDiv = document.createElement('div');
            catDiv.className = 'form-group';
            catDiv.innerHTML = '<label>Categoría</label>';
            const catSelect = document.createElement('select');
            catSelect.innerHTML = '<option value="producto">Producto</option><option value="retrato">Retrato</option><option value="evento">Evento</option><option value="lifestyle">Lifestyle</option>';
            catSelect.value = p.category;
            catSelect.addEventListener('change', (e) => { currentData.photos[idx].category = e.target.value; });
            catDiv.appendChild(catSelect);

            const sizeDiv = document.createElement('div');
            sizeDiv.className = 'form-group';
            sizeDiv.innerHTML = '<label>Tamaño en grid</label>';
            const sizeSelect = document.createElement('select');
            sizeSelect.innerHTML = '<option value="1x1">1x1</option><option value="1x2">1x2</option><option value="2x1">2x1</option><option value="2x2">2x2</option><option value="3x1">3x1</option><option value="1x3">1x3</option><option value="4x1">4x1</option>';
            sizeSelect.value = p.size;
            sizeSelect.addEventListener('change', (e) => { currentData.photos[idx].size = e.target.value; });
            sizeDiv.appendChild(sizeSelect);

            fieldsBox.appendChild(titleInput);
            fieldsBox.appendChild(srcInput);
            fieldsBox.appendChild(catDiv);
            fieldsBox.appendChild(sizeDiv);

            const delCol = document.createElement('div');
            delCol.className = 'item-card-delete-col';
            delCol.innerHTML = `<button title="Eliminar foto">🗑</button>`;
            delCol.querySelector('button').addEventListener('click', () => {
                currentData.photos.splice(idx, 1);
                renderPhotos();
            });

            item.appendChild(previewBox);
            item.appendChild(fieldsBox);
            item.appendChild(delCol);
            list.appendChild(item);
        });
    }
    renderList();
}

function renderBranding() {
    const container = document.getElementById('brandingEditor');
    if (!container) return;
    container.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.innerHTML = '<h3>Proyectos de Branding</h3>';
    const list = document.createElement('div');
    card.appendChild(list);
    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.innerHTML = '+ Agregar proyecto';
    addBtn.addEventListener('click', () => {
        currentData.branding.push({ id: 'b' + Date.now(), src: '', title: 'Nuevo proyecto', description: '', tags: [] });
        renderBranding();
    });
    card.appendChild(addBtn);
    container.appendChild(card);
    function renderList() {
        list.innerHTML = '';
        currentData.branding.forEach((b, idx) => {
            const item = document.createElement('div');
            item.className = 'item-card-row';

            const previewBox = document.createElement('div');
            previewBox.className = 'item-card-preview';
            function updatePreview() {
                if (b.src && b.src.trim() !== '') {
                    previewBox.innerHTML = `<img src="${b.src}" alt="${b.title}">`;
                } else {
                    previewBox.innerHTML = `<span>Sin imagen</span>`;
                }
            }
            updatePreview();

            const fieldsBox = document.createElement('div');
            fieldsBox.className = 'item-card-fields';

            const titleInput = createInput('Título', b.title, (e) => { currentData.branding[idx].title = e.target.value; });
            const srcInput = createInput('URL de la imagen', b.src, (e) => { 
                currentData.branding[idx].src = e.target.value; 
                updatePreview();
            });
            const descInput = createInput('Descripción', b.description, (e) => { currentData.branding[idx].description = e.target.value; }, 'textarea');
            descInput.className = 'form-group full-width';
            const tagsInput = createTagsInput('Tags', b.tags, (tags) => { currentData.branding[idx].tags = tags; });
            tagsInput.className = 'form-group full-width';

            fieldsBox.appendChild(titleInput);
            fieldsBox.appendChild(srcInput);
            fieldsBox.appendChild(descInput);
            fieldsBox.appendChild(tagsInput);

            const delCol = document.createElement('div');
            delCol.className = 'item-card-delete-col';
            delCol.innerHTML = `<button title="Eliminar proyecto">🗑</button>`;
            delCol.querySelector('button').addEventListener('click', () => {
                currentData.branding.splice(idx, 1);
                renderBranding();
            });

            item.appendChild(previewBox);
            item.appendChild(fieldsBox);
            item.appendChild(delCol);
            list.appendChild(item);
        });
    }
    renderList();
}

function renderRedes() {
    const container = document.getElementById('redesEditor');
    if (!container) return;
    container.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.innerHTML = '<h3>Publicaciones de Instagram</h3>';
    const list = document.createElement('div');
    card.appendChild(list);
    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.innerHTML = '+ Agregar publicación';
    addBtn.addEventListener('click', () => {
        currentData.redes.push({ id: 'r' + Date.now(), type: 'carousel', slides: [{ src: '', label: 'Slide 1' }], likes: '0', caption: '', hashtags: '', time: 'Hace 1 día', location: '' });
        renderRedes();
    });
    card.appendChild(addBtn);
    container.appendChild(card);
    function renderList() {
        list.innerHTML = '';
        currentData.redes.forEach((r, idx) => {
            const item = document.createElement('div');
            item.className = 'item-card';
            item.innerHTML = `<div class="item-card-header"><h4>Publicación #${idx + 1}</h4><div class="item-card-actions"><button class="delete">🗑</button></div></div>`;
            item.querySelector('.delete').addEventListener('click', () => { currentData.redes.splice(idx, 1); renderList(); });
            const typeDiv = document.createElement('div');
            typeDiv.className = 'form-group';
            typeDiv.innerHTML = '<label>Tipo</label>';
            const typeSelect = document.createElement('select');
            typeSelect.innerHTML = '<option value="carousel">Carrusel</option><option value="reel">Reel</option>';
            typeSelect.value = r.type;
            typeSelect.addEventListener('change', (e) => { currentData.redes[idx].type = e.target.value; renderRedes(); });
            typeDiv.appendChild(typeSelect);
            item.appendChild(typeDiv);
            if (r.type === 'carousel') {
                const slidesDiv = document.createElement('div');
                slidesDiv.className = 'form-group';
                slidesDiv.innerHTML = '<label>Slides</label>';
                r.slides.forEach((s, sidx) => {
                    const slideRow = document.createElement('div');
                    slideRow.style.cssText = 'display:flex;gap:8px;margin-bottom:8px;align-items:center;';
                    const slideInput = document.createElement('input');
                    slideInput.type = 'text';
                    slideInput.placeholder = 'URL imagen';
                    slideInput.value = s.src;
                    slideInput.style.flex = '1';
                    slideInput.addEventListener('input', (e) => { currentData.redes[idx].slides[sidx].src = e.target.value; });
                    const slideLabel = document.createElement('input');
                    slideLabel.type = 'text';
                    slideLabel.placeholder = 'Label';
                    slideLabel.value = s.label;
                    slideLabel.style.width = '120px';
                    slideLabel.addEventListener('input', (e) => { currentData.redes[idx].slides[sidx].label = e.target.value; });
                    const delSlide = document.createElement('button');
                    delSlide.innerHTML = '🗑';
                    delSlide.style.cssText = 'background:none;border:none;color:var(--text-muted);cursor:pointer;';
                    delSlide.addEventListener('click', () => { currentData.redes[idx].slides.splice(sidx, 1); renderRedes(); });
                    slideRow.appendChild(slideInput);
                    slideRow.appendChild(slideLabel);
                    slideRow.appendChild(delSlide);
                    slidesDiv.appendChild(slideRow);
                });
                const addSlideBtn = document.createElement('button');
                addSlideBtn.className = 'add-btn';
                addSlideBtn.innerHTML = '+ Agregar slide';
                addSlideBtn.addEventListener('click', () => { currentData.redes[idx].slides.push({ src: '', label: 'Nuevo slide' }); renderRedes(); });
                slidesDiv.appendChild(addSlideBtn);
                item.appendChild(slidesDiv);
            } else {
                item.appendChild(createInput('URL del video', r.src, (e) => { currentData.redes[idx].src = e.target.value; }));
                item.appendChild(createInput('Label', r.label, (e) => { currentData.redes[idx].label = e.target.value; }));
            }
            item.appendChild(createInput('Likes', r.likes, (e) => { currentData.redes[idx].likes = e.target.value; }));
            item.appendChild(createInput('Caption', r.caption, (e) => { currentData.redes[idx].caption = e.target.value; }, 'textarea'));
            item.appendChild(createInput('Hashtags', r.hashtags, (e) => { currentData.redes[idx].hashtags = e.target.value; }));
            item.appendChild(createInput('Tiempo', r.time, (e) => { currentData.redes[idx].time = e.target.value; }));
            item.appendChild(createInput('Ubicación', r.location, (e) => { currentData.redes[idx].location = e.target.value; }));
            list.appendChild(item);
        });
    }
    renderList();
}

function renderWebdev() {
    const container = document.getElementById('webdevEditor');
    if (!container) return;
    container.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.innerHTML = '<h3>Proyectos Web</h3>';
    const list = document.createElement('div');
    card.appendChild(list);
    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.innerHTML = '+ Agregar proyecto';
    addBtn.addEventListener('click', () => {
        currentData.webdev.push({ id: 'w' + Date.now(), src: '', title: 'Nuevo proyecto', description: '', stack: [], linkLive: '#', linkRepo: '#' });
        renderWebdev();
    });
    card.appendChild(addBtn);
    container.appendChild(card);
    function renderList() {
        list.innerHTML = '';
        currentData.webdev.forEach((w, idx) => {
            const item = document.createElement('div');
            item.className = 'item-card-row';

            const previewBox = document.createElement('div');
            previewBox.className = 'item-card-preview';
            function updatePreview() {
                if (w.src && w.src.trim() !== '') {
                    previewBox.innerHTML = `<img src="${w.src}" alt="${w.title}">`;
                } else {
                    previewBox.innerHTML = `<span>Sin imagen</span>`;
                }
            }
            updatePreview();

            const fieldsBox = document.createElement('div');
            fieldsBox.className = 'item-card-fields';

            const titleInput = createInput('Título', w.title, (e) => { currentData.webdev[idx].title = e.target.value; });
            const srcInput = createInput('URL de la imagen', w.src, (e) => { 
                currentData.webdev[idx].src = e.target.value; 
                updatePreview();
            });
            const descInput = createInput('Descripción', w.description, (e) => { currentData.webdev[idx].description = e.target.value; }, 'textarea');
            descInput.className = 'form-group full-width';
            const stackInput = createTagsInput('Stack tecnológico', w.stack, (tags) => { currentData.webdev[idx].stack = tags; });
            stackInput.className = 'form-group full-width';
            const linkLive = createInput('Link en vivo', w.linkLive, (e) => { currentData.webdev[idx].linkLive = e.target.value; });
            const linkRepo = createInput('Link repositorio', w.linkRepo, (e) => { currentData.webdev[idx].linkRepo = e.target.value; });

            fieldsBox.appendChild(titleInput);
            fieldsBox.appendChild(srcInput);
            fieldsBox.appendChild(descInput);
            fieldsBox.appendChild(stackInput);
            fieldsBox.appendChild(linkLive);
            fieldsBox.appendChild(linkRepo);

            const delCol = document.createElement('div');
            delCol.className = 'item-card-delete-col';
            delCol.innerHTML = `<button title="Eliminar proyecto">🗑</button>`;
            delCol.querySelector('button').addEventListener('click', () => {
                currentData.webdev.splice(idx, 1);
                renderWebdev();
            });

            item.appendChild(previewBox);
            item.appendChild(fieldsBox);
            item.appendChild(delCol);
            list.appendChild(item);
        });
    }
    renderList();
}

function renderWhatsappEditor() {
    const container = document.getElementById('whatsappEditor');
    if (!container) return;
    container.innerHTML = '';
    const w = currentData.whatsapp;
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.innerHTML = '<h3>Configuración de WhatsApp</h3>';
    card.appendChild(createInput('Número (sin + ni espacios)', w.number, (e) => { currentData.whatsapp.number = e.target.value; }));
    card.appendChild(createInput('Mensaje predeterminado', w.message, (e) => { currentData.whatsapp.message = e.target.value; }));
    card.appendChild(createCheckbox('Mostrar botón flotante', w.floatEnabled, (e) => { currentData.whatsapp.floatEnabled = e.target.checked; }));
    card.appendChild(createInput('Texto del botón flotante', w.floatLabel, (e) => { currentData.whatsapp.floatLabel = e.target.value; }));
    container.appendChild(card);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('loginError');
    const logoutBtn = document.getElementById('logoutBtn');
    const saveAllBtn = document.getElementById('saveAllBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const exportBtn = document.getElementById('exportBtn');
    const importBtn = document.getElementById('importBtn');
    const importFile = document.getElementById('importFile');
    const importError = document.getElementById('importError');
    const resetBtn = document.getElementById('resetBtn');
    const navLinks = document.querySelectorAll('.admin-nav a');
    const panelTitle = document.getElementById('panelTitle');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            if (passwordInput.value === ADMIN_PASSWORD) {
                showAdmin();
            } else {
                loginError.style.display = 'block';
            }
        });
        passwordInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') loginBtn.click(); });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            document.getElementById('adminLayout').classList.remove('active');
            document.getElementById('loginScreen').style.display = 'flex';
            passwordInput.value = '';
            loginError.style.display = 'none';
        });
    }

    if (saveAllBtn) {
        saveAllBtn.addEventListener('click', () => {
            saveData(currentData);
            alert('Cambios guardados correctamente. Actualizá la página principal para ver los cambios.');
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (confirm('¿Descartar todos los cambios no guardados?')) {
                currentData = getData();
                initAllPanels();
            }
        });
    }

    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const blob = new Blob([JSON.stringify(currentData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'mojca-backup-' + new Date().toISOString().slice(0, 10) + '.json';
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    if (importBtn && importFile) {
        importBtn.addEventListener('click', () => {
            const file = importFile.files[0];
            if (!file) { alert('Seleccioná un archivo primero.'); return; }
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (confirm('Esto reemplazará toda la configuración actual. ¿Continuar?')) {
                        localStorage.setItem('mojcaData', JSON.stringify(data));
                        currentData = getData();
                        initAllPanels();
                        alert('Configuración restaurada correctamente.');
                        importError.style.display = 'none';
                    }
                } catch (err) {
                    importError.style.display = 'block';
                }
            };
            reader.readAsText(file);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro? Se perderán TODOS los cambios personalizados.')) {
                resetData();
                currentData = getData();
                initAllPanels();
                alert('Configuración restablecida a los valores por defecto.');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const panelId = link.getAttribute('data-panel');
            if (!panelId) return;
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
            const targetPanel = document.getElementById('panel-' + panelId);
            if (targetPanel) {
                targetPanel.classList.add('active');
                panelTitle.textContent = link.textContent.trim();
            }
        });
    });
});
