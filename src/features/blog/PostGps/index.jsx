import React from 'react';
import { Script } from 'pequeno';
import styled from 'styled-components';
import { device } from '../../../theme';
import client from './index.client';

const MapContainer = styled.div`
    height: 500px;
    width: 500px;
    background: #eee;
`;

export default function PostGps({ gps }) {
    return (
        <>
            <MapContainer id="map" data-gpx={gps.gpx} />
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
                        tag: '<script src="/libs/leaflet-gpx.js"></script>',
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
