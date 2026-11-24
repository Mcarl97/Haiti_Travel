import { destinations, photos, TAGS, haitiOutline, islands, dominicanEdge, cities, commonsUrl, commonsPage, localUrl } from './data.js';
import { nearest, orderRoute, routeKm, makeProjection, boundsOf } from './geo.js';
import { trip } from './trip.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const byId = Object.fromEntries(destinations.map(d => [d.id, d]));
const main = $('#main');

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const icon = (name, cls = 'i') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
const fmtDays = d => (d < 1 ? 'Half a day' : plural(d, 'day'));
const fmtKm = km => `${Math.round(km)} km`;

// ---------- Images ----------

const WIDTHS = [480, 800, 1280, 1920];

function illustration(label) {
    // Drawn stand-in for a place with no free photo yet: a row of colonial facades by the sea.
    const houses = [
        [0, 70, '#e4572e'], [70, 60, '#f2c14e'], [130, 80, '#1c7c7d'], [210, 64, '#f4a259'], [274, 76, '#5b8e7d'], [350, 70, '#e4572e']
    ].map(([x, w, c], i) => `
        <rect x="${x}" y="${70 - (i % 2) * 14}" width="${w}" height="${110 + (i % 2) * 14}" fill="${c}"/>
        <rect x="${x}" y="${92 - (i % 2) * 14}" width="${w}" height="6" fill="#0d3b3f" opacity=".55"/>
        ${[0.2, 0.55].map(f => `<rect x="${x + w * f}" y="${108 - (i % 2) * 14}" width="${w * 0.22}" height="34" fill="#0d3b3f" opacity=".35" rx="2"/>`).join('')}`).join('');
    return `<svg class="illus" viewBox="0 0 420 240" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(label)}: illustration">
        <rect width="420" height="240" fill="#bfe3e0"/>
        <circle cx="340" cy="54" r="26" fill="#f2c14e"/>
        ${houses}
        <rect y="190" width="420" height="50" fill="#1c7c7d"/>
        <path d="M0 200 Q30 194 60 200 T120 200 T180 200 T240 200 T300 200 T360 200 T420 200" fill="none" stroke="#bfe3e0" stroke-width="2" opacity=".6"/>
    </svg>`;
}

// Largest available copy up to `width` (local photos are saved at fixed widths).
function photoUrl(p, width) {
    if (!p.local) return commonsUrl(p.file, width);
    const w = p.widths.filter(x => x <= width).pop() || p.widths[0];
    return localUrl(p.local, w);
}

function picture(key, label, sizes = '100vw', { eager = false } = {}) {
    const p = key && photos[key];
    if (!p) return illustration(label);
    const srcset = p.local
        ? p.widths.map(w => `${localUrl(p.local, w)} ${w}w`).join(', ')
        : WIDTHS.map(w => `${commonsUrl(p.file, w)} ${w}w`).join(', ');
    return `<img src="${photoUrl(p, 1280)}" srcset="${srcset}" sizes="${sizes}" alt="${esc(p.caption)}"
        ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" data-label="${esc(label)}">`;
}

function swapBrokenImages(root = document) {
    $$('img[data-label]', root).forEach(img => {
        const swap = () => img.replaceWith(document.createRange().createContextualFragment(illustration(img.dataset.label)));
        if (img.complete && img.naturalWidth === 0 && img.src) swap();
        else img.addEventListener('error', swap, { once: true });
    });
}

// ---------- Map ----------

const mapBounds = boundsOf([...haitiOutline, ...islands.tortuga, ...dominicanEdge]);

