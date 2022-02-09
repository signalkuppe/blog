import React from 'react';
import styled from 'styled-components';
import { findIndex } from 'lodash';
import { Script } from 'pequeno';
import { visuallyHidden, device } from '../../../theme';
import Icon from '../../ui/Icon';
import HamburgerIcon from '../../../public/icons/Hamburger.svg';
import CloseIcon from '../../../public/icons/Cross.svg';
import NavigationLinks from '../NavigationLinks';
import client from './index.client';

const StyledButton = styled.button`
    appearance: none;
    touch-action: manipulation;
    background: transparent;
    border: none;
    color: var(--color-text-accent);
    line-height: 1;
    padding: 0;
    display: block;
    cursor: pointer;
    outline: none;
    width: var(--space-unit);
    :hover {
        color: var(--color-text-light-accent);
    }
    :active {
        transform: translate(0.1em, 0.1em);
    }
    @media ${device.atLeastTablet} {
        display: none;
    }
`;

const StyledButtonText = styled.span`
    ${visuallyHidden}
`;

const Panel = styled.nav`
    @media ${device.mobile} {
        position: fixed;
        right: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        z-index: var(--z-index-menu);
        will-change: transform;
        transform: translate3d(100%, 0, 0);
        visibility: hidden;
        height: 100vh;
        width: 100vw;
        max-width: 12rem;
        background: var(--color-background-light);
        padding: 0 var(--space-unit);
        filter: drop-shadow(-5px 0px 20px var(--drop-shadow-color));
        &.js-is-open {
            visibility: visible;
            transform: translate3d(0, 0, 0);
        }
        @media ${device.noReduceMotion} {
            transition: transform 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
    }
`;

const PanelHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: var(--header-height);
    @media ${device.atLeastTablet} {
        display: none;
    }
`;

const StyledNavigationLinks = styled(NavigationLinks)`
    flex: 1;
    @media ${device.mobile} {
        padding-top: calc(var(--space-unit) * 2);
    }
`;

export default function MainMenu({ route }) {
    const links = [
        {
            href: '/index.html',
            text: 'Home',
            active: route.name === 'index',
        },
        {
            href: '/blog/index.html',
            text: 'Relazioni',
            active:
                route.name === 'blog' ||
                route.name === 'post-item' ||
                route.name === 'blog-by-category',
        },
        {
            href: '/portfolio/index.html',
            text: 'Portfolio',
            active: route.name === 'portfolio',
        },
        {
            href: '/contatti/index.html',
            text: 'Contatti',
            active: route.name === 'contatti',
        },
    ];

    const activeLinkIndex = findIndex(links, (l) => l.active);
    return (
        <>
            <StyledButton id="js-mainMenu-openButton">
                <StyledButtonText>Apri il menu</StyledButtonText>
                <Icon icon={HamburgerIcon} l />
            </StyledButton>
            <Panel aria-label="Navigazione principale" id="js-mainMenu-panel">
                <PanelHeader>
                    <StyledButton inPanel id="js-mainMenu-closeButton">
                        <StyledButtonText>Chiudi il menu</StyledButtonText>
                        <Icon icon={CloseIcon} l />
                    </StyledButton>
                </PanelHeader>
                <StyledNavigationLinks links={links} active={activeLinkIndex} />
            </Panel>

            <Script
                libs={[
                    {
                        where: 'body',
                        tag: '<script src="/js/utils.js" />',
                    },
                ]}
                vars={[
                    {
                        name: 'mobileMediaQuery',
                        value: device.mobile,
                    },
                ]}
            >
                {client}
            </Script>
        </>
    );
}
