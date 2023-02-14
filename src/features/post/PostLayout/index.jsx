import React from 'react';
import styled from 'styled-components';
import { Script } from 'pequeno';
import { device } from '../../../theme';
import UpIcon from '../../../public/icons/Up.svg';
import Fab from '../../../components/ui/Fab';
import Icon from '../../../components/ui/Icon';
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

const ToTop = styled.div`
    position: fixed;
    z-index: calc(var(--z-index-post-menu) + 1);
    opacity: 0;
    &.js-is-visible {
        opacity: 1;
    }
    transition: opacity 0.5s ease-in-out;
    @media ${device.mobileAndTablet} {
        right: calc(var(--space-unit) * 1.5);
        bottom: calc(var(--space-unit) * 3);
    }
    @media ${device.desktop} {
        left: calc(var(--space-unit) * 1.5);
        bottom: calc(var(--space-unit) * 1.5);
    }
`;

export default function PostLayout({ hero, content }) {
    return (
        <>
            <Wrapper>
                <Hero id="js-postLayout-hero" className="print-post-hero">
                    {hero}
                </Hero>
                <Content>{content}</Content>
                <ToTop id="js-postlayout-goToTop">
                    <Fab
                        as="a"
                        href="#top"
                        title="Torna in cima"
                        aria-label="Torna in cima"
                        s
                    >
                        <Icon icon={UpIcon} />
                    </Fab>
                </ToTop>
                <Script>{client}</Script>
            </Wrapper>
        </>
    );
}