function renderMap({ places, active = null, route = null, width = 640 }) {
    const { project, height } = makeProjection(mapBounds, width, 18);
    const poly = pts => pts.map(project).map(p => p.join(',')).join(' ');
    const routeLine = route && route.length > 1
        ? `<polyline class="map-route" points="${route.map(d => project([d.coords.lng, d.coords.lat]).join(',')).join(' ')}"/>`
        : '';
    const pins = places.map((d, i) => {
        const [x, y] = project([d.coords.lng, d.coords.lat]);
        const label = route ? String(i + 1) : '';
        return `<a href="/destinations/${d.id}" data-link class="pin${d.id === active ? ' is-active' : ''}" data-id="${d.id}"
                aria-label="${esc(d.name)}, ${esc(d.region)}">
            <circle cx="${x}" cy="${y}" r="${route ? 11 : 7}" class="pin-dot"/>
            ${label ? `<text x="${x}" y="${y + 4}" class="pin-num">${label}</text>` : ''}
            <g class="pin-label"><rect x="${x + 12}" y="${y - 13}" width="${d.name.length * 7.2 + 16}" height="26" rx="13"/>
            <text x="${x + 20}" y="${y + 4}">${esc(d.name)}</text></g>
        </a>`;
    }).join('');
    const cityMarks = cities.map(c => {
        const [x, y] = project([c.coords.lng, c.coords.lat]);
        return `<g class="city" aria-hidden="true"><rect x="${x - 4}" y="${y - 4}" width="8" height="8" transform="rotate(45 ${x} ${y})"/>
            <text x="${x - 9}" y="${y - 6}" text-anchor="end">${esc(c.name)}</text></g>`;
    }).join('');
    const [drX, drY] = project([-71.42, 18.95]);
    return `<svg class="map" viewBox="0 0 ${width} ${height}" role="group" aria-label="Map of Haiti">
        <polygon class="neighbor" points="${poly(dominicanEdge)}"/>
        <text class="neighbor-label" x="${drX}" y="${drY}" transform="rotate(-90 ${drX} ${drY})">Dominican Republic</text>
        <polygon class="land shadow" points="${poly(haitiOutline)}" transform="translate(3 4)"/>
        <polygon class="land" points="${poly(haitiOutline)}"/>
        <polygon class="land" points="${poly(islands.gonave)}"/>
        <polygon class="land" points="${poly(islands.tortuga)}"/>
        <text class="sea-label" x="${width * 0.08}" y="${height * 0.14}">Atlantic Ocean</text>
        <text class="sea-label" x="${width * 0.42}" y="${height * 0.96}">Caribbean Sea</text>
        ${cityMarks}${routeLine}${pins}
    </svg>`;
}

// ---------- Shared pieces ----------

function tripButton(d, { compact = false } = {}) {
    const on = trip.has(d.id);
    return `<button class="trip-btn${on ? ' is-on' : ''}${compact ? ' compact' : ''}" data-trip="${d.id}" aria-pressed="${on}">
        ${icon(on ? 'check' : 'plus')}<span>${on ? 'In your trip' : 'Add to trip'}</span></button>`;
}

function card(d) {
    return `<article class="card" data-id="${d.id}">
        <a href="/destinations/${d.id}" data-link class="card-media" tabindex="-1" aria-hidden="true">${picture(d.image, d.name, '(max-width: 700px) 100vw, 360px')}</a>
        <div class="card-body">
            <p class="eyebrow">${icon('pin')}${esc(d.region)} · ${d.tags.map(esc).join(', ')}</p>
            <h3><a href="/destinations/${d.id}" data-link>${esc(d.name)}</a></h3>
            <p>${esc(d.summary)}</p>
            <div class="card-foot">
                <span class="time">${icon('clock')}${esc(fmtDays(d.days))}</span>
                ${tripButton(d, { compact: true })}
            </div>
        </div>
    </article>`;
}

function setMeta(title, description) {
    document.title = title ? `${title} | Haiti Travel` : 'Haiti Travel: the Citadelle, Jacmel, Bassin Bleu and more';
    $('meta[name="description"]').setAttribute('content', description);
}

// ---------- Views ----------

function filterPlaces(q, tag) {
    const words = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return destinations.filter(d => {
        if (tag && !d.tags.includes(tag)) return false;
        const hay = [d.name, d.region, d.summary, ...d.tags, ...d.highlights].join(' ').toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '');
        return words.every(w => hay.includes(w.normalize('NFD').replace(/[̀-ͯ]/g, '')));
    });
}

