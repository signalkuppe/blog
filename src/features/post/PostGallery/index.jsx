import React from 'react';
import styled from 'styled-components';
import { Script } from 'pequeno';
import Container from '../../../components/layout/Container';
import List from '../../../components/ui/List';
import Image from '../../../components/ui/Image';
import Link from '../../../components/ui/Link';
import { device } from '../../../theme';
import client from './index.client';
import GalleryPluginStyleOverrides from './GalleryPluginStyleOverrides';

const Wrapper = styled.section`
    max-width: 70ch;
`;
const StyledList = styled(List)`
    display: grid;
    grid-gap: calc(var(--space-unit) / 1.5);
    grid-template-columns: repeat(auto-fit, 70px);
    @media ${device.desktop} {
        grid-template-columns: repeat(auto-fit, 120px);
    }
`;

const StyledListItem = styled.li`
    background: var(--color-background-light);
    aspect-ratio: 1/1;
    width: 70px;
    height: 70px;
    @media ${device.desktop} {
        width: 120px;
        height: 120px;
    }
    a {
        img {
            border-bottom: 4px solid transparent;
        }
        :hover {
            img {
                transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
                border-bottom-color: var(--color-primary);
                transform: scale(1.05);
            }
        }
    }
`;

/**
 * Library css overrides
 */

export default function PostGallery({ post }) {
    const { gallery } = post;
    const imgThumbUrl = function (url, format) {
        return `${url}?w=300&h=300&fm=${format}&fit=thumb&q=80`;
    };
    // TO DO: use webp, when the plugin will support responsive image natively
    // we set sizes from js
    const enlargmentSmall = function (url) {
        return `${url}?w=1024&fm=jpg&q=80&fl=progressive`;
    };
    const enlargmentMedium = function (url) {
        return `${url}?w=1920&fm=jpg&q=80&fl=progressive`;
    };
    const enlargmentLarge = function (url) {
        return `${url}?w=3000&fm=jpg&q=80&fl=progressive`;
    };

    const gallerySrcs = gallery.map((img) => img.src);

    return (
        <Container as="section">
            <GalleryPluginStyleOverrides />
            <Wrapper>
                <StyledList
                    reset
                    id="js-postGallery"
                    data-images={JSON.stringify(gallerySrcs)} // list of download links (used in js)
                >
                    {gallery.map((item, i) => (
                        <StyledListItem key={i}>
                            <Link
                                href={item.src}
                                title={item.title}
                                inherit
                                data-type="image"
                                data-href-small={enlargmentSmall(item.src)}
                                data-href-medium={enlargmentMedium(item.src)}
                                data-href-large={enlargmentLarge(item.src)}
                                className="js-galleryItem"
                                data-gallery="gallery1"
                                data-glightbox={`title: ${item.title}`}
                            >
                                <picture>
                                    <source
                                        srcSet={imgThumbUrl(item.src, 'webp')}
                                        type="image/webp"
                                    />
                                    <source
                                        srcSet={imgThumbUrl(item.src, 'jpg')}
                                        type="image/jpeg"
                                    />
                                    <Image
                                        src={imgThumbUrl(item.src, 'jpg')}
                                        alt={item.alt}
                                        width={item.width}
                                        height={item.height}
                                        loading="lazy"
                                    />
                                </picture>
                            </Link>
                        </StyledListItem>
                    ))}
                </StyledList>
            </Wrapper>
            <Script
                libs={[
                    {
                        where: 'body',
                        tag: '<script src="/libs/glightbox.js" />',
                    },
                    {
                        where: 'head',
                        tag: '<link rel="stylesheet" href="/libs/glightbox.css" />',
                    },
                ]}
            >
                {client}
            </Script>
        </Container>
    );
}
