import test from 'ava';
import { JSDOM } from 'jsdom';

import polyfill from '../dist/load-css-polyfill';

test('polyfill() process link[rel="preload"] elements', t => {
    const win = new JSDOM(`
<!DOCTYPE html>
<head>
    <link rel="preload" href="style.css" as="style" onload="this.rel='stylesheet'">
</head>
    `).window;

    t.is(undefined, win.document.createElement('link').relList);

    polyfill(win);

    const link = win.document.querySelector('link[rel="stylesheet"]');

    t.truthy(link);
    t.is('style.css', link.href);
    t.is('only x', link.media);

    link.dispatchEvent(new win.Event('load'));

    t.is('all', link.media);
});

test('polyfill() preserves original media attribute value', t => {
    const win = new JSDOM(`
<!DOCTYPE html>
<head>
    <link media="foo" rel="preload" href="style.css" as="style" onload="this.rel='stylesheet'">
</head>
    `).window;

    t.is(undefined, win.document.createElement('link').relList);

    polyfill(win);

    const link = win.document.querySelector('link[rel="stylesheet"]');

    t.truthy(link);

    link.dispatchEvent(new win.Event('load'));

    t.is('foo', link.media);
});


test('polyfill() processes link elements added later, before window loaded', t => {
    const win = new JSDOM(`
<!DOCTYPE html>
<head>
</head>
    `).window;

    Object.defineProperty(win.document, "readyState", {
        get() { return "loading"; }
    });

    t.is(undefined, win.document.createElement('link').relList);

    t.is('loading', win.document.readyState);

    polyfill(win);

    const lateLink = win.document.createElement('link');
    lateLink.rel = 'preload';
    // Looks like jsdom doesn't support lateLink.as = 'style'
    lateLink.setAttribute('as', 'style');

    win.document.head.appendChild(lateLink);

    t.falsy(win.document.querySelector('link[rel="stylesheet"]'));

    win.dispatchEvent(new win.Event('load'));

    t.truthy(win.document.querySelector('link[rel="stylesheet"]'));
});