function homeView(params) {
    setMeta('', 'A travel guide to ten places in Haiti, with an interactive map, a trip planner and practical advice.');
    const q = params.get('q') || '';
    const tag = TAGS.includes(params.get('tag')) ? params.get('tag') : '';
    return `
    <section class="hero">
        <div class="hero-media">${picture('citadelleAerial', 'Citadelle Laferrière', '100vw', { eager: true })}</div>
        <div class="wrap hero-inner">
            <h1>Haiti, from the Citadelle <em>to the sea.</em></h1>
            <p class="lead">Ten places worth the journey: mountain fortresses, a royal palace, blue pools, quiet islands and a town of artists.</p>
            <form class="hero-search" role="search" data-search>
                <label class="sr" for="heroQ">Search destinations</label>
                ${icon('search')}
                <input id="heroQ" name="q" type="search" placeholder="Try “history”, “beach” or “Jacmel”" value="${esc(q)}" autocomplete="off">
                <button type="submit">Search</button>
            </form>
        </div>
    </section>

    <aside class="advisory wrap" aria-label="Travel advisory">
        ${icon('alert')}
        <p><strong>Plan carefully.</strong> Conditions in Haiti change quickly. Check your government's latest travel advisory before you book. <a href="/about#before-you-go" data-link>What to know</a></p>
    </aside>

    <section class="explore wrap" id="explore" aria-labelledby="exploreTitle">
        <div class="explore-head">
            <h2 id="exploreTitle">Explore the map</h2>
            <div class="filters" role="group" aria-label="Filter by theme">
                <button class="chip${tag ? '' : ' is-on'}" data-tag="" aria-pressed="${!tag}">All</button>
                ${TAGS.map(t => `<button class="chip${t === tag ? ' is-on' : ''}" data-tag="${t}" aria-pressed="${t === tag}">${t}</button>`).join('')}
            </div>
        </div>
        <div class="explore-grid">
            <div class="map-panel" id="mapPanel"></div>
            <div>
                <p class="results" id="results" aria-live="polite"></p>
                <div class="cards" id="cards"></div>
            </div>
        </div>
    </section>

    <section class="band">
        <div class="wrap band-inner">
            <div>
                <h2>Build your route</h2>
                <p>Add places as you browse. Your trip saves in this browser, orders itself by distance and gives you a link to share.</p>
            </div>
            <a class="btn-light" href="/trip" data-link>Open my trip ${icon('arrow')}</a>
        </div>
    </section>`;
}

function updateExplore(params) {
    const q = params.get('q') || '';
    const tag = TAGS.includes(params.get('tag')) ? params.get('tag') : '';
    const list = filterPlaces(q, tag);
    const cards = $('#cards');
    if (!cards) return;
    cards.innerHTML = list.length
        ? list.map(card).join('')
        : `<div class="empty"><p>No places match “${esc(q)}”${tag ? ` in ${esc(tag)}` : ''}.</p><button class="link-btn" data-clear>Clear filters</button></div>`;
    $('#mapPanel').innerHTML = renderMap({ places: list });
    $('#results').textContent = `${plural(list.length, 'place')}${tag ? ` · ${tag}` : ''}${q ? ` · “${q}”` : ''}`;
    $$('.chip').forEach(c => {
        const on = c.dataset.tag === tag;
        c.classList.toggle('is-on', on);
        c.setAttribute('aria-pressed', on);
    });
    swapBrokenImages(cards);
}

