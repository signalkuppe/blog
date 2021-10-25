import React from 'react';
import styled, { css } from 'styled-components';
import { findIndex } from 'lodash';
import { Script } from 'pequeno';
import { visuallyHidden, device } from '../../../theme';
import vars from '../../../vars';
import Icon from '../../ui/Icon';
import List from '../../ui/List';
import Link from '../../ui/Link';
import VerticalSpace from '../../ui/VerticalSpace';
import HamburgerIcon from '../../../public/icons/Hamburger.svg';
import CloseIcon from '../../../public/icons/Cross.svg';
import Facebook from '../../../public/icons/Facebook.svg';
import Twitter from '../../../public/icons/Twitter.svg';
import Instagram from '../../../public/icons/Instagram.svg';
import Github from '../../../public/icons/Github.svg';
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
    :hover {
        color: var(--color-text-light-accent);
    }
    :active {
        transform: translate(0.1em, 0.1em);
    }
`;

const StyledButtonText = styled.span`
    ${visuallyHidden}
`;

const Panel = styled.nav`
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
    max-width: 21rem;
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
`;

const PanelHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: var(--header-height);
`;

const StyledNavigationLinks = styled(NavigationLinks)`
    flex: 1;
    padding-top: calc(var(--space-unit) * 2);
`;

const PanelFooter = styled.div`
    font-size: var(--font-size-x-small);
    height: 8rem;
`;

const FooterLink = styled(Link)`
    color: var(--color-text-light-accent);
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
            active: route.name === 'contact',
        },
    ];

    const activeLinkIndex = findIndex(links, (l) => l.active);
    return (
        <>
            <StyledButton aria-expanded="false" id="js-mainMenu-openButton">
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
                <PanelFooter>
                    <span id="js-year"></span> -{' '}
                    <FooterLink inherit href={vars.websiteUrl}>
                        signalkuppe.com
                    </FooterLink>
                    <VerticalSpace size={0.25} />
                    Contenuti pubblicati sotto licenza{' '}
                    <FooterLink
                        inherit
                        href="https://choosealicense.com/licenses/agpl-3.0/"
                        title="Leggi la licenza"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GNU AGPLv3
                    </FooterLink>
                    <VerticalSpace size={1.25} />
                    <List reset inline gap={0.5}>
                        <li>
                            <FooterLink
                                noUnderline
                                href={vars.facebook}
                                title="Seguimi su Facebook"
                            >
                                <Icon icon={Facebook} />
                            </FooterLink>
                        </li>
                        <li>
                            <FooterLink
                                noUnderline
                                href={vars.twitter}
                                title="Seguimi su Twitter"
                            >
                                <Icon icon={Twitter} />
                            </FooterLink>
                        </li>
                        <li>
                            <FooterLink
                                noUnderline
                                href={vars.instagram}
                                title="Seguimi su Instagram"
                            >
                                <Icon icon={Instagram} />
                            </FooterLink>
                        </li>
                        <li>
                            <FooterLink
                                noUnderline
                                href={vars.github}
                                title="La mia pagina su Github"
                                id="js-lastFocusableElement"
                            >
                                <Icon icon={Github} />
                            </FooterLink>
                        </li>
                    </List>
                </PanelFooter>
            </Panel>

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
