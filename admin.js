// ========================================
// ADMIN.JS — Panel de Administración
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
        initAllPanels();
    } catch (e) {
        console.error('Error al cargar el panel:', e);
        alert('Hubo un error al cargar los datos. Se restaurarán los valores por defecto.');
        resetData();
        currentData = getData();
        initAllPanels();
    }
}

function initAllPanels() {
    try {
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
        input.rows = 3;
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
        txt.placeholder = 'Escribí y presioná Enter...';
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
    const qs = currentData.quienesSomos;

    // Sección activada/desactivada
    const toggleCard = document.createElement('div');
    toggleCard.className = 'admin-card';
    toggleCard.innerHTML = '<h3>Visibilidad de la sección</h3>';
    toggleCard.appendChild(createCheckbox('Mostrar sección "Quiénes Somos" en el sitio', qs.enabled, (e) => {
        currentData.quienesSomos.enabled = e.target.checked;
    }));
    container.appendChild(toggleCard);

    // Miembros
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
    const toggleCard = document.createElement('div');
    toggleCard.className = 'admin-card';
    toggleCard.innerHTML = '<h3>Visibilidad de la sección</h3>';
    toggleCard.appendChild(createCheckbox('Mostrar sección de testimonios', t.enabled, (e) => { currentData.testimonios.enabled = e.target.checked; }));
    container.appendChild(toggleCard);
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
            item.className = 'item-card';
            item.innerHTML = `<div class="item-card-header"><h4>Video #${idx + 1}</h4><div class="item-card-actions"><button class="delete">🗑</button></div></div>`;
            item.querySelector('.delete').addEventListener('click', () => { currentData.videosHorizontal.splice(idx, 1); renderList(); });
            item.appendChild(createInput('Título', v.title, (e) => { currentData.videosHorizontal[idx].title = e.target.value; }));
            item.appendChild(createInput('URL del video', v.src, (e) => { currentData.videosHorizontal[idx].src = e.target.value; }));
            item.appendChild(createInput('Descripción', v.description, (e) => { currentData.videosHorizontal[idx].description = e.target.value; }, 'textarea'));
            item.appendChild(createInput('Vistas', v.views, (e) => { currentData.videosHorizontal[idx].views = e.target.value; }));
            item.appendChild(createInput('Likes', v.likes, (e) => { currentData.videosHorizontal[idx].likes = e.target.value; }));
            item.appendChild(createInput('Tag', v.tag, (e) => { currentData.videosHorizontal[idx].tag = e.target.value; }));
            list.appendChild(item);
        });
    }
    renderList();
}

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
            item.className = 'item-card';
            item.innerHTML = `<div class="item-card-header"><h4>Reel #${idx + 1}</h4><div class="item-card-actions"><button class="delete">🗑</button></div></div>`;
            item.querySelector('.delete').addEventListener('click', () => { currentData.videosVertical.splice(idx, 1); renderList(); });
            item.appendChild(createInput('Título', v.title, (e) => { currentData.videosVertical[idx].title = e.target.value; }));
            item.appendChild(createInput('URL del video', v.src, (e) => { currentData.videosVertical[idx].src = e.target.value; }));
            item.appendChild(createInput('Descripción', v.description, (e) => { currentData.videosVertical[idx].description = e.target.value; }, 'textarea'));
            item.appendChild(createInput('Vistas', v.views, (e) => { currentData.videosVertical[idx].views = e.target.value; }));
            item.appendChild(createInput('Likes', v.likes, (e) => { currentData.videosVertical[idx].likes = e.target.value; }));
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
            item.className = 'item-card';
            item.innerHTML = `<div class="item-card-header"><h4>Foto #${idx + 1}</h4><div class="item-card-actions"><button class="delete">🗑</button></div></div>`;
            item.querySelector('.delete').addEventListener('click', () => { currentData.photos.splice(idx, 1); renderList(); });
            item.appendChild(createInput('Título', p.title, (e) => { currentData.photos[idx].title = e.target.value; }));
            item.appendChild(createInput('URL de la imagen', p.src, (e) => { currentData.photos[idx].src = e.target.value; }));
            const catDiv = document.createElement('div');
            catDiv.className = 'form-group';
            catDiv.innerHTML = '<label>Categoría</label>';
            const catSelect = document.createElement('select');
            catSelect.innerHTML = '<option value="producto">Producto</option><option value="retrato">Retrato</option><option value="evento">Evento</option><option value="lifestyle">Lifestyle</option>';
            catSelect.value = p.category;
            catSelect.addEventListener('change', (e) => { currentData.photos[idx].category = e.target.value; });
            catDiv.appendChild(catSelect);
            item.appendChild(catDiv);
            const sizeDiv = document.createElement('div');
            sizeDiv.className = 'form-group';
            sizeDiv.innerHTML = '<label>Tamaño en grid</label>';
            const sizeSelect = document.createElement('select');
            sizeSelect.innerHTML = '<option value="1x1">1x1</option><option value="1x2">1x2</option><option value="2x1">2x1</option><option value="2x2">2x2</option><option value="3x1">3x1</option><option value="1x3">1x3</option><option value="4x1">4x1</option>';
            sizeSelect.value = p.size;
            sizeSelect.addEventListener('change', (e) => { currentData.photos[idx].size = e.target.value; });
            sizeDiv.appendChild(sizeSelect);
            item.appendChild(sizeDiv);
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
            item.className = 'item-card';
            item.innerHTML = `<div class="item-card-header"><h4>Proyecto #${idx + 1}</h4><div class="item-card-actions"><button class="delete">🗑</button></div></div>`;
            item.querySelector('.delete').addEventListener('click', () => { currentData.branding.splice(idx, 1); renderList(); });
            item.appendChild(createInput('Título', b.title, (e) => { currentData.branding[idx].title = e.target.value; }));
            item.appendChild(createInput('URL de la imagen', b.src, (e) => { currentData.branding[idx].src = e.target.value; }));
            item.appendChild(createInput('Descripción', b.description, (e) => { currentData.branding[idx].description = e.target.value; }, 'textarea'));
            item.appendChild(createTagsInput('Tags', b.tags, (tags) => { currentData.branding[idx].tags = tags; }));
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
            item.className = 'item-card';
            item.innerHTML = `<div class="item-card-header"><h4>Proyecto #${idx + 1}</h4><div class="item-card-actions"><button class="delete">🗑</button></div></div>`;
            item.querySelector('.delete').addEventListener('click', () => { currentData.webdev.splice(idx, 1); renderList(); });
            item.appendChild(createInput('Título', w.title, (e) => { currentData.webdev[idx].title = e.target.value; }));
            item.appendChild(createInput('URL de la imagen', w.src, (e) => { currentData.webdev[idx].src = e.target.value; }));
            item.appendChild(createInput('Descripción', w.description, (e) => { currentData.webdev[idx].description = e.target.value; }, 'textarea'));
            item.appendChild(createTagsInput('Stack tecnológico', w.stack, (tags) => { currentData.webdev[idx].stack = tags; }));
            item.appendChild(createInput('Link en vivo', w.linkLive, (e) => { currentData.webdev[idx].linkLive = e.target.value; }));
            item.appendChild(createInput('Link repositorio', w.linkRepo, (e) => { currentData.webdev[idx].linkRepo = e.target.value; }));
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
