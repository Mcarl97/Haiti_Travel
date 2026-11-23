import { heroImages, destinations } from './data.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const homeSections = () => [$('#home'), $('#destinations')];

// A photo, or a styled placeholder when there is no photo (or it fails to load).
const placeholder = name => `<div class="no-photo" role="img" aria-label="${name}"><span>${name}</span></div>`;
const media = (src, name) => src
    ? `<img src="${src}" alt="${name}" loading="lazy" data-name="${name}">`
    : placeholder(name);

function swapBrokenImages(root = document) {
    $$('img[data-name]', root).forEach(img => {
        const swap = () => img.replaceWith(document.createRange().createContextualFragment(placeholder(img.dataset.name)));
        if (img.complete && img.naturalWidth === 0) swap();
        else img.addEventListener('error', swap, { once: true });
    });
}

// ---------- Rendering ----------

function renderHeroSlideshow() {
    const slideshow = $('#heroSlideshow');
    slideshow.innerHTML = heroImages
        .map((src, i) => `<div class="slide${i === 0 ? ' active' : ''}" style="background-image:url('${src}')"></div>`)
        .join('');

    const slides = $$('.slide', slideshow);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (slides.length < 2 || reduceMotion) return;

    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 5000);
}

function renderDestinationCards() {
    $('#destinationsGrid').innerHTML = destinations
        .map(d => `
            <a class="destination-card fade-in" href="#destination/${d.id}" aria-label="Explore ${d.name}">
                ${media(d.image, d.name)}
                <div class="destination-overlay">
                    <h3>${d.name}</h3>
                    <p>${d.description}</p>
                    <span class="explore-btn">Explore</span>
                </div>
            </a>`)
        .join('');
}

function renderDestinationPages() {
    $('#destinationPages').innerHTML = destinations
        .map(d => `
            <section class="destination-page" id="destination-${d.id}" aria-labelledby="title-${d.id}">
                <div class="container">
                    <div class="destination-hero">
                        ${media(d.image, d.name)}
                        <div class="destination-hero-content">
                            <h1 id="title-${d.id}">${d.details.title}</h1>
                            <p>${d.description}</p>
                        </div>
                    </div>
                    <div class="destination-content">
                        <div class="destination-text">
                            <h2>About ${d.name}</h2>
                            <p>${d.details.description}</p>
                            <h2>Highlights</h2>
                            <ul class="destination-features">
                                ${d.details.features.map(f => `<li><i class="fas fa-check-circle" aria-hidden="true"></i> ${f}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="glass-card">
                            <h2>Gallery</h2>
                            ${d.details.gallery.length
                                ? `<div class="destination-gallery">${d.details.gallery.map(src => media(src, d.name)).join('')}</div>`
                                : `<p class="demo-note">Photos of ${d.name} coming soon.</p>`}
                            <p class="photo-credit">Photos: Wikimedia Commons. See README for credits.</p>
                        </div>
                    </div>
                    <a href="#destinations" class="back-button"><i class="fas fa-arrow-left" aria-hidden="true"></i> Back to Destinations</a>
                </div>
            </section>`)
        .join('');
}

function renderFooterLinks() {
    $('#footerDestinations').innerHTML = destinations
        .map(d => `<li><a href="#destination/${d.id}">${d.name}</a></li>`)
        .join('');
    $('#bookingDestination').insertAdjacentHTML(
        'beforeend',
        destinations.map(d => `<option value="${d.id}">${d.name}</option>`).join('')
    );
    $('#year').textContent = new Date().getFullYear();
}

// ---------- Routing (hash based, so the browser back button works) ----------

function showView(view) {
    $$('.destination-page').forEach(page => { page.style.display = 'none'; });
    homeSections().forEach(section => section.classList.toggle('hidden', view !== 'home'));
    if (view !== 'home') view.style.display = 'block';
}

function route() {
    const hash = decodeURIComponent(location.hash.slice(1));

    if (hash.startsWith('destination/')) {
        const page = document.getElementById(`destination-${hash.split('/')[1]}`);
        if (page) {
            showView(page);
            window.scrollTo({ top: 0 });
            return;
        }
    }

    if (hash === 'about') {
        showView($('#about'));
        window.scrollTo({ top: 0 });
        return;
    }

    showView('home');
    const target = hash ? document.getElementById(hash) : null;
    if (target && hash !== 'home') {
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ---------- Navigation ----------

function setupNavigation() {
    const navbar = $('#navbar');
    const menuBtn = $('#mobileMenuBtn');
    const navLinks = $('#navLinks');

    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const setMenu = open => {
        navLinks.classList.toggle('active', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.innerHTML = `<i class="fas ${open ? 'fa-times' : 'fa-bars'}" aria-hidden="true"></i>`;
    };

    menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('active')));
    navLinks.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
}

// ---------- Booking modal (demo: nothing is sent) ----------

function setupBookingModal() {
    const modal = $('#bookingModal');
    const form = $('#bookingForm');
    const success = $('#bookingSuccess');
    let lastFocus = null;

    const open = () => {
        lastFocus = document.activeElement;
        form.hidden = false;
        success.hidden = true;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        $('#bookingName').focus();
    };

    const close = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocus) lastFocus.focus();
    };

    $('#bookNowBtn').addEventListener('click', e => { e.preventDefault(); open(); });
    $('#closeModal').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) close();
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        form.reset();
        form.hidden = true;
        success.hidden = false;
    });
}

// ---------- Scroll animations ----------

function setupScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    $$('.fade-in').forEach(el => observer.observe(el));
}

// ---------- Start ----------

renderHeroSlideshow();
renderDestinationCards();
renderDestinationPages();
renderFooterLinks();
swapBrokenImages();
setupNavigation();
setupBookingModal();
setupScrollAnimations();
window.addEventListener('hashchange', route);
route();