function destinationView(id) {
    const d = byId[id];
    if (!d) return notFoundView();
    setMeta(d.name, d.summary);
    const near = nearest(d, destinations, 3);
    const gallery = d.gallery.map((key, i) => `
        <button class="thumb" data-lightbox="${d.id}" data-index="${i}" aria-label="Open photo: ${esc(photos[key].caption)}">
            ${picture(key, d.name, '(max-width: 700px) 50vw, 240px')}
        </button>`).join('');
    return `
    <article class="detail">
        <div class="detail-hero">
            ${d.gallery.length ? `<button class="detail-media" data-lightbox="${d.id}" data-index="0" aria-label="Open photos of ${esc(d.name)}">` : '<div class="detail-media">'}
                ${picture(d.image, d.name, '100vw', { eager: true })}
            ${d.gallery.length ? '</button>' : '</div>'}
        </div>
        <div class="wrap detail-grid">
            <div class="detail-main">
                <nav class="crumbs" aria-label="Breadcrumb"><a href="/#explore" data-link>${icon('back')}All places</a></nav>
                <p class="eyebrow">${icon('pin')}${esc(d.region)} · ${d.tags.map(esc).join(', ')}</p>
                <h1 tabindex="-1">${esc(d.name)}</h1>
                <p class="lead">${esc(d.title)}.</p>
                ${d.body.map(p => `<p>${esc(p)}</p>`).join('')}
                <h2>Highlights</h2>
                <ul class="ticks">${d.highlights.map(h => `<li>${icon('check')}${esc(h)}</li>`).join('')}</ul>
                ${gallery ? `<h2>Photos</h2><div class="gallery">${gallery}</div>` : ''}
                <h2>Nearby</h2>
                <ul class="nearby">${near.map(({ place, km }) => `
                    <li><a href="/destinations/${place.id}" data-link><span>${esc(place.name)}</span><span class="km">${fmtKm(km)} away</span></a></li>`).join('')}
                </ul>
                <p class="note">Distances are straight-line. Roads in Haiti are slower than they look.</p>
            </div>
            <aside class="facts" aria-label="Plan your visit">
                <h2>Plan your visit</h2>
                <dl>
                    <dt>${icon('clock')}Time needed</dt><dd>${esc(d.facts.time)}</dd>
                    <dt>${icon('pin')}Getting there</dt><dd>${esc(d.facts.gettingThere)}</dd>
                    <dt>${icon('check')}Best for</dt><dd>${esc(d.facts.bestFor)}</dd>
                </dl>
                ${tripButton(d)}
                <div class="mini-map">${renderMap({ places: [d], active: d.id, width: 320 })}</div>
            </aside>
        </div>
    </article>`;
}

