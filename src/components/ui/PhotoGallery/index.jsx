import React from 'react';
import styled from 'styled-components';
import { Script } from 'pequeno';
import Image from '../../../components/ui/Image';
import client from './index.client';
import GalleryPluginStyleOverrides from './GalleryPluginStyleOverrides';

const DefaultWrapperElement = styled.ul``;
const DefaultItemElement = styled.li``;
const StyledImage = styled(Image)`
    background: var(--color-background-light);
`;

const StyledLink = styled.a`
    display: block;
`;

const StyledPictureContainer = styled.div`
    position: relative;
    ::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 6px;
        width: 100%;
        background: transparent;
    }
    a &:hover::after {
        background: var(--color-primary);
    }
`;

/**
 * Library css overrides
 */

export default function PostGallery({
    photos, // array of photos { src, alt, title, ...props}
    thumbFormat,
    enlargmentSmallFormat,
    enlargmentMediumFormat,
    enlargmentLargeFormat,
    WrapperElement, // styled component
    ItemElement, // styled component
}) {
    const baseThumbFormat = {
        width: 300,
        height: 300,
        fit: 'thumb',
        quality: 80,
    };

    thumbFormat = { ...baseThumbFormat, ...thumbFormat };

    const baseEnlargmentSmallFormat = {
        width: 1024,
        height: '',
        fit: '',
        quality: 100,
    };

    enlargmentSmallFormat = {
        ...baseEnlargmentSmallFormat,
        ...enlargmentSmallFormat,
    };

    const baseEnlargmentMediumFormat = {
        width: 1920,
        height: '',
        fit: '',
        quality: 100,
    };

    enlargmentMediumFormat = {
        ...baseEnlargmentMediumFormat,
        ...enlargmentMediumFormat,
    };

    const baseEnlargmentLargeFormat = {
        width: 3000,
        height: '',
        fit: '',
        quality: 100,
    };

    enlargmentLargeFormat = {
        ...baseEnlargmentLargeFormat,
        ...enlargmentLargeFormat,
    };

    WrapperElement = WrapperElement || DefaultWrapperElement;
    ItemElement = ItemElement || DefaultItemElement;

    const imgThumbUrl = function (src, format) {
        return `${src}?w=${thumbFormat.width}&h=${thumbFormat.height}&fm=${format}&fit=${thumbFormat.fit}&q=${thumbFormat.quality}`;
    };
    // TO DO: use webp, when the plugin will support responsive image natively
    // we set sizes from js
    const enlargmentSmall = function (src) {
        return `${src}?w=${enlargmentSmallFormat.width}&h=${enlargmentSmallFormat.height}&fm=jpg&q=${enlargmentSmallFormat.quality}&fl=progressive`;
    };
    const enlargmentMedium = function (src) {
        return `${src}?w=${enlargmentMediumFormat.width}&h=${enlargmentMediumFormat.height}&fm=jpg&q=${enlargmentMediumFormat.quality}&fl=progressive`;
    };
    const enlargmentLarge = function (src) {
        return `${src}?w=${enlargmentLargeFormat.width}&h=${enlargmentLargeFormat.height}&fm=jpg&q=${enlargmentLargeFormat.quality}&fl=progressive`;
    };

    const PhotoUrls = photos.map((img) => img.src);

    return (
        <>
            <GalleryPluginStyleOverrides />
            <WrapperElement
                id="js-postGallery"
                data-images={JSON.stringify(PhotoUrls)} // list of download links (used in js)
            >
                {photos.map((photo, i) => (
                    <ItemElement key={i}>
                        <StyledLink
                            href={photo.src}
                            title={photo.title}
                            data-type="image"
                            data-href-small={enlargmentSmall(photo.src)}
                            data-href-medium={enlargmentMedium(photo.src)}
                            data-href-large={enlargmentLarge(photo.src)}
                            className="js-galleryItem"
                            data-gallery="gallery1"
                            data-glightbox={`title: ${photo.title}`}
                        >
                            <StyledPictureContainer>
                                <picture>
                                    <source
                                        srcSet={imgThumbUrl(photo.src, 'webp')}
                                        type="image/webp"
                                    />
                                    <source
                                        srcSet={imgThumbUrl(photo.src, 'jpg')}
                                        type="image/jpeg"
                                    />
                                    <StyledImage
                                        src={imgThumbUrl(photo.src, 'jpg')}
                                        alt={photo.alt}
                                        width={photo.width}
                                        height={photo.height}
                                        loading="lazy"
                                    />
                                </picture>
                            </StyledPictureContainer>
                            {photo.children} {/* extra slot for each photo */}
                        </StyledLink>
                    </ItemElement>
                ))}
            </WrapperElement>
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
        </>
    );
}
