import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import htmlPlugin from './vite-plugin-html'; // to modify index.html at build time, copied from here https://github.com/ahwgs/vite-plugin-html-config nad modified
import vars from '../../vars';

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
    style: `body { color: var(--color-background); };`,
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
        emptyOutDir: true,
    },
});