function tripView(params) {
    setMeta('My trip', 'Your Haiti itinerary: stops, days and distances, with a link to share.');
    const shared = (params.get('stops') || '').split(',').filter(id => byId[id]);
    const mine = trip.ids().filter(id => byId[id]);
    const sharedBanner = shared.length && shared.join() !== mine.join() ? `
        <div class="shared">
            <p><strong>Someone shared a trip with you:</strong> ${shared.map(id => esc(byId[id].name)).join(', ')}.</p>
            <button class="btn" data-load-shared="${shared.join(',')}">Use this trip</button>
        </div>` : '';
    const stops = mine.map(id => byId[id]);
    const days = stops.reduce((n, d) => n + d.days, 0);

    if (!stops.length) {
        return `<section class="wrap page">
            <h1 tabindex="-1">My trip</h1>${sharedBanner}
            <div class="empty big">
                <p>Your trip is empty. Add places from the map and they'll show up here, in order, with days and distances.</p>
                <a class="btn" href="/#explore" data-link>Explore places ${icon('arrow')}</a>
            </div></section>`;
    }

    return `<section class="wrap page">
        <h1 tabindex="-1">My trip</h1>${sharedBanner}
        <div class="trip-grid">
            <div>
                <div class="trip-stats">
                    <div><b>${stops.length}</b><span>${stops.length === 1 ? 'stop' : 'stops'}</span></div>
                    <div><b>${days % 1 ? days.toFixed(1) : days}</b><span>${days === 1 ? 'day' : 'days'}, roughly</span></div>
                    <div><b>${fmtKm(routeKm(stops))}</b><span>straight-line route</span></div>
                </div>
                <ol class="stops">${stops.map((d, i) => `
                    <li class="stop">
                        <span class="stop-num">${i + 1}</span>
                        <div class="stop-body">
                            <a href="/destinations/${d.id}" data-link>${esc(d.name)}</a>
                            <span>${esc(d.region)} · ${esc(fmtDays(d.days))}${i ? ` · ${fmtKm(routeKm([stops[i - 1], d]))} from ${esc(stops[i - 1].name)}` : ''}</span>
                        </div>
                        <div class="stop-actions">
                            <button class="icon-btn" data-move="${d.id}" data-step="-1" aria-label="Move ${esc(d.name)} up" ${i === 0 ? 'disabled' : ''}>${icon('up')}</button>
                            <button class="icon-btn" data-move="${d.id}" data-step="1" aria-label="Move ${esc(d.name)} down" ${i === stops.length - 1 ? 'disabled' : ''}>${icon('down')}</button>
                            <button class="icon-btn" data-trip="${d.id}" aria-label="Remove ${esc(d.name)}">${icon('close')}</button>
                        </div>
                    </li>`).join('')}
                </ol>
                <div class="trip-actions">
                    <button class="btn" data-optimize ${stops.length < 3 ? 'disabled' : ''}>${icon('route')}Shortest order</button>
                    <button class="btn ghost" data-share>${icon('link')}Copy share link</button>
                    <button class="link-btn" data-clear-trip>Clear trip</button>
                </div>
                <p class="note">“Shortest order” keeps your first stop and visits the nearest place next each time.</p>
            </div>
            <div class="map-panel">${renderMap({ places: stops, route: stops })}</div>
        </div>
    </section>`;
}

function aboutView() {
    setMeta('Before you go', 'Practical information for planning a trip to Haiti.');
    return `<section class="wrap page prose">
        <h1 tabindex="-1">Before you go</h1>
        <p class="lead">Haiti rewards travelers who plan ahead. Here is what to know first.</p>
        <h2 id="before-you-go">Safety comes first</h2>
        <p>Conditions in Haiti can change quickly, and some governments advise against all travel there. Read your government's current advisory before you book, travel with trusted local contacts, and keep your plans flexible.</p>
        <p><a href="https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html">U.S. State Department travel advisories</a></p>
        <h2>Quick facts</h2>
        <dl class="facts-list">
            <dt>Capital</dt><dd>Port-au-Prince</dd>
            <dt>Languages</dt><dd>Haitian Creole and French</dd>
            <dt>Currency</dt><dd>Haitian gourde (HTG)</dd>
            <dt>Climate</dt><dd>Tropical, with cooler air in the mountains</dd>
            <dt>Highest point</dt><dd>Pic la Selle, 2,680 m</dd>
            <dt>Independence</dt><dd>1 January 1804, the first free Black republic</dd>
        </dl>
        <h2>A few tips</h2>
        <ul class="ticks">
            <li>${icon('check')}Learn a few words of Kreyòl: <em>bonjou</em> (good morning), <em>mèsi</em> (thank you).</li>
            <li>${icon('check')}Roads through the mountains are slow, so plan fewer stops per day than the map suggests.</li>
            <li>${icon('check')}Local guides make sites like the Citadelle and Bassin Bleu easier and safer to visit.</li>
        </ul>
    </section>`;
}

