// Pure geography helpers (no DOM), shared by the app and the tests.

const EARTH_RADIUS_KM = 6371;
const toRad = deg => (deg * Math.PI) / 180;

/** Great-circle distance between two {lat, lng} points, in kilometers. */
export function haversineKm(a, b) {
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const h = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/** The `count` places closest to `place`, nearest first, with their distance. */
export function nearest(place, places, count = 3) {
    return places
        .filter(p => p.id !== place.id)
        .map(p => ({ place: p, km: haversineKm(place.coords, p.coords) }))
        .sort((x, y) => x.km - y.km)
        .slice(0, count);
}

/**
 * Orders stops with a nearest-neighbour heuristic, starting from the first stop.
 * Good enough for a handful of places and easy to explain.
 */
export function orderRoute(stops) {
    if (stops.length < 3) return [...stops];
    const remaining = stops.slice(1);
    const route = [stops[0]];
    while (remaining.length) {
        const last = route[route.length - 1];
        let best = 0;
        remaining.forEach((p, i) => {
            if (haversineKm(last.coords, p.coords) < haversineKm(last.coords, remaining[best].coords)) best = i;
        });
        route.push(remaining.splice(best, 1)[0]);
    }
    return route;
}

/** Total straight-line distance along a route, in kilometers. */
export function routeKm(stops) {
    let total = 0;
    for (let i = 1; i < stops.length; i++) total += haversineKm(stops[i - 1].coords, stops[i].coords);
    return total;
}

/** Projects [lng, lat] onto an SVG box (equirectangular, corrected for latitude). */
export function makeProjection(bounds, width, padding = 20) {
    const midLat = toRad((bounds.minLat + bounds.maxLat) / 2);
    const spanX = (bounds.maxLng - bounds.minLng) * Math.cos(midLat);
    const spanY = bounds.maxLat - bounds.minLat;
    const scale = (width - padding * 2) / spanX;
    const height = Math.round(spanY * scale + padding * 2);
    const project = ([lng, lat]) => [
        +(padding + (lng - bounds.minLng) * Math.cos(midLat) * scale).toFixed(1),
        +(padding + (bounds.maxLat - lat) * scale).toFixed(1)
    ];
    return { project, width, height };
}

export function boundsOf(points) {
    return points.reduce((b, [lng, lat]) => ({
        minLng: Math.min(b.minLng, lng), maxLng: Math.max(b.maxLng, lng),
        minLat: Math.min(b.minLat, lat), maxLat: Math.max(b.maxLat, lat)
    }), { minLng: Infinity, maxLng: -Infinity, minLat: Infinity, maxLat: -Infinity });
}
