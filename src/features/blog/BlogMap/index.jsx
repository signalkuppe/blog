import React from 'react';
import styled from 'styled-components';
import { Script } from 'pequeno';
import client from './index.client';
import MapStyles from './MapStyles';

const MapContainer = styled.figure`
    height: 100%;
    width: 100%;
    background: var(--color-background-light);
    &.js-is-searching {
        filter: grayscale(1);
    }
`;

export default function BlogMap({ category }) {
    return (
        <>
            <MapStyles />
            <MapContainer id="js-map" data-category={category || ''} />
            <Script
                libs={[
                    {
                        where: 'head',
                        tag: '<link rel="stylesheet" href="/libs/leaflet.css" />',
                    },
                    {
                        where: 'head',
                        tag: '<link rel="stylesheet" href="/libs/leaflet-fullscreen.css" />',
                    },
                    {
                        where: 'head',
                        tag: '<link rel="stylesheet" href="/libs/leaflet-gesture-handling.css" />',
                    },
                    {
                        where: 'body',
                        tag: '<script src="/libs/leaflet.js"></script>',
                    },
                    {
                        where: 'body',
                        tag: '<script src="/libs/leaflet-fullscreen.js"></script>',
                    },
                    {
                        where: 'body',
                        tag: '<script src="/libs/leaflet-gesture-handling.js"></script>',
                    },
                ]}
            >
                {client}
            </Script>
        </>
    );
}