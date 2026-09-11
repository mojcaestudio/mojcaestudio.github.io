// ========================================
// ADMIN.JS — Panel de Control Compacto y Completo
// ========================================

const ADMIN_PASSWORD = "mojca2024";
let currentData = null;
let failedAttempts = 0;

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
        .compact-row { display: flex; gap: 16px; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 16px; margin-bottom: 14px; align-items: center; }
        .compact-preview { width: 160px; height: 90px; background: #000; border-radius: 6px; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0; position:relative; }
        .compact-preview.vertical { width: 85px; height: 130px; }
        .compact-preview img, .compact-preview video, .compact-preview iframe { position:absolute; inset:0; width: 100%; height: 100%; object-fit: cover; border: none; pointer-events:none; }
        .compact-fields { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .compact-fields .full { grid-column: span 2; }
        .color-picker-group { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .checkbox-group { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; width: 50%; float: left; }
    `;
    document.head.appendChild(style);
}

function renderAllPanels() {
    renderSeccionesEditor();
    renderStyleEditor();
    renderVideosH();
    renderVideosV();
    renderPhotos();
    renderBranding();
    renderRedes();
    renderWebdev();
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

function renderSeccionesEditor() {
    const container = document.getElementById('seccionesEditor');
    container.innerHTML = '<div class="admin-card" id="secCard" style="overflow:hidden;"><h3>Prender / Apagar Secciones</h3></div>';
    const card = document.getElementById('secCard');
    const secList = [['hero', 'Hero'],['marquee', 'Marquee'],['sobre', 'Sobre Nosotros'],['quienesSomos', 'El Equipo'],['testimonios', 'Testimonios'],['videos', 'Videos'],['reels', 'Reels'],['fotos', 'Fotografía'],['branding', 'Branding'],['redes', 'Redes Sociales'],['webdev', 'Web y Código'],['contacto', 'Contacto']];
    secList.forEach(([key, label]) => {
        card.appendChild(createCheckbox(`Mostrar ${label}`, currentData.sections[key] !== false, (e) => { currentData.sections[key] = e.target.checked; }));
    });
}

function renderStyleEditor() {
    const container = document.getElementById('styleEditor');
    container.innerHTML = '<div class="admin-card" id="colCard"><h3>Colores Principales</h3></div><div class="admin-card" id="fontCard"><h3>Tipografías</h3></div>';
    
    const colors = [['accentColor', 'Color Principal'],['accentLight', 'Color Claro'],['bgDark', 'Fondo Oscuro'],['bgCard', 'Fondo Tarjeta']];
    colors.forEach(([key, label]) => {
        const group = document.createElement('div');
        group.className = 'color-picker-group';
        group.innerHTML = `<input type="color" value="${currentData.style[key]}"> <div><strong style="font-size:13px">${label}</strong></div>`;
        group.querySelector('input').addEventListener('input', (e) => currentData.style[key] = e.target.value);
        document.getElementById('colCard').appendChild(group);
    });

    const fonts = [["'Space Grotesk', sans-serif", "Space Grotesk"], ["'Inter', sans-serif", "Inter"], ["'Syne', sans-serif", "Syne"], ["'Outfit', sans-serif", "Outfit"]];
    const createFontSel = (lbl, val, cb) => {
        const d = document.createElement('div'); d.className = 'form-group'; d.innerHTML = `<label>${lbl}</label><select></select>`;
        fonts.forEach(([v, t]) => { const opt = document.createElement('option'); opt.value = v; opt.textContent = t; if(v===val) opt.selected=true; d.querySelector('select').appendChild(opt); });
        d.querySelector('select').addEventListener('change', (e) => cb(e.target.value));
        return d;
    };
    document.getElementById('fontCard').appendChild(createFontSel('Títulos', currentData.style.heroFontFamily, (v) => currentData.style.heroFontFamily = v));
    document.getElementById('fontCard').appendChild(createFontSel('Texto Lectura', currentData.style.bodyFontFamily, (v) => currentData.style.bodyFontFamily = v));
}

function renderVideosH() {
    const container = document.getElementById('videosHEditor');
    container.innerHTML = '<div class="admin-card" id="vhCard"><h3>Videos Horizontales (Drive, YouTube, Vimeo, MP4)</h3></div>';
    const list = document.createElement('div');
    const btn = document.createElement('button'); btn.className = 'add-btn'; btn.textContent = '+ Agregar video';
    btn.onclick = () => { currentData.videosHorizontal.push({ id: 'vh'+Date.now(), src:'', title:'', views:'1K', tag:''}); renderVideosH(); };
    document.getElementById('vhCard').append(list, btn);

    currentData.videosHorizontal.forEach((v, idx) => {
        const row = document.createElement('div'); row.className = 'compact-row';
        row.innerHTML = `<div class="compact-preview" id="prevH${idx}"></div>
            <div class="compact-fields">
                <div class="form-group"><label>Título</label><input type="text" value="${v.title}"></div>
                <div class="form-group"><label>Tag</label><input type="text" value="${v.tag}"></div>
                <div class="form-group full"><label>URL (Drive / YouTube / Video)</label><input type="text" value="${v.src}"></div>
            </div>
            <button style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:18px;">🗑</button>`;
        row.querySelector(`#prevH${idx}`).innerHTML = createMediaElement(v.src, v.title, 'video', true);
        const inputs = row.querySelectorAll('input');
        inputs[0].oninput = e => currentData.videosHorizontal[idx].title = e.target.value;
        inputs[1].oninput = e => currentData.videosHorizontal[idx].tag = e.target.value;
        inputs[2].oninput = e => { currentData.videosHorizontal[idx].src = e.target.value; row.querySelector(`#prevH${idx}`).innerHTML = createMediaElement(e.target.value, '', 'video', true); };
        row.querySelector('button').onclick = () => { currentData.videosHorizontal.splice(idx, 1); renderVideosH(); };
        list.appendChild(row);
    });
}

