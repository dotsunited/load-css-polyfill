/*! load-css-polyfill v0.1.0 - Copyright 2017 Dots United GmbH - Licensed MIT */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.loadCSSPolyfill = factory());
}(this, (function () { 'use strict';

function supports(win) {
    try {
        return (win || window).document.createElement('link').relList.supports('preload');
    } catch (e) {
        return false;
    }
}

function shim(win) {
    var w = win || window;
    var doc = w.document;

    function run() {
        var links = doc.querySelectorAll('link[rel="preload"][as="style"]');

        var loop = function ( i, l ) {
            var link = links[i];

            link.rel = '';

            var newLink = doc.createElement('link');

            newLink.rel = 'stylesheet';
            newLink.href = link.href;
            newLink.media = 'only x';

            var finish = function() {
                newLink.media = link.getAttribute('media') || 'all';
                newLink.removeEventListener('load', finish);
            };

            newLink.addEventListener('load', finish);

            link.parentNode.insertBefore(newLink, link.nextSibling || link);
        };

        for (var i = 0, l = links.length; i < l; i++) loop( i, l );
    }

    run();

    if (doc.readyState !== 'complete') {
        var timer = w.setInterval(run, 300);

        w.addEventListener('load', function() {
            run();
            w.clearInterval(timer);
        });
    }
}

function polyfill(win) {
    if (!supports(win)) {
        shim(win);
    }
}

return polyfill;

})));
