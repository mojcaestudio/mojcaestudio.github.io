/* ========================================
   MOJCA ESTUDIO - Main JavaScript v2
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // NAV - Scroll effect + Mobile toggle
    // ========================================
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ========================================
    // CARRUSELES - Horizontal y Vertical
    // ========================================
    const carousels = {
        horizontal: { el: document.getElementById('carousel-horizontal'), index: 0 },
        vertical: { el: document.getElementById('carousel-vertical'), index: 0 }
    };

    function getVisibleCount(track) {
        if (window.innerWidth <= 768) return 1;
        if (track.id === 'carousel-vertical') return Math.floor(window.innerWidth / 304);
        return 2;
    }

    function updateCarousel(key) {
        const c = carousels[key];
        if (!c.el) return;
        const items = c.el.children;
        const visible = getVisibleCount(c.el);
        const maxIndex = Math.max(0, items.length - visible);
        c.index = Math.min(c.index, maxIndex);
        const itemWidth = items[0]?.offsetWidth + 24 || 0;
        c.el.style.transform = `translateX(-${c.index * itemWidth}px)`;
    }

    document.querySelectorAll('.carousel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.carousel;
            const dir = btn.classList.contains('prev') ? -1 : 1;
            carousels[key].index += dir;
            updateCarousel(key);
        });
    });

    window.addEventListener('resize', () => {
        Object.keys(carousels).forEach(updateCarousel);
    });

    // ========================================
    // CARRUSELES INTERNOS - Instagram posts
    // ========================================
    window.moveCarousel = function(postId, direction) {
        const track = document.getElementById('carousel-' + postId);
        const dots = document.getElementById('dots-' + postId);
        if (!track || !dots) return;

        const slides = track.children;
        const total = slides.length;
        let current = 0;

        for (let i = 0; i < total; i++) {
            if (dots.children[i].classList.contains('active')) {
                current = i;
                break;
            }
        }

        let next = current + direction;
        if (next < 0) next = total - 1;
        if (next >= total) next = 0;

        track.style.transform = `translateX(-${next * 100}%)`;

        for (let i = 0; i < total; i++) {
            dots.children[i].classList.toggle('active', i === next);
        }
    };

    // ========================================
    // LIKES - Instagram feed
    // ========================================
    window.toggleLike = function(btn) {
        btn.classList.toggle('liked');
        const countEl = btn.closest('.ig-post-full').querySelector('.like-count');
        let count = parseInt(countEl.textContent.replace(/,/g, ''));
        if (btn.classList.contains('liked')) {
            count++;
            countEl.style.transform = 'scale(1.3)';
            countEl.style.color = 'var(--accent)';
            setTimeout(() => {
                countEl.style.transform = 'scale(1)';
                countEl.style.color = '';
            }, 200);
        } else {
            count--;
        }
        countEl.textContent = count.toLocaleString();
    };

    // ========================================
    // GALERIA DE FOTOS - Filtro por categoria
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const photoItems = document.querySelectorAll('.photo-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            photoItems.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    requestAnimationFrame(() => {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    });
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => { item.style.display = 'none'; }, 400);
                }
            });
        });
    });

    // ========================================
    // SMOOTH SCROLL para anclas
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========================================
    // FORMULARIO - Feedback visual
    // ========================================
    const form = document.querySelector('.contacto-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const action = form.getAttribute('action');
            if (action.includes('YOUR_FORM_ID')) {
                e.preventDefault();
                alert('Recorda reemplazar YOUR_FORM_ID en el formulario con tu ID de Formspree. Anda a formspree.io para crear uno gratis.');
            }
        });
    }

    console.log('Mojca Estudio - Scripts cargados correctamente');
});
