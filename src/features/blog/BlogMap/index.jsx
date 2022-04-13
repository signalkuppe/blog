import React from 'react';
import styled from 'styled-components';
import { Script } from 'pequeno';
import client from './index.client';
import MapStyles from './MapStyles';

const MapContainer = styled.figure`
    height: 100%;
    width: 100%;
    background: var(--color-background-light);
`;

export default function BlogMap({ category }) {
    /** https://web.dev/defer-non-critical-css/ */
    return (
        <>
            <MapStyles />
            <MapContainer id="js-map" data-category={category || ''} />
            <Script
                libs={[
                    {
                        where: 'head',
                        tag: `
                        <link rel="preload" as="style" media="screen" href="/libs/leaflet.css" />
                        <noscript><link rel="stylesheet" href="/libs/leaflet.css" /></noscript>
                        `,
                    },
                    {
                        where: 'head',
                        tag: `
                        <link rel="preload" as="style" media="screen" href="/libs/leaflet-fullscreen.css"/>
                        <noscript><link rel="stylesheet" href="/libs/leaflet-fullscreen.css" /></noscript>`,
                    },
                    {
                        where: 'head',
                        tag: `
                        <link rel="preload" as="style" media="screen" href="/libs/leaflet-gesture-handling.css" />
                        <noscript><link rel="stylesheet" href="/libs/leaflet-gesture-handling.css" /></noscript>
                        `,
                    },
                    {
                        where: 'body',
                        tag: '<script defer src="/libs/leaflet.js"></script>',
                    },
                    {
                        where: 'body',
                        tag: '<script defer src="/libs/leaflet-fullscreen.js"></script>',
                    },
                    {
                        where: 'body',
                        tag: '<script defer src="/libs/leaflet-gesture-handling.js"></script>',
                    },
                ]}
            >
                {client}
            </Script>
        </>
    );
}
