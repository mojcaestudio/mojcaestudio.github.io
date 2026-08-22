/* ========================================
   MOJCA ESTUDIO — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // AOS — Animate On Scroll
    // ========================================
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // ========================================
    // NAV — Scroll effect + Mobile toggle
    // ========================================
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Scroll: add/remove .scrolled
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ========================================
    // GLIGHTBOX — Galerías interactivas
    // ========================================
    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true,
        plyr: {
            css: 'https://cdn.plyr.io/3.6.12/plyr.css',
            js: 'https://cdn.plyr.io/3.6.12/plyr.js',
            config: {
                ratio: '16:9',
                muted: false,
                hideControls: true,
                youtube: {
                    noCookie: true,
                    rel: 0,
                    showinfo: 0
                }
            }
        }
    });

    // ========================================
    // GALERÍA DE FOTOS — Filtro por categoría
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const photoItems = document.querySelectorAll('.photo-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            photoItems.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // ========================================
    // INSTAGRAM FEED — Likes interactivos
    // ========================================
    window.toggleLike = function(btn) {
        btn.classList.toggle('liked');
        const countEl = btn.closest('.ig-post').querySelector('.like-count');
        let count = parseInt(countEl.textContent);
        if (btn.classList.contains('liked')) {
            count++;
            // Pequeña animación
            countEl.style.transform = 'scale(1.3)';
            countEl.style.color = 'var(--accent)';
            setTimeout(() => {
                countEl.style.transform = 'scale(1)';
                countEl.style.color = '';
            }, 200);
        } else {
            count--;
        }
        countEl.textContent = count;
    };

    // Scroll a comentarios Disqus
    window.focusComment = function(postId) {
        const el = document.getElementById(postId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.style.boxShadow = '0 0 0 2px var(--accent)';
            setTimeout(() => {
                el.style.boxShadow = '';
            }, 1500);
        }
    };

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
    // FORMULARIO — Feedback visual
    // ========================================
    const form = document.querySelector('.contacto-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Si no tenés Formspree configurado, mostramos un mensaje
            const action = form.getAttribute('action');
            if (action.includes('YOUR_FORM_ID')) {
                e.preventDefault();
                alert('⚠️ Recordá reemplazar YOUR_FORM_ID en el formulario con tu ID de Formspree. Andá a formspree.io para crear uno gratis.');
                return;
            }
        });
    }

    // ========================================
    // PARALLAX suave en hero (opcional)
    // ========================================
    const heroVideo = document.querySelector('.hero-bg video');
    if (heroVideo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroVideo.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // ========================================
    // LAZY LOADING para imágenes
    // ========================================
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '100px' });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imgObserver.observe(img);
        });
    }

    // ========================================
    // DISQUS — Cargar múltiples threads
    // ========================================
    // Nota: Disqus en un sitio estático solo puede tener un thread por página.
    // Para simular múltiples feeds, usamos un solo thread general.
    // Si querés comentarios por post, necesitás usar Giscus o una solución diferente.
    // El código actual carga un único thread de Disqus.

    console.log('✅ Mojca Estudio — Scripts cargados correctamente');
});
