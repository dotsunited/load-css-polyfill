load-css-polyfill
==

A simple polyfill for asynchronously loading non-critical CSS using
[`link[rel=preload][as=style]`](https://w3c.github.io/preload/).

Introduction
--

Non-critical CSS can be loaded asynchronously by using 
`<link rel="preload" as="style">` with a `onload` handler that switches
`rel="preload"` to `rel="stylesheet"` once the file is loaded.

```html
<link rel="preload" href="style.css" as="style" onload="this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="style.css"></noscript>
```

This package provides a polyfill for browsers which don't 
[support](https://caniuse.com/#feat=link-rel-preload) `link[rel=preload]` yet.

Installation
--

### npm

```bash
$ npm install @dotsunited/load-css-polyfill --save
```

### Yarn

```bash
$ yarn add @dotsunited/load-css-polyfill
```

Usage
--

Import the package and invoke the `polyfill()`function.

```js
import polyfill from '@dotsunited/load-css-polyfill';

polyfill();
```

> Please note, that you should inline the script in your `<head>`.

Credits
--

This package is based on the technique 
[developed](https://github.com/filamentgroup/loadCSS/issues/59) by 
[Scott Jehl](https://github.com/scottjehl) as part of the 
[loadCSS](https://github.com/filamentgroup/loadCSS) library.

License
--

Released under the [MIT](LICENSE) license.
