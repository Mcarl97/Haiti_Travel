import { test } from 'node:test';
import assert from 'node:assert/strict';
import { haversineKm, nearest, orderRoute, routeKm, makeProjection } from '../js/geo.js';

const place = (id, lat, lng) => ({ id, coords: { lat, lng } });

test('haversineKm: one degree of longitude at the equator is about 111 km', () => {
    assert.ok(Math.abs(haversineKm({ lat: 0, lng: 0 }, { lat: 0, lng: 1 }) - 111.19) < 0.1);
});

test('haversineKm: distance is symmetric and zero to itself', () => {
    const a = { lat: 19.76, lng: -72.2 }, b = { lat: 18.23, lng: -72.54 };
    assert.equal(haversineKm(a, a), 0);
    assert.equal(haversineKm(a, b), haversineKm(b, a));
});

test('nearest: excludes the place itself and sorts by distance', () => {
    const a = place('a', 0, 0), b = place('b', 0, 1), c = place('c', 0, 3), d = place('d', 0, 2);
    assert.deepEqual(nearest(a, [a, b, c, d], 2).map(n => n.place.id), ['b', 'd']);
});

test('orderRoute: keeps the first stop and visits the closest stop next', () => {
    const stops = [place('start', 0, 0), place('far', 0, 5), place('near', 0, 1), place('mid', 0, 3)];
    assert.deepEqual(orderRoute(stops).map(s => s.id), ['start', 'near', 'mid', 'far']);
});

test('orderRoute: never makes the route longer than the input order here', () => {
    const stops = [place('a', 0, 0), place('b', 0, 4), place('c', 0, 1), place('d', 0, 3)];
    assert.ok(routeKm(orderRoute(stops)) <= routeKm(stops));
});

test('routeKm: sums the legs', () => {
    const stops = [place('a', 0, 0), place('b', 0, 1), place('c', 0, 2)];
    assert.ok(Math.abs(routeKm(stops) - 2 * 111.19) < 0.2);
});

test('makeProjection: maps the bounds to the padded box', () => {
    const { project, width } = makeProjection({ minLng: 0, maxLng: 10, minLat: 0, maxLat: 5 }, 220, 10);
    assert.deepEqual(project([0, 5]), [10, 10]);
    assert.equal(project([10, 0])[0], width - 10);
});