function creditsView() {
    setMeta('Photo credits', 'Credits and licenses for the photos used on Haiti Travel.');
    const all = Object.values(photos);
    const commons = all.filter(p => !p.local);
    const local = all.filter(p => p.local);
    return `<section class="wrap page">
        <h1 tabindex="-1">Photo credits</h1>
        <h2>Wikimedia Commons</h2>
        <p class="lead">These photos come from Wikimedia Commons and keep their original licenses.</p>
        <div class="table-wrap"><table class="credits">
            <thead><tr><th>Photo</th><th>Author</th><th>License</th></tr></thead>
            <tbody>${commons.map(p => `<tr>
                <td><a href="${commonsPage(p.file)}">${esc(p.caption)}</a></td>
                <td>${esc(p.author || 'See file page')}</td>
                <td>${esc(p.license || 'See file page')}</td></tr>`).join('')}
            </tbody></table></div>
        <h2>Shared photos</h2>
        <p>These photos were shared with Haiti Travel and their original photographers are not known.
        If one of them is yours, get in touch through <a href="https://carlmesidor.com">carlmesidor.com</a>
        and it will be credited the way you want, or removed.</p>
        <ul class="ticks">${local.map(p => `<li>${icon('check')}${esc(p.caption)}</li>`).join('')}</ul>
    </section>`;
}

function notFoundView() {
    setMeta('Page not found', 'This page does not exist.');
    return `<section class="wrap page">
        <h1 tabindex="-1">Page not found</h1>
        <p class="lead">That page doesn't exist, but the rest of Haiti does.</p>
        <a class="btn" href="/" data-link>Back to the map ${icon('arrow')}</a>
    </section>`;
}

// ---------- Router ----------

function route({ focus = true } = {}) {
    const path = location.pathname.replace(/\/+$/, '') || '/';
    const params = new URLSearchParams(location.search);
    const parts = path.split('/').filter(Boolean);
    let html;
    if (path === '/') html = homeView(params);
    else if (parts[0] === 'destinations' && parts.length === 2) html = destinationView(parts[1]);
    else if (path === '/trip') html = tripView(params);
    else if (path === '/about') html = aboutView();
    else if (path === '/credits') html = creditsView();
    else html = notFoundView();

    main.innerHTML = html;
    document.body.dataset.view = path === '/' ? 'home' : parts[0];
    if (path === '/') updateExplore(params);
    swapBrokenImages(main);

    if (location.hash) {
        requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
    } else if (focus) {
        window.scrollTo(0, 0);
        const h1 = $('h1', main);
        if (h1 && path !== '/') h1.focus({ preventScroll: true });
    }
}

function navigate(url, { replace = false } = {}) {
    const next = new URL(url, location.origin);
    if (next.origin !== location.origin) return (location.href = url);
    const samePage = next.pathname === location.pathname;
    history[replace ? 'replaceState' : 'pushState']({}, '', next.pathname + next.search + next.hash);
    if (samePage && next.pathname === '/' && !replace) {
        updateExplore(new URLSearchParams(next.search));
        if (next.hash) document.getElementById(next.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    route();
}

function setParam(key, value) {
    const params = new URLSearchParams(location.search);
    value ? params.set(key, value) : params.delete(key);
    const qs = params.toString();
    history.replaceState({}, '', `/${qs ? `?${qs}` : ''}${location.hash}`);
    updateExplore(params);
}

// ---------- Lightbox ----------

const lb = { el: $('#lightbox'), keys: [], i: 0 };

function showPhoto() {
    const p = photos[lb.keys[lb.i]];
    $('#lbImg').src = photoUrl(p, 1920);
    $('#lbImg').alt = p.caption;
    $('#lbCaption').innerHTML = `${esc(p.caption)} <span>· ${esc(p.author || (p.local ? 'Haiti Travel' : 'Wikimedia Commons'))}${p.license ? `, ${esc(p.license)}` : ''} · ${lb.i + 1} of ${lb.keys.length}</span>`;
    $$('.lb-prev, .lb-next', lb.el).forEach(b => { b.hidden = lb.keys.length < 2; });
}

function openLightbox(id, index) {
    lb.keys = byId[id].gallery;
    if (!lb.keys.length) return;
    lb.i = index;
    showPhoto();
    lb.el.showModal();
}

lb.el.addEventListener('click', e => {
    const action = e.target.closest('[data-lb]')?.dataset.lb;
    if (action === 'close' || e.target === lb.el) lb.el.close();
    if (action === 'prev') { lb.i = (lb.i - 1 + lb.keys.length) % lb.keys.length; showPhoto(); }
    if (action === 'next') { lb.i = (lb.i + 1) % lb.keys.length; showPhoto(); }
});
lb.el.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') $('.lb-prev', lb.el).click();
    if (e.key === 'ArrowRight') $('.lb-next', lb.el).click();
});

