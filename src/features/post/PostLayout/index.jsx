import React from 'react';
import styled from 'styled-components';
import { Script } from 'pequeno';
import client from './index.client';

const Wrapper = styled.article`
    display: flex;
    flex-direction: column;
`;

const Hero = styled.header`
    height: calc(100vh - var(--header-height));
    /* stylelint-disable */
    @supports (height: 100svh) {
        height: calc(100svh - var(--header-height));
    }
    @supports not (height: 100svh) {
        opacity: 0;
    }
`;

const Content = styled.div``;

export default function BlogLayout({ hero, content }) {
    return (
        <>
            <Wrapper>
                <Hero id="js-postLayout-hero" className="print-post-hero">
                    {hero}
                </Hero>
                <Content>{content}</Content>
                <Script>{client}</Script>
            </Wrapper>
        </>
    );
}
