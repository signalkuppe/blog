import React from 'react';
import styled from 'styled-components';
import { Script } from 'pequeno';
import client from './index.client';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Hero = styled.div`
    height: calc(100vh - var(--header-height));
`;

const Content = styled.div``;

export default function BlogLayout({ hero, content }) {
    return (
        <>
            <Wrapper>
                <Hero id="js-postLayout-hero">{hero}</Hero>
                <Content>{content}</Content>
            </Wrapper>
            <Script
                libs={[
                    {
                        where: 'body',
                        tag: '<script src="/js/utils.js" />',
                    },
                ]}
            >
                {client}
            </Script>
        </>
    );
}
