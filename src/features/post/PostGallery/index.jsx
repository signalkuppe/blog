import React from 'react';
import styled, { css } from 'styled-components';
import Container from '../../../components/layout/Container';
import PhotoGallery from '../../../components/ui/PhotoGallery';
import { device } from '../../../theme';

const Wrapper = styled.div`
    max-width: 70ch;
`;
const StyledList = styled.ul`
    display: grid;
    grid-gap: calc(var(--space-unit) / 1.5);
    grid-template-columns: repeat(auto-fit, 70px);
    @media ${device.desktop} {
        grid-template-columns: repeat(auto-fit, 120px);
    }
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
    img {
        ${squareStyle}// we need to override native image dimensions to force the square aspcet ratio
    }
`;

export default function PostGallery({ post }) {
    const { gallery } = post;
    return (
        <Container>
            <Wrapper>
                <PhotoGallery
                    photos={gallery}
                    WrapperElement={StyledList}
                    ItemElement={StyledListItem}
                />
            </Wrapper>
        </Container>
    );
}
