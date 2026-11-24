import { test } from 'node:test';
import assert from 'node:assert/strict';
import { destinations, photos, TAGS, haitiOutline } from '../js/data.js';
import { boundsOf } from '../js/geo.js';

test('every destination has a unique, URL-safe id', () => {
    const ids = destinations.map(d => d.id);
    assert.equal(new Set(ids).size, ids.length);
    ids.forEach(id => assert.match(id, /^[a-z0-9-]+$/));
});

test('every destination has the fields the UI needs', () => {
    for (const d of destinations) {
        for (const key of ['name', 'region', 'summary', 'title']) assert.ok(d[key], `${d.id} is missing ${key}`);
        assert.ok(d.body.length > 0, `${d.id} has no body text`);
        assert.ok(d.highlights.length >= 3, `${d.id} needs at least 3 highlights`);
        assert.ok(d.facts.time && d.facts.bestFor && d.facts.gettingThere, `${d.id} is missing facts`);
        assert.ok(d.days > 0, `${d.id} needs a positive number of days`);
    }
});

test('tags come from the shared tag list', () => {
    for (const d of destinations) d.tags.forEach(t => assert.ok(TAGS.includes(t), `${d.id} uses unknown tag ${t}`));
});

test('every photo reference points to a known photo', () => {
    for (const d of destinations) {
        if (d.image !== null) assert.ok(photos[d.image], `${d.id} image ${d.image} not found`);
        d.gallery.forEach(key => assert.ok(photos[key], `${d.id} gallery photo ${key} not found`));
    }
});

test('coordinates fall inside the map of Haiti', () => {
    const b = boundsOf(haitiOutline);
    for (const { id, coords } of destinations) {
        assert.ok(coords.lat >= b.minLat && coords.lat <= b.maxLat, `${id} latitude is off the map`);
        assert.ok(coords.lng >= b.minLng && coords.lng <= b.maxLng, `${id} longitude is off the map`);
    }
});
