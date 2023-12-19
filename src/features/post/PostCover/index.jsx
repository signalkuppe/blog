import React from 'react';
import { Script } from 'pequeno';
import styled from 'styled-components';
import { device, headingsStyles } from '../../../theme';
import Loader from '../../../components/ui/Loader';
import client from './index.client';

export default function PostCover({ cover }) {
    const { alt, title, src } = cover;
    const imgUrl = function (width, format) {
        return `${src}?w=${width}&h=${Math.round(
            width / 1.5,
        )}&fm=${format}&fit=thumb&q=70`;
    };
    return (
        <>
            <StyledFigure id="js-postCover" className="print-post-cover">
                <StyledFigcaption id="js-postCover-caption">
                    {title}
                </StyledFigcaption>
                <picture>
                    <source
                        type="image/webp"
                        srcSet={`
                     ${imgUrl(600, 'webp')} 600w,
                     ${imgUrl(1600, 'webp')} 1600w,
                     ${imgUrl(3000, 'webp')} 3000w
                    `}
                        sizes="100vw"
                    />
                    <img
                        srcSet={`
                      ${imgUrl(600, 'webp')}  600w,
                      ${imgUrl(1600, 'webp')} 1600w,
                       ${imgUrl(3500, 'webp')} 3000w
                    `}
                        sizes="
                      (max-width: 768px) 100vw,
                      (max-width: 1387px) 100vw,
                      (min-width: 1388px) 100vw"
                        src={src}
                        alt={alt}
                        loading="lazy"
                        width="1600"
                        height="1066"
                        id="js-postCover-img"
                    />
                </picture>
                <LoaderIndicator id="js-postCover-loader" aria-hidden="true">
                    <Loader>Carico la foto</Loader>
                </LoaderIndicator>
            </StyledFigure>
            <Script>{client}</Script>
        </>
    );
}

const StyledFigure = styled.figure`
    margin: 0;
    position: relative;
    background: var(--color-background-light);
    aspect-ratio: 3/2;
    overflow: hidden;
    img {
        width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
        position: relative;
        @media ${device.noReduceMotion} {
            transition: opacity 0.3s linear;
        }
    }
    &.js-is-loaded::after {
        position: absolute;
        right: 0;
        bottom: 0;
        content: '';
        display: block;
        width: 100vw;
        height: 100%;
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 70%,
            rgba(0, 0, 0, 0.85) 100%
        );
        z-index: var(--z-index-post-cover);
    }
`;

const StyledFigcaption = styled.figcaption`
    ${headingsStyles};
    font-style: normal;
    font-size: clamp(
        var(--font-size-base),
        2.5vmax,
        var(--font-size-xxx-large)
    );
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 1.5vmax var(--space-unit);
    z-index: var(--z-index-post-cover-caption);
    will-change: transform;
    transform: translateX(100%);
    &.js-is-loaded {
        @media ${device.noReduceMotion} {
            transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        transform: translateX(0%);
    }
`;

const LoaderIndicator = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: none;
    text-align: center;
`;
