// Trip planner state: a list of destination ids, saved in the browser
// and shareable as a link (/trip?stops=a,b,c).

const KEY = 'haiti-travel:trip';
const listeners = new Set();

function read() {
    try {
        const ids = JSON.parse(localStorage.getItem(KEY) || '[]');
        return Array.isArray(ids) ? ids.filter(id => typeof id === 'string') : [];
    } catch {
        return [];
    }
}

let ids = read();

function save() {
    try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch { /* storage may be off */ }
    listeners.forEach(fn => fn([...ids]));
}

export const trip = {
    ids: () => [...ids],
    has: id => ids.includes(id),
    toggle(id) {
        ids = ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id];
        save();
    },
    set(next) {
        ids = [...new Set(next)];
        save();
    },
    move(id, step) {
        const i = ids.indexOf(id);
        const j = i + step;
        if (i < 0 || j < 0 || j >= ids.length) return;
        [ids[i], ids[j]] = [ids[j], ids[i]];
        save();
    },
    clear() {
        ids = [];
        save();
    },
    shareUrl: () => `${location.origin}/trip?stops=${ids.map(encodeURIComponent).join(',')}`,
    onChange(fn) {
        listeners.add(fn);
        return () => listeners.delete(fn);
    }
};

// Keep several open tabs in sync.
window.addEventListener('storage', e => {
    if (e.key === KEY) {
        ids = read();
        listeners.forEach(fn => fn([...ids]));
    }
});
