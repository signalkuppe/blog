import React from 'react';
import styled from 'styled-components';
import { device } from '../../../theme';
import PhotoGallery from '../../../components/ui/PhotoGallery';
import List from '../../../components/ui/List';

const StyledList = styled(List)`
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
`;

const Photo = styled.li`
    display: inline-block;
    column-break-inside: avoid;
    margin-bottom: 2em;
    background: var(--color-background-light);
`;
const PhotoCaption = styled.div`
    padding: 1em 1em;
`;
const PhotoTitle = styled.h2`
    display: block;
    font-size: var(--font-size-medium);
    color: var(--color-text-light-accent);
    margin: 0;
`;
const PhotoDate = styled.time`
    display: block;
    text-transform: uppercase;
    font-size: var(--font-size-x-small);
    font-stretch: 50%;
    font-weight: 500;
`;

export default function PortfolioPhotos({ photos }) {
    const images = photos.map((photo) => ({
        ...photo.image,
        // extra item at the bottom of each image
        children: (
            <PhotoCaption>
                <PhotoDate dateTime={photo.dateTime}>{photo.date}</PhotoDate>
                <PhotoTitle>{photo.image.title}</PhotoTitle>
            </PhotoCaption>
        ),
    }));
    return (
        <PhotoGallery
            photos={images}
            WrapperElement={StyledList}
            ItemElement={Photo}
            thumbFormat={{ width: 1024, height: '' }}
        />
    );
}
