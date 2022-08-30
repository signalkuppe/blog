import React from 'react';
import { Script } from 'pequeno';
import styled from 'styled-components';
import Container from '../../../components/layout/Container';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/ui/Icon';
import DownloadIcon from '../../../public/icons/DownloadFile.svg';
import { device } from '../../../theme';
import client from './index.client';

const MapContainer = styled.div`
    height: 50vmax;
    width: 100vw;
    background: var(--color-background-light);
`;

const WidthWrapper = styled.div`
    max-width: var(--container-max-width);
`;

const MapInfos = styled.div`
    margin-top: calc(var(--space-unit) * 2);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    grid-gap: var(--space-unit);
`;

const InfoBox = styled.dl`
    dt {
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
            letter-spacing: var(--text-letter-spacing);
            font-weight: 900;
        }
    }
`;

const Chart = styled.figure`
    margin-top: calc(var(--space-unit) * 4);
    margin-bottom: calc(var(--space-unit) * 2);
    canvas {
        max-width: var(--container-max-width);
        width: 100%;
        height: auto;
        aspect-ratio: attr(width) / attr(height);
    }
`;

const Buttons = styled.footer`
    margin-top: calc(var(--space-unit) * 4);
    margin-bottom: calc(var(--space-unit) * 2);
    > * + * {
        margin-left: calc(var(--space-unit) / 2);
    }
`;

const Disclaimer = styled.p`
    font-size: var(--font-size-small);
    color: var(--color-text-dark-accent);
`;

export default function PostGps({ post }) {
    const { gps } = post;
    return (
        <>
            <MapContainer id="js-map" data-gpx={gps.gpx} />
            <Container>
                <WidthWrapper>
                    <MapInfos>
                        <InfoBox>
                            <dt>Quota minima</dt>
                            <dd aria-live="polite">
                                <span id="js-postGps-min">0</span>m
                            </dd>
                        </InfoBox>
                        <InfoBox>
                            <dt>Quota massima</dt>
                            <dd aria-live="polite">
                                <span id="js-postGps-max">0</span>m
                            </dd>
                        </InfoBox>
                        <InfoBox>
                            <dt>Dislivello</dt>
                            <dd aria-live="polite">
                                <span id="js-postGps-gain">0</span>m
                            </dd>
                        </InfoBox>
                        <InfoBox>
                            <dt>Distanza</dt>
                            <dd aria-live="polite">
                                <span id="js-postGps-distance">0</span>km
                            </dd>
                        </InfoBox>
                    </MapInfos>
                    <Chart>
                        <canvas id="postChart"></canvas>
                    </Chart>

                    <Buttons>
                        {gps.gpx && (
                            <Button
                                href={gps.gpx}
                                as="a"
                                className="js-gps-download"
                            >
                                <Icon icon={DownloadIcon} left l />
                                Traccia .gpx
                            </Button>
                        )}
                        {gps.kml && (
                            <Button
                                href={gps.kml}
                                as="a"
                                className="js-gps-download"
                            >
                                <Icon icon={DownloadIcon} left l />
                                Traccia .kml
                            </Button>
                        )}
                    </Buttons>

                    <Disclaimer>
                        NB: La rilevazione gps potrebbe non essere sempre
                        precisa e riportare valori errati
                    </Disclaimer>
                </WidthWrapper>
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
