function supports(win) {
    try {
        return (win || window).document.createElement('link').relList.supports('preload');
    } catch (e) {
        return false;
    }
}

function shim(win) {
    const w = win || window;
    const doc = w.document;

    function run() {
        const links = doc.querySelectorAll('link[rel="preload"][as="style"]');

        for (let i = 0, l = links.length; i < l; i++) {
            const link = links[i];

            link.rel = '';

            const newLink = doc.createElement('link');

            newLink.rel = 'stylesheet';
            newLink.href = link.href;
            newLink.media = 'only x';

            const finish = function() {
                newLink.media = link.getAttribute('media') || 'all';
                newLink.removeEventListener('load', finish);
            };

            newLink.addEventListener('load', finish);

            link.parentNode.insertBefore(newLink, link.nextSibling || link);
        }
    }

    run();

    if (doc.readyState !== 'complete') {
        const timer = w.setInterval(run, 300);

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

export default polyfill;