function renderVideosV() {
    const container = document.getElementById('videosVEditor');
    container.innerHTML = '<div class="admin-card" id="vvCard"><h3>Reels y Shorts</h3></div>';
    const list = document.createElement('div');
    const btn = document.createElement('button'); btn.className = 'add-btn'; btn.textContent = '+ Agregar Reel';
    btn.onclick = () => { currentData.videosVertical.push({ id: 'vv'+Date.now(), src:'', title:''}); renderVideosV(); };
    document.getElementById('vvCard').append(list, btn);

    currentData.videosVertical.forEach((v, idx) => {
        const row = document.createElement('div'); row.className = 'compact-row';
        row.innerHTML = `<div class="compact-preview vertical" id="prevV${idx}"></div>
            <div class="compact-fields">
                <div class="form-group full"><label>Título</label><input type="text" value="${v.title}"></div>
                <div class="form-group full"><label>URL del Video</label><input type="text" value="${v.src}"></div>
            </div>
            <button style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:18px;">🗑</button>`;
        row.querySelector(`#prevV${idx}`).innerHTML = createMediaElement(v.src, v.title, 'video', true);
        const inputs = row.querySelectorAll('input');
        inputs[0].oninput = e => currentData.videosVertical[idx].title = e.target.value;
        inputs[1].oninput = e => { currentData.videosVertical[idx].src = e.target.value; row.querySelector(`#prevV${idx}`).innerHTML = createMediaElement(e.target.value, '', 'video', true); };
        row.querySelector('button').onclick = () => { currentData.videosVertical.splice(idx, 1); renderVideosV(); };
        list.appendChild(row);
    });
}

function renderPhotos() {
    const container = document.getElementById('photosEditor');
    container.innerHTML = '<div class="admin-card" id="pCard"><h3>Galería (Con descripciones en modal)</h3></div>';
    const list = document.createElement('div');
    const btn = document.createElement('button'); btn.className = 'add-btn'; btn.textContent = '+ Agregar foto';
    btn.onclick = () => { currentData.photos.push({ id: 'p'+Date.now(), src:'', title:'', category:'producto', description:''}); renderPhotos(); };
    document.getElementById('pCard').append(list, btn);

    currentData.photos.forEach((p, idx) => {
        const row = document.createElement('div'); row.className = 'compact-row';
        row.innerHTML = `<div class="compact-preview" id="prevP${idx}"></div>
            <div class="compact-fields">
                <div class="form-group"><label>Título</label><input type="text" value="${p.title}"></div>
                <div class="form-group"><label>Categoría</label><input type="text" value="${p.category}"></div>
                <div class="form-group full"><label>URL de Imagen</label><input type="text" value="${p.src}"></div>
            </div>
            <button style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:18px;">🗑</button>`;
        row.querySelector(`#prevP${idx}`).innerHTML = `<img src="${p.src}">`;
        const inputs = row.querySelectorAll('input');
        inputs[0].oninput = e => currentData.photos[idx].title = e.target.value;
        inputs[1].oninput = e => currentData.photos[idx].category = e.target.value;
        inputs[2].oninput = e => { currentData.photos[idx].src = e.target.value; row.querySelector(`#prevP${idx}`).innerHTML = `<img src="${e.target.value}">`; };
        row.querySelector('button').onclick = () => { currentData.photos.splice(idx, 1); renderPhotos(); };
        list.appendChild(row);
    });
}

