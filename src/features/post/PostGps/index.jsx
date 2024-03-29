import React from 'react';
import { Script } from 'pequeno';
import styled from 'styled-components';
import Container from '../../../components/layout/Container';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/ui/Icon';
import Loader from '../../../components/ui/Loader';
import DownloadIcon from '../../../public/icons/DownloadFile.svg';
import LoadingIcon from '../../../public/icons/Loading.svg';
import { device, headingsStyles } from '../../../theme';
import client from './index.client';

export default function PostGps({ post }) {
    const { gps } = post;
    return (
        <>
            <MapContainer
                id="js-map"
                data-gpx={gps.gpx}
                data-elevation-gain={gps.correctedElevationGain}
                data-distance={gps.correctedDistance}
                data-minimum-altitude={gps.correctedMinimumAltitude}
                data-maximum-altitude={gps.correctedMaximumAltitude}
            >
                <LoaderIndicator id="js-map-loader" aria-hidden="true">
                    <Loader>Carico la mappa</Loader>
                </LoaderIndicator>
            </MapContainer>
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
                                data-slug={post.slug}
                                as="a"
                                className="js-gps-download js-gps-download-gpx"
                            >
                                <Icon
                                    icon={DownloadIcon}
                                    left
                                    className="js-download-icon"
                                />
                                <Icon
                                    icon={LoadingIcon}
                                    left
                                    className="js-loading-icon"
                                    style={{ display: 'none' }}
                                />
                                Traccia .gpx
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
                        tag: '<script src="/libs/chart.js"></script>',
                    },
                    {
                        where: 'body',
                        tag: '<script src="/libs/jszip.js"></script>',
                    },
                ]}
            >
                {client}
            </Script>
        </>
    );
}

const MapContainer = styled.div`
    height: 50vmax;
    width: 100vw;
    background: var(--color-background-light);
    position: relative;
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
        font-weight: 700;
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
            ${headingsStyles};
            color: var(--color-text-light-accent);
            letter-spacing: var(--text-letter-spacing);
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

const LoaderIndicator = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;
