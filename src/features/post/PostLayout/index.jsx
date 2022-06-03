import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.article`
    display: flex;
    flex-direction: column;
`;

const Hero = styled.header`
    height: calc(100vh - var(--header-height));
    @supports (height: 100svh) {
        height: calc(100svh - var(--header-height));
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
            </Wrapper>
        </>
    );
}
