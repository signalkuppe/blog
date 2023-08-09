import React from 'react';
import styled from 'styled-components';
import { Script } from 'pequeno';
import Loader from '../../../components/ui/Loader';
import client from './index.client';
import MapStyles from './MapStyles';

export default function BlogMap({ category }) {
    return (
        <>
            <MapStyles />
            <MapContainer id="js-map" data-category={category || ''}>
                <LoaderIndicator id="js-map-loader" aria-hidden="true">
                    <Loader>Carico la mappa</Loader>
                </LoaderIndicator>
            </MapContainer>
            <Script
                libs={[
                    {
                        where: 'head',
                        tag: '<link rel="stylesheet" media="screen" href="/libs/leaflet.css" />',
                    },
                    {
                        where: 'head',
                        tag: '<link rel="stylesheet" media="screen" href="/libs/leaflet-fullscreen.css" />',
                    },
                    {
                        where: 'body',
                        tag: '<script defer src="/libs/leaflet.js"></script>',
                    },
                    {
                        where: 'body',
                        tag: '<script defer src="/libs/leaflet-fullscreen.js"></script>',
                    },
                ]}
            >
                {client}
            </Script>
        </>
    );
}

const MapContainer = styled.figure`
    height: 100%;
    width: 100%;
    background: var(--color-background-light);
    position: relative;
`;

const LoaderIndicator = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    text-align: center;
`;