function renderBranding() {
    const container = document.getElementById('brandingEditor');
    container.innerHTML = '<div class="admin-card" id="bCard"><h3>Proyectos de Branding</h3></div>';
    const list = document.createElement('div');
    const btn = document.createElement('button'); btn.className = 'add-btn'; btn.textContent = '+ Agregar proyecto';
    btn.onclick = () => { currentData.branding.push({ id: 'b'+Date.now(), src:'', title:'', description:'', tags:[] }); renderBranding(); };
    document.getElementById('bCard').append(list, btn);

    currentData.branding.forEach((b, idx) => {
        const row = document.createElement('div'); row.className = 'compact-row';
        row.innerHTML = `<div class="compact-preview" id="prevB${idx}"></div>
            <div class="compact-fields">
                <div class="form-group full"><label>Título</label><input type="text" value="${b.title}"></div>
                <div class="form-group full"><label>URL de Imagen</label><input type="text" value="${b.src}"></div>
            </div>
            <button style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:18px;">🗑</button>`;
        row.querySelector(`#prevB${idx}`).innerHTML = `<img src="${b.src}">`;
        const inputs = row.querySelectorAll('input');
        inputs[0].oninput = e => currentData.branding[idx].title = e.target.value;
        inputs[1].oninput = e => { currentData.branding[idx].src = e.target.value; row.querySelector(`#prevB${idx}`).innerHTML = `<img src="${e.target.value}">`; };
        row.querySelector('button').onclick = () => { currentData.branding.splice(idx, 1); renderBranding(); };
        list.appendChild(row);
    });
}

function renderRedes() {
    const container = document.getElementById('redesEditor');
    container.innerHTML = '<div class="admin-card" id="rCard"><h3>Redes Sociales</h3></div>';
    const list = document.createElement('div');
    const btn = document.createElement('button'); btn.className = 'add-btn'; btn.textContent = '+ Agregar Redes';
    btn.onclick = () => { currentData.redes.push({ id: 'r'+Date.now(), src:'', label:'', caption:'' }); renderRedes(); };
    document.getElementById('rCard').append(list, btn);

    currentData.redes.forEach((r, idx) => {
        const row = document.createElement('div'); row.className = 'compact-row';
        row.innerHTML = `<div class="compact-preview" id="prevR${idx}"></div>
            <div class="compact-fields">
                <div class="form-group full"><label>URL de Imagen/Video</label><input type="text" value="${r.src || ''}"></div>
                <div class="form-group full"><label>Caption</label><input type="text" value="${r.caption || ''}"></div>
            </div>
            <button style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:18px;">🗑</button>`;
        row.querySelector(`#prevR${idx}`).innerHTML = createMediaElement(r.src, r.label, 'image', true);
        const inputs = row.querySelectorAll('input');
        inputs[0].oninput = e => { currentData.redes[idx].src = e.target.value; row.querySelector(`#prevR${idx}`).innerHTML = createMediaElement(e.target.value, '', 'image', true); };
        inputs[1].oninput = e => currentData.redes[idx].caption = e.target.value;
        row.querySelector('button').onclick = () => { currentData.redes.splice(idx, 1); renderRedes(); };
        list.appendChild(row);
    });
}

function renderWebdev() {
    const container = document.getElementById('webdevEditor');
    container.innerHTML = '<div class="admin-card" id="wCard"><h3>Proyectos Web</h3></div>';
    const list = document.createElement('div');
    const btn = document.createElement('button'); btn.className = 'add-btn'; btn.textContent = '+ Agregar Web';
    btn.onclick = () => { currentData.webdev.push({ id: 'w'+Date.now(), src:'', title:'', stack:[] }); renderWebdev(); };
    document.getElementById('wCard').append(list, btn);

    currentData.webdev.forEach((w, idx) => {
        const row = document.createElement('div'); row.className = 'compact-row';
        row.innerHTML = `<div class="compact-preview" id="prevW${idx}"></div>
            <div class="compact-fields">
                <div class="form-group full"><label>Título</label><input type="text" value="${w.title}"></div>
                <div class="form-group full"><label>URL de Imagen</label><input type="text" value="${w.src}"></div>
            </div>
            <button style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:18px;">🗑</button>`;
        row.querySelector(`#prevW${idx}`).innerHTML = `<img src="${w.src}">`;
        const inputs = row.querySelectorAll('input');
        inputs[0].oninput = e => currentData.webdev[idx].title = e.target.value;
        inputs[1].oninput = e => { currentData.webdev[idx].src = e.target.value; row.querySelector(`#prevW${idx}`).innerHTML = `<img src="${e.target.value}">`; };
        row.querySelector('button').onclick = () => { currentData.webdev.splice(idx, 1); renderWebdev(); };
        list.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            if (failedAttempts >= 5) return;
            if (document.getElementById('password').value === ADMIN_PASSWORD) { showAdmin(); } 
            else { failedAttempts++; document.getElementById('loginError').style.display = 'block'; }
        });
    }

    const saveAllBtn = document.getElementById('saveAllBtn');
    if (saveAllBtn) {
        saveAllBtn.addEventListener('click', () => { saveData(currentData); alert('Guardado con éxito!'); });
    }

    document.querySelectorAll('.admin-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('.admin-nav a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
            document.getElementById('panel-' + link.getAttribute('data-panel')).classList.add('active');
            document.getElementById('panelTitle').textContent = link.textContent.trim();
        });
    });
});
