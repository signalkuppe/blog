import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import htmlPlugin from '../../../lib/vite-plugin-html'; // to modify index.html at build time, copied from here https://github.com/ahwgs/vite-plugin-html-config nad modified
import vars from '../../vars';
import { vars as cssVars } from '../../theme/index';

// add meta tag to index.html at build time
const htmlPluginOpt = {
    metas: [
        {
            name: 'description',
            content:
                'Dati meteo in diretta e webcam da Concenedo (Barzio) in Valsassina',
        },
    ],
    title: `Meteo Concenedo | ${vars.siteName}`,
    style: `body { background: ${cssVars['--color-background']} }`,
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svgr({ exportAsDefault: true }),
        react(),
        htmlPlugin(htmlPluginOpt),
    ],
    build: {
        outDir: '../../../.site/meteo-concenedo',
        assetsDir: 'meteo-assets',
        emptyOutDir: true,
    },
    publicDir: '../../../.src/public',
    base: '/meteo-concenedo',
});
