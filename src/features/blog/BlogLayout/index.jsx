import React from 'react';
import styled from 'styled-components';
import { device, hideScrollbar } from '../../../theme';

const Wrapper = styled.div`
    @media ${device.desktop} {
        display: grid;
        grid-template-columns: 40vw 60vw;
        grid-template-rows: var(--blog-tabs-height) var(--blog-search-height) calc(
                100vh - var(--header-height) - var(--blog-tabs-height) -
                    var(--blog-search-height)
            );
        grid-template-areas:
            'topBar topBar'
            'content search'
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
    @media ${device.desktop} {
        padding: calc(var(--space-unit) * 3) var(--space-unit);
    }
    @media ${device.mobileAndTablet} {
        padding: var(--space-unit);
    }
`;

const Search = styled.aside`
    @media ${device.desktop} {
        grid-area: search;
        padding-right: var(--space-unit);
    }
    @media ${device.mobileAndTablet} {
        order: 2;
        height: var(--blog-search-height);
        padding: 0 var(--space-unit);
    }
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

export default function BlogLayout({ topBar, content, search, map }) {
    return (
        <Wrapper>
            <TopBar>{topBar}</TopBar>
            <Content>
                <ContentWrapper>{content}</ContentWrapper>
            </Content>
            <Search>{search}</Search>
            <Map>{map}</Map>
        </Wrapper>
    );
}
