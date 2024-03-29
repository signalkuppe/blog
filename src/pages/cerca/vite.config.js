import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import htmlPlugin from '../../../lib/vite-plugin-html'; // to modify index.html at build time, copied from here https://github.com/ahwgs/vite-plugin-html-config nad modified
import vars from '../../vars';
import { vars as cssVars } from '../../theme/index';

// add meta tag to index.html at build time
const htmlPluginOpt = {
    favicon: '/img/favicons/favicon.ico',
    metas: [
        {
            name: 'description',
            content: 'Cerca in tutte le relazioni pubblicate',
        },
    ],
    title: `Cerca una relazione | ${vars.siteName}`,
    style: `body { background: ${cssVars['--color-background']} };`,
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        svgr({ exportAsDefault: true }),
        react(),
        htmlPlugin(htmlPluginOpt),
    ],
    build: {
        outDir: '../../../.site/cerca',
        assetsDir: 'cerca-assets',
        emptyOutDir: true,
    },
    publicDir: '../../../.src/public',
    base: '/cerca',
});
