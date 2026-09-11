// ========================================
// ADMIN.JS — Panel de Control Visual e Intuitivo
// ========================================

const ADMIN_PASSWORD = "mojca2024";
let currentData = null;
let failedAttempts = 0;

function getData() {
    try {
        const saved = localStorage.getItem('mojcaData');
        if (saved) return deepMerge(JSON.parse(JSON.stringify(DEFAULT_DATA)), JSON.parse(saved));
    } catch (e) {
        console.error(e);
    }
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

function saveData(data) {
    localStorage.setItem('mojcaData', JSON.stringify(data));
}

function showAdmin() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminLayout').classList.add('active');
    currentData = getData();
    injectAdminStyles();
    renderAllPanels();
}

function injectAdminStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .compact-row {
            display: flex;
            gap: 16px;
            background: var(--bg-elevated);
            border: 1px solid var(--border);
            border-radius: var(--radius-sm);
            padding: 16px;
            margin-bottom: 14px;
            align-items: center;
        }
        .compact-preview {
            width: 160px;
            height: 95px;
            background: #000;
            border-radius: 6px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            border: 1px solid var(--border);
        }
        .compact-preview.vertical { width: 85px; height: 130px; }
        .compact-preview img, .compact-preview video, .compact-preview iframe { width: 100%; height: 100%; object-fit: cover; border: none; }
        .compact-preview span { font-size: 10px; color: var(--text-muted); }
        .compact-fields { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .compact-fields .full { grid-column: span 2; }
        .color-picker-group { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .color-picker-group input[type="color"] {
            width: 44px; height: 44px; border: none; border-radius: 8px; cursor: pointer; background: transparent;
        }
    `;
    document.head.appendChild(style);
}

function renderAllPanels() {
    renderStyleEditor();
    renderVideosH();
    renderVideosV();
    renderPhotos();
}

function renderStyleEditor() {
    const container = document.getElementById('styleEditor');
    if (!container) return;
    container.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'admin-card';
    card.innerHTML = '<h3>Paleta de Colores (Selector Visual)</h3>';

    const colors = [
        ['accentColor', 'Color Principal (Acento)'],
        ['accentLight', 'Color de Brillo'],
        ['bgDark', 'Fondo Oscuro Principal'],
        ['bgCard', 'Fondo de Tarjetas']
    ];

    colors.forEach(([key, label]) => {
        const group = document.createElement('div');
        group.className = 'color-picker-group';
        group.innerHTML = `
            <input type="color" value="${currentData.style[key]}">
            <div>
                <strong style="font-size:13px;display:block;">${label}</strong>
                <span style="font-size:11px;color:var(--text-muted);">${currentData.style[key]}</span>
            </div>
        `;
        const picker = group.querySelector('input');
        picker.addEventListener('input', (e) => {
            currentData.style[key] = e.target.value;
            group.querySelector('span').textContent = e.target.value;
        });
        card.appendChild(group);
    });

    const fontCard = document.createElement('div');
    fontCard.className = 'admin-card';
    fontCard.innerHTML = '<h3>Tipografías del Sitio</h3>';

    const fontOptions = [
        ["'Space Grotesk', sans-serif", "Space Grotesk (Moderna / Display)"],
        ["'Inter', sans-serif", "Inter (Limpia / Minimalista)"],
        ["'Syne', sans-serif", "Syne (Vanguardista / Diseño)"],
        ["'Outfit', sans-serif", "Outfit (Elegante y Geométrica)"],
        ["'Playfair Display', serif", "Playfair (Editorial con Serif)"]
    ];

    const createFontSelect = (label, currentVal, onChange) => {
        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `<label>${label}</label><select></select>`;
        const sel = div.querySelector('select');
        fontOptions.forEach(([val, text]) => {
            const opt = document.createElement('option');
            opt.value = val;
            opt.textContent = text;
            if (val === currentVal) opt.selected = true;
            sel.appendChild(opt);
        });
        sel.addEventListener('change', (e) => onChange(e.target.value));
        return div;
    };

    fontCard.appendChild(createFontSelect('Tipografía para Títulos y Marca', currentData.style.heroFontFamily, (v) => {
        currentData.style.heroFontFamily = v;
    }));
    fontCard.appendChild(createFontSelect('Tipografía de Texto de Lectura', currentData.style.bodyFontFamily, (v) => {
        currentData.style.bodyFontFamily = v;
    }));

    container.appendChild(card);
    container.appendChild(fontCard);
}

function renderVideosH() {
    const container = document.getElementById('videosHEditor');
    if (!container) return;
    container.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.innerHTML = '<h3>Videos Horizontales (Soporta Google Drive, YouTube, Vimeo o MP4)</h3>';
    const list = document.createElement('div');
    card.appendChild(list);

    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.innerHTML = '+ Agregar video';
    addBtn.addEventListener('click', () => {
        currentData.videosHorizontal.push({ id: 'vh' + Date.now(), src: '', title: 'Nuevo video', description: '', views: '1K', tag: 'Comercial' });
        renderVideosH();
    });
    card.appendChild(addBtn);
    container.appendChild(card);

    currentData.videosHorizontal.forEach((v, idx) => {
        const row = document.createElement('div');
        row.className = 'compact-row';

        const preview = document.createElement('div');
        preview.className = 'compact-preview';
        const refreshPrev = () => { preview.innerHTML = createMediaElement(v.src, v.title, 'video'); };
        refreshPrev();

        const fields = document.createElement('div');
        fields.className = 'compact-fields';
        fields.innerHTML = `
            <div class="form-group"><label>Título</label><input type="text" value="${v.title}"></div>
            <div class="form-group"><label>Categoría / Tag</label><input type="text" value="${v.tag}"></div>
            <div class="form-group full"><label>Enlace del Video (Drive, YouTube o directo)</label><input type="text" value="${v.src}"></div>
        `;

        const inputs = fields.querySelectorAll('input');
        inputs[0].addEventListener('input', (e) => { currentData.videosHorizontal[idx].title = e.target.value; });
        inputs[1].addEventListener('input', (e) => { currentData.videosHorizontal[idx].tag = e.target.value; });
        inputs[2].addEventListener('input', (e) => {
            currentData.videosHorizontal[idx].src = e.target.value;
            refreshPrev();
        });

        const delBtn = document.createElement('button');
        delBtn.innerHTML = '🗑';
        delBtn.style.cssText = 'background:none;border:none;color:#ef4444;cursor:pointer;font-size:18px;';
        delBtn.addEventListener('click', () => {
            currentData.videosHorizontal.splice(idx, 1);
            renderVideosH();
        });

        row.appendChild(preview);
        row.appendChild(fields);
        row.appendChild(delBtn);
        list.appendChild(row);
    });
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
    addBtn.innerHTML = '+ Agregar Reel';
    addBtn.addEventListener('click', () => {
        currentData.videosVertical.push({ id: 'vv' + Date.now(), src: '', title: 'Nuevo reel', description: '', views: '1K' });
        renderVideosV();
    });
    card.appendChild(addBtn);
    container.appendChild(card);

    currentData.videosVertical.forEach((v, idx) => {
        const row = document.createElement('div');
        row.className = 'compact-row';

        const preview = document.createElement('div');
        preview.className = 'compact-preview vertical';
        const refreshPrev = () => { preview.innerHTML = createMediaElement(v.src, v.title, 'video'); };
        refreshPrev();

        const fields = document.createElement('div');
        fields.className = 'compact-fields';
        fields.innerHTML = `
            <div class="form-group full"><label>Título</label><input type="text" value="${v.title}"></div>
            <div class="form-group full"><label>URL del Video</label><input type="text" value="${v.src}"></div>
        `;

        const inputs = fields.querySelectorAll('input');
        inputs[0].addEventListener('input', (e) => { currentData.videosVertical[idx].title = e.target.value; });
        inputs[1].addEventListener('input', (e) => {
            currentData.videosVertical[idx].src = e.target.value;
            refreshPrev();
        });

        const delBtn = document.createElement('button');
        delBtn.innerHTML = '🗑';
        delBtn.style.cssText = 'background:none;border:none;color:#ef4444;cursor:pointer;font-size:18px;';
        delBtn.addEventListener('click', () => {
            currentData.videosVertical.splice(idx, 1);
            renderVideosV();
        });

        row.appendChild(preview);
        row.appendChild(fields);
        row.appendChild(delBtn);
        list.appendChild(row);
    });
}

function renderPhotos() {
    const container = document.getElementById('photosEditor');
    if (!container) return;
    container.innerHTML = '';
    const card = document.createElement('div');
    card.className = 'admin-card';
    card.innerHTML = '<h3>Galería de Fotografía (con descripción opcional en modal)</h3>';
    const list = document.createElement('div');
    card.appendChild(list);

    const addBtn = document.createElement('button');
    addBtn.className = 'add-btn';
    addBtn.innerHTML = '+ Agregar foto';
    addBtn.addEventListener('click', () => {
        currentData.photos.push({ id: 'p' + Date.now(), src: '', title: 'Nueva foto', category: 'producto', size: '1x1', description: '' });
        renderPhotos();
    });
    card.appendChild(addBtn);
    container.appendChild(card);

    currentData.photos.forEach((p, idx) => {
        const row = document.createElement('div');
        row.className = 'compact-row';

        const preview = document.createElement('div');
        preview.className = 'compact-preview';
        preview.innerHTML = p.src ? `<img src="${p.src}">` : `<span>Sin imagen</span>`;

        const fields = document.createElement('div');
        fields.className = 'compact-fields';
        fields.innerHTML = `
            <div class="form-group"><label>Título</label><input type="text" value="${p.title}"></div>
            <div class="form-group"><label>Categoría</label><input type="text" value="${p.category}"></div>
            <div class="form-group full"><label>URL de Imagen</label><input type="text" value="${p.src}"></div>
            <div class="form-group full"><label>Información adicional (aparece en tarjeta glass al cliquearla)</label><input type="text" value="${p.description || ''}" placeholder="Dejar vacío si no querés tarjeta lateral"></div>
        `;

        const inputs = fields.querySelectorAll('input');
        inputs[0].addEventListener('input', (e) => { currentData.photos[idx].title = e.target.value; });
        inputs[1].addEventListener('input', (e) => { currentData.photos[idx].category = e.target.value; });
        inputs[2].addEventListener('input', (e) => {
            currentData.photos[idx].src = e.target.value;
            preview.innerHTML = `<img src="${e.target.value}">`;
        });
        inputs[3].addEventListener('input', (e) => { currentData.photos[idx].description = e.target.value; });

        const delBtn = document.createElement('button');
        delBtn.innerHTML = '🗑';
        delBtn.style.cssText = 'background:none;border:none;color:#ef4444;cursor:pointer;font-size:18px;';
        delBtn.addEventListener('click', () => {
            currentData.photos.splice(idx, 1);
            renderPhotos();
        });

        row.appendChild(preview);
        row.appendChild(fields);
        row.appendChild(delBtn);
        list.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('loginError');
    const saveAllBtn = document.getElementById('saveAllBtn');
    const navLinks = document.querySelectorAll('.admin-nav a');
    const panelTitle = document.getElementById('panelTitle');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            if (failedAttempts >= 5) {
                loginError.textContent = 'Demasiados intentos fallidos. Esperá 30 segundos.';
                loginError.style.display = 'block';
                return;
            }
            if (passwordInput.value === ADMIN_PASSWORD) {
                showAdmin();
            } else {
                failedAttempts++;
                loginError.textContent = `Contraseña incorrecta. Intento ${failedAttempts} de 5.`;
                loginError.style.display = 'block';
            }
        });
        passwordInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') loginBtn.click(); });
    }

    if (saveAllBtn) {
        saveAllBtn.addEventListener('click', () => {
            saveData(currentData);
            alert('¡Cambios guardados con éxito!');
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
