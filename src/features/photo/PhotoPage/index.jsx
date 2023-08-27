import React from 'react';
import { Script } from 'pequeno';
import styled, { css } from 'styled-components';
import {
    imagesStyles,
    device,
    figCaptionStyles,
    visuallyHidden,
} from '../../../theme';
import vars from '../../../vars';
import Head from '../../../components/common/Head';
import Html from '../../../components/common/Html';
import Body from '../../../components/common/Body';
import CommonScripts from '../../../components/common/CommonScripts';
import CommonStyles from '../../../components/common/CommonStyles';
import Icon from '../../../components/ui/Icon';
import Loader from '../../../components/ui/Loader';
import LeftIcon from '../../../public/icons/ChevronLeft.svg';
import RightIcon from '../../../public/icons/ChevronRight.svg';
import DownloadIcon from '../../../public/icons/DownloadFile.svg';
import CloseIcon from '../../../public/icons/Cross.svg';
import client from './index.client';

export default function PhotoPage({ photo, pagination, backTo, backToText }) {
    let title = photo.title;
    let description = photo.alt || photo.title + ', ' + photo.title;
    const enlargmentSmall = `${photo.src}?w=1024&fm=webp&q=80`;
    const enlargmentMedium = `${photo.src}?w=1920&fm=webp&q=80`;
    const enlargmentLarge = `${photo.src}?w=3000&fm=webp&q=80`;
    const donwloadTitle = 'Scarica la foto in formato originale';

    return (
        <Html>
            <Head
                title={title}
                slogan={vars.siteName}
                description={description}
                extraLinks={
                    <link
                        rel="preconnect"
                        href="https://assets.ctfassets.net"
                        crossOrigin="anonymous"
                    />
                }
            />
            <Body>
                <CommonStyles />
                <ImageContainer
                    id="js-foto"
                    data-back={backTo}
                    data-prev={pagination.prev}
                    data-next={pagination.next}
                >
                    <StyledLoader />
                    <ImageHeader>
                        <HeaderLink
                            href={photo.src}
                            title={donwloadTitle}
                            aria-label={donwloadTitle}
                            download
                        >
                            <Icon icon={DownloadIcon} />
                        </HeaderLink>
                        <HeaderLink
                            href={backTo}
                            title={backToText}
                            aria-label={backToText}
                        >
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
                        <ImageFooter id="js-foto-caption">
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
                                        <NavLinkText>
                                            Foto procedente
                                        </NavLinkText>
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
                                        <NavLinkText>
                                            Foto successiva
                                        </NavLinkText>
                                    </NextLink>
                                </li>
                            )}
                        </ul>
                    </ImageNavigation>
                </ImageContainer>
            </Body>
            <CommonScripts />
            <Script
                libs={[
                    {
                        where: 'body',
                        tag: '<script src="/libs/hammer.js"></script>',
                    },
                ]}
            >
                {client}
            </Script>
        </Html>
    );
}

const overlay = css`
    background: var(--color-lightbox-overlay);
    color: var(--color-text-light-accent);
`;

const overlayCommonStyles = css`
    position: absolute;
    z-index: 3;
    width: 100%;
`;

const navLinksCommonStyles = css`
    width: 2.5em;
    height: 2.5em;
    display: grid;
    place-items: center;
    z-index: 3;
    ${overlay};
    :hover {
        background-color: var(--color-button-background);
        color: var(--color-button-color);
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    transition: opacity 0.3s ease-in-out;
    background: var(--color-lightbox-background);
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
    padding: 1em 0;
`;

const ImageFooter = styled.figcaption`
    ${figCaptionStyles};
    color: var(--color-text-light-accent);
    bottom: 0;
    left: 0;
    text-align: center;
    ${overlayCommonStyles}
    ${overlay}
    padding: 0.75em var(--space-unit);
    transform: translateY(100%);
    transition: transform 0.2s ease-in-out;
    @media ${device.desktop} {
        font-size: var(--font-size-medium);
    }
    @media ${device.largeDesktop} {
        font-size: var(--font-size-large);
    }
    &.js-is-hovering {
        transform: translateY(0%);
    }
`;

const ImageNavigation = styled.nav``;

const PrevLink = styled.a`
    left: 0;
    top: 50%;
    transform: translate(0%, -50%);
    ${navLinksCommonStyles}
    position: absolute;
`;
const NextLink = styled.a`
    right: 0;
    top: 50%;
    transform: translate(0%, -50%);
    position: absolute;
    ${navLinksCommonStyles}
`;

const HeaderLink = styled.a`
    ${navLinksCommonStyles}
`;

const NavLinkText = styled.span`
    ${visuallyHidden}
`;
