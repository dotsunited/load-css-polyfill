import buble from 'rollup-plugin-buble';
import pkg from './package.json';

const banner =
    '/*! load-css-polyfill v' + pkg.version +
    ' - Copyright ' + new Date().getFullYear() + ' ' + pkg.author + ' - Licensed ' + pkg.license + ' */'
;

export default [
    {
        banner: banner,
        input: 'src/index.js',
        output: {
            format: 'umd',
            file: 'dist/load-css-polyfill.js',
            name: 'loadCSSPolyfill'
        },
        plugins: [
            buble({
                exclude: ['node_modules/**']
            })
        ]
    },
    {
        banner: banner,
        input: 'src/index.js',
        output: {
            format: 'es',
            file: 'dist/load-css-polyfill.mjs'
        },
        plugins: [
            buble({
                exclude: ['node_modules/**']
            })
        ]
    }
];
