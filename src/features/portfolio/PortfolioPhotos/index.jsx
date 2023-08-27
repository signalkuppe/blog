import React from 'react';
import styled from 'styled-components';
import { device, headingsStyles, imagesStyles } from '../../../theme';
import { portfolioPhotoLink } from '../../../pages/portfolio-photo';

export default function PortfolioPhotos({ photos }) {
    return (
        <StyledList>
            {photos.map((photo, i) => {
                const enlargmentSmall = `${photo.src}?w=640&fm=webp&q=80`;
                const enlargmentLarge = `${photo.src}?w=1024&fm=webp&q=80`;
                return (
                    <Photo key={i}>
                        <a href={portfolioPhotoLink(photo)} title={photo.title}>
                            <picture>
                                <source
                                    media="(min-width: 1680px)"
                                    srcSet={enlargmentLarge}
                                />
                                <StyledImage
                                    src={enlargmentSmall}
                                    alt={photo.alt || photo.title}
                                    height={photo.height}
                                    width={photo.width}
                                />
                            </picture>
                            <PhotoCaption>
                                <PhotoDate dateTime={photo.dateTime}>
                                    {photo.date}
                                </PhotoDate>
                                <PhotoTitle>{photo.title}</PhotoTitle>
                            </PhotoCaption>
                        </a>
                    </Photo>
                );
            })}
        </StyledList>
    );
}

const StyledList = styled.ul`
    @media ${device.onlyTablet} {
        columns: 2;
        column-gap: 2em;
    }
    @media ${device.desktop} {
        columns: 3;
        column-gap: 2em;
    }
    @media ${device.largeDesktop} {
        columns: 4;
        column-gap: 2em;
    }
    margin-top: -2em;
`;

const Photo = styled.li`
    column-break-inside: avoid;
    display: block;
    transition: 0.2s ease-in-out;
    transition-property: transform, color;
    padding-top: 2em;
    :hover {
        transform: translateY(-0.25em);
    }
`;
const PhotoCaption = styled.div`
    padding: 1em 1em;
    background: var(--color-background-light);
`;
const PhotoTitle = styled.h2`
    ${headingsStyles};
    margin: 0;
    font-size: var(--font-size-base);
    @media ${device.largeDesktop} {
        font-size: var(--font-size-medium);
    }
`;
const PhotoDate = styled.time`
    display: block;
    text-transform: uppercase;
    color: var(--color-text);
    font-size: var(--font-size-x-small);
    font-weight: 500;
`;

const StyledImage = styled.img`
    ${imagesStyles};
`;
