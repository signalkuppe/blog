import React from 'react';
import styled, { css } from 'styled-components';
import { device, imagesStyles } from '../../../theme';
import PhotoDisclaimer from '../../../components/common/PhotoDisclaimer';
import Container from '../../../components/layout/Container';
import { postPhotoLink } from '../../../pages/post-photo';

export default function PostGallery({ post }) {
    const { gallery } = post;
    return (
        <Container>
            <Wrapper>
                <StyledList>
                    {gallery.map((photo, i) => (
                        <StyledListItem key={i}>
                            <a href={postPhotoLink(photo)} title={photo.title}>
                                <StyledImage
                                    src={`${photo.src}?w=240&h=240&fm=webp&fit=thumb&q=50`}
                                    title={photo.title}
                                    alt={photo.alt || photo.title}
                                    loading="lazy"
                                />
                            </a>
                        </StyledListItem>
                    ))}
                </StyledList>
                <PhotoDisclaimer />
            </Wrapper>
        </Container>
    );
}

const Wrapper = styled.div`
    max-width: 65ch;
`;
const StyledList = styled.ul`
    display: grid;
    grid-gap: calc(var(--space-unit) / 1.5);
    grid-template-columns: repeat(auto-fit, 70px);
    @media ${device.desktop} {
        grid-template-columns: repeat(auto-fit, 120px);
    }
    margin-bottom: calc(var(--space-unit) * 2);
`;

const squareStyle = css`
    width: 70px;
    height: 70px;
    @media ${device.desktop} {
        width: 120px;
        height: 120px;
    }
`;

const StyledListItem = styled.li`
    ${squareStyle}
    transition: transform 0.2s ease-in-out;
    img {
        ${squareStyle}/* we need to override native image dimensions to force the square aspcet ratio */
    }
    :hover {
        transform: translateY(-0.15em);
    }
`;

const StyledImage = styled.img`
    ${imagesStyles}
`;