// ---------- Toast ----------

let toastTimer;
function toast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-on'), 2600);
}

// ---------- Events ----------

document.addEventListener('click', async e => {
    const link = e.target.closest('a[data-link]');
    if (link && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
        e.preventDefault();
        return navigate(link.getAttribute('href'));
    }

    const t = e.target.closest('button');
    if (!t) return;

    if (t.dataset.trip) {
        const d = byId[t.dataset.trip];
        trip.toggle(d.id);
        toast(trip.has(d.id) ? `${d.name} added to your trip` : `${d.name} removed from your trip`);
    } else if (t.dataset.tag !== undefined && t.classList.contains('chip')) {
        setParam('tag', t.dataset.tag);
    } else if ('clear' in t.dataset) {
        history.replaceState({}, '', '/#explore');
        const input = $('#heroQ');
        if (input) input.value = '';
        updateExplore(new URLSearchParams());
    } else if (t.dataset.move) {
        trip.move(t.dataset.move, Number(t.dataset.step));
    } else if ('optimize' in t.dataset) {
        trip.set(orderRoute(trip.ids().map(id => byId[id]).filter(Boolean)).map(d => d.id));
        toast('Stops reordered by distance');
    } else if ('share' in t.dataset) {
        try {
            await navigator.clipboard.writeText(trip.shareUrl());
            toast('Share link copied');
        } catch {
            window.prompt('Copy this link to share your trip:', trip.shareUrl());
        }
    } else if ('clearTrip' in t.dataset) {
        trip.clear();
        toast('Trip cleared');
    } else if (t.dataset.loadShared) {
        trip.set(t.dataset.loadShared.split(','));
        history.replaceState({}, '', '/trip');
        toast('Shared trip loaded');
    } else if (t.dataset.lightbox) {
        openLightbox(t.dataset.lightbox, Number(t.dataset.index));
    }
});

document.addEventListener('submit', e => {
    if (!e.target.matches('[data-search]')) return;
    e.preventDefault();
    setParam('q', new FormData(e.target).get('q').trim());
    $('#explore').scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('input', e => {
    if (e.target.id === 'heroQ') setParam('q', e.target.value.trim());
});

// Link the map and the cards: hovering one highlights the other.
['pointerover', 'focusin'].forEach(type => document.addEventListener(type, e => {
    const el = e.target.closest?.('.card[data-id], .pin[data-id]');
    $$('.is-hover').forEach(x => x.classList.remove('is-hover'));
    if (!el) return;
    $$(`[data-id="${el.dataset.id}"]`).forEach(x => x.classList.add('is-hover'));
}));

trip.onChange(ids => {
    $('#tripCount').textContent = ids.length;
    $$('[data-trip]').forEach(b => {
        if (!b.classList.contains('trip-btn')) return;
        const on = ids.includes(b.dataset.trip);
        b.classList.toggle('is-on', on);
        b.setAttribute('aria-pressed', on);
        b.innerHTML = `${icon(on ? 'check' : 'plus')}<span>${on ? 'In your trip' : 'Add to trip'}</span>`;
    });
    if (location.pathname === '/trip') route({ focus: false });
});

window.addEventListener('popstate', () => route());
window.addEventListener('scroll', () => $('#siteHeader').classList.toggle('is-solid', window.scrollY > 40), { passive: true });

// ---------- Start ----------

$('#footerDestinations').innerHTML = destinations.map(d => `<li><a href="/destinations/${d.id}" data-link>${esc(d.name)}</a></li>`).join('');
$('#year').textContent = new Date().getFullYear();
$('#tripCount').textContent = trip.ids().length;
route({ focus: false });
