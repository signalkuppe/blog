import React from 'react';
import styled, { keyframes } from 'styled-components';
import { device, hideScrollbar } from '../../../theme';

const Wrapper = styled.div`
    @media ${device.desktop} {
        display: grid;
        grid-template-columns: 40vw 60vw;
        grid-template-rows: var(--blog-tabs-height) calc(
                100vh - var(--header-height) - var(--blog-tabs-height)
            );
        grid-template-areas:
            'topBar topBar'
            'content map';
    }
    @media ${device.mobileAndTablet} {
        display: flex;
        flex-direction: column;
    }
`;
const TopBar = styled.nav`
    @media ${device.desktop} {
        grid-area: topBar;
    }
    @media ${device.mobileAndTablet} {
        order: 1;
        height: var(--blog-tabs-height);
    }
`;
const Content = styled.section`
    @media ${device.desktop} {
        grid-area: content;
        overflow: auto;
        max-height: 100%;
        ${hideScrollbar};
    }
    @media ${device.mobileAndTablet} {
        order: 3;
    }
`;

const ContentWrapper = styled.div`
    padding: calc(var(--space-unit) * 1.5) var(--space-unit);
`;

const Map = styled.aside`
    @media ${device.desktop} {
        grid-area: map;
        max-height: 100%;
        overflow: hidden;
    }
    @media ${device.mobileAndTablet} {
        order: 4;
        height: 500px;
        margin-top: calc(var(--space-unit) * 2);
    }
`;

const fabAnimation = keyframes`
    0% {
        transform: translateY(calc(100% + var(--space-unit) * 1.5))
    }
    100% {
        transform: translateY(0%);
    }
`;

const Fab = styled.div`
    position: fixed;
    z-index: calc(var(--z-index-map) + 1);
    @media ${device.desktop} {
        left: calc(40vw - calc(var(--space-unit) * 4));
        bottom: calc(var(--space-unit) * 1.5);
    }
    @media ${device.mobileAndTablet} {
        right: calc(var(--space-unit) * 1);
        bottom: calc(var(--space-unit) * 1);
    }
    @media ${device.noReduceMotion} {
        animation-name: ${fabAnimation};
        animation-duration: 0.3s;
        animation-delay: 1s;
        animation-fill-mode: backwards;
    }
`;

export default function BlogLayout({ topBar, content, map, fab }) {
    return (
        <Wrapper>
            <TopBar>{topBar}</TopBar>
            <Content>
                <ContentWrapper>{content}</ContentWrapper>
            </Content>
            <Map>{map}</Map>
            <Fab>{fab}</Fab>
        </Wrapper>
    );
}
