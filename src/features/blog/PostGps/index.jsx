import React from 'react';
import { Script } from 'pequeno';
import styled from 'styled-components';
import Container from '../../../components/layout/Container';
import { device } from '../../../theme';
import client from './index.client';

const MapContainer = styled.div`
    height: 50vmax;
    width: 100vw;
    background: var(--color-background-light);
`;

const MapInfos = styled.div`
    margin-top: calc(var(--space-unit) * 2);
    display: flex;
    > * + * {
        margin-left: calc(var(--space-unit) * 4);
    }
`;

const InfoBox = styled.dl`
    dt {
        font-stretch: var(--headings-font-stretch);
        color: var(--color-text-light-accent);
        @media ${device.desktop} {
            font-size: var(--font-size-medium);
        }
    }
    dd {
        margin: 0;
        font-size: var(--font-size-large);
        @media ${device.desktop} {
            font-size: var(--font-size-x-large);
        }
        span {
            color: var(--color-text-light-accent);
            font-weight: 900;
        }
    }
`;

const Chart = styled.div``;

export default function PostGps({ gps }) {
    return (
        <>
            <MapContainer id="map" data-gpx={gps.gpx} />
            <Container>
                <MapInfos>
                    <InfoBox>
                        <dt>Dislivello</dt>
                        <dd aria-live="polite">
                            <span id="js-postGps-dislivello">0</span>m
                        </dd>
                    </InfoBox>
                    <InfoBox>
                        <dt>Distanza</dt>
                        <dd aria-live="polite">
                            <span id="js-postGps-distanza">0</span>km
                        </dd>
                    </InfoBox>
                </MapInfos>
                <Chart>
                    <canvas id="postChart"></canvas>
                </Chart>
            </Container>
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
                    {
                        where: 'body',
                        tag: '<script src="/libs/chart.js"></script>',
                    },
                ]}
            >
                {client}
            </Script>
        </>
    );
}
