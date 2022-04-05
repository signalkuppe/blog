import React from 'react';
import { Script } from 'pequeno';
import styled, { css } from 'styled-components';
import { imagesStyles, device } from '../../../theme';
import vars from '../../../vars';
import Head from '../../../components/common/Head';
import GlobalStyles from '../../../theme/globalStyles';
import PrintStyles from '../../../theme/printStyles';
import Icon from '../../../components/ui/Icon';
import Loader from '../../../components/ui/Loader';
import LeftIcon from '../../../public/icons/ChevronLeft.svg';
import RightIcon from '../../../public/icons/ChevronRight.svg';
import DownloadIcon from '../../../public/icons/DownloadFile.svg';
import CloseIcon from '../../../public/icons/Cross.svg';
import client from './index.client';

const overlay = css`
    background: var(--color-lightbox-overlay);
    color: var(--color-lightbox-color);
`;

const overlayCommonStyles = css`
    position: absolute;
    z-index: 2;
    width: 100%;
`;

const navLinksCommonStyles = css`
    width: 2.5em;
    height: 2.5em;
    display: grid;
    place-items: center;
    ${overlay}
    :hover {
        background-color: var(--color-button-background);
        color: var(--color-button-color);
    }
`;

const ImageContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    background: var(--color-lightbox-background);
    touch-action: pan-x pinch-zoom;
    &.js-is-ready {
        opacity: 1;
    }
`;

const StyledLoader = styled(Loader)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
`;

const StyledImage = styled.img`
    ${imagesStyles}
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
`;

const ImageHeader = styled.header`
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    ${overlayCommonStyles}
    padding: 1em var(--space-unit);
`;

const ImageFooter = styled.figcaption`
    font-family: var(--font-family-cursive);
    color: var(--color-lightbox-color);
    bottom: 0;
    left: 0;
    text-align: center;
    ${overlayCommonStyles}
    ${overlay}
    padding: 0.5em var(--space-unit);
    @media ${device.desktop} {
        font-size: var(--font-size-large);
    }
`;

const ImageNavigation = styled.nav``;

const PrevLink = styled.a`
    left: 0;
    top: 50%;
    transform: translate(0%, -50%);
    ${navLinksCommonStyles}
    position: absolute;
    z-index: 2;
`;
const NextLink = styled.a`
    right: 0;
    top: 50%;
    transform: translate(0%, -50%);
    position: absolute;
    ${navLinksCommonStyles}
    z-index: 2;
`;

const HeaderLink = styled.a`
    ${navLinksCommonStyles}
`;

export default function PhotoPage({ photo, pagination, backTo }) {
    let title = photo.title;
    let description = photo.alt || photo.title + ', ' + photo.title;
    const enlargmentSmall = `${photo.src}?w=1024&fm=webp&q=80`;
    const enlargmentMedium = `${photo.src}?w=1920&fm=webp&q=80`;
    const enlargmentLarge = `${photo.src}?w=3000&fm=webp&q=80`;

    return (
        <html lang="it">
            <Head
                title={title}
                slogan={vars.siteName}
                description={description}
                extraLinks={
                    <link
                        rel="preconnect"
                        href="https://assets.ctfassets.net"
                        crossOrigin="true"
                    />
                }
            />
            <body>
                <GlobalStyles />
                <PrintStyles />
                <ImageContainer
                    id="js-foto"
                    data-prev={pagination.prev}
                    data-next={pagination.next}
                >
                    <StyledLoader />
                    <ImageHeader>
                        <HeaderLink
                            href={photo.src}
                            title="Scarica la foto in formato originale"
                            download
                        >
                            <Icon icon={DownloadIcon} />
                        </HeaderLink>
                        <HeaderLink href={backTo} title="Torna al post">
                            <Icon icon={CloseIcon} l />
                        </HeaderLink>
                    </ImageHeader>
                    <figure>
                        <picture>
                            <source
                                media="(min-width: 1680px)"
                                srcSet={enlargmentLarge}
                            />
                            <source
                                media="(min-width: 1024px)"
                                srcSet={enlargmentMedium}
                            />
                            <StyledImage
                                src={enlargmentSmall}
                                alt={photo.alt || photo.title}
                                height={photo.height}
                                width={photo.width}
                            />
                        </picture>
                        <ImageFooter>
                            <h1>{photo.title}</h1>
                        </ImageFooter>
                    </figure>
                    <ImageNavigation>
                        <ul>
                            {pagination.prev && (
                                <li>
                                    <PrevLink
                                        href={pagination.prev}
                                        title={pagination.prev.title}
                                    >
                                        <Icon icon={LeftIcon} />
                                    </PrevLink>
                                </li>
                            )}
                            {pagination.next && (
                                <li>
                                    <NextLink
                                        href={pagination.next}
                                        title={pagination.next.title}
                                    >
                                        <Icon icon={RightIcon} />
                                    </NextLink>
                                </li>
                            )}
                        </ul>
                    </ImageNavigation>
                </ImageContainer>
            </body>
            <Script
                libs={[
                    {
                        where: 'body',
                        tag: '<script src="/js/utils.js" />',
                    },
                ]}
            >
                {client}
            </Script>
        </html>
    );
}
