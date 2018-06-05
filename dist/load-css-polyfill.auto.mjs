/*! load-css-polyfill v1.1.0 - Copyright 2017-2018 Dots United GmbH - Licensed MIT */
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

        [].forEach.call(links, function (link) {
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
        });
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

polyfill();
