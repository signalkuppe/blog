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
    transition: opacity 0.2s cubic-bezier(0.39, 0.575, 0.565, 1);
    opacity: 0;
`;

const Content = styled.div``;

export default function BlogLayout({ hero, content }) {
    return (
        <>
            <Wrapper>
                <Hero id="js-postLayout-hero">{hero}</Hero>
                <Content>{content}</Content>
            </Wrapper>
            <Script>{client}</Script>
        </>
    );
}
