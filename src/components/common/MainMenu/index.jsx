import React from 'react';
import styled from 'styled-components';
import { Script } from 'pequeno';
import { visuallyHidden } from '../../../theme';
import vars from '../../../vars';
import Icon from '../../ui/Icon';
import Menu from '../../ui/Menu';
import List from '../../ui/List';
import Link from '../../ui/Link';
import VerticalSpace from '../../ui/VerticalSpace';
import HamburgerIcon from '../../ui/Icon/icons/Hamburger.svg';
import CloseIcon from '../../ui/Icon/icons/Cross.svg';
import Facebook from '../../ui/Icon/icons/Facebook.svg';
import Twitter from '../../ui/Icon/icons/Twitter.svg';
import Instagram from '../../ui/Icon/icons/Instagram.svg';
import Github from '../../ui/Icon/icons/Github.svg';
import client from './index.client';

const StyledButton = styled.button`
    appearance: none;
    background: transparent;
    border: none;
    color: var(--color-text-accent);
    line-height: 1;
    padding: 0;
    width: 2.5rem;
    height: 2.5rem;
    :hover,
    :active {
        color: var(--color-text-light-accent);
    }
    :active {
        transform: translate(0.1em, 0.1em);
    }
`;

const StyledButtonText = styled.span`
    ${visuallyHidden}
`;

const MenuContainer = styled.div``;

const Panel = styled.nav`
    position: fixed;
    right: 0;
    top: 0;
    will-change: transform;
    transform: translate3d(100%, 0, 0);
    visibility: hidden;
    width: 100vw;
    height: 100vh;
    max-width: 20rem;
    background: var(--color-background-dark);
    padding: 0 var(--space-unit);
    filter: drop-shadow(-5px 0px 15px var(--color-background));
    transition: transform 0.1s cubic-bezier(0.075, 0.82, 0.165, 1);
    &.js-is-open {
        visibility: visible;
        transform: translate3d(0, 0, 0);
    }
`;

const PanelHeader = styled.header`
    display: flex;
    justify-content: flex-end;
    height: 8rem;
    padding-top: var(--space-unit);
`;

const StyledMenu = styled(Menu)`
    height: calc(100vh - 16rem);
`;

const PanelFooter = styled.footer`
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
            text: 'Blog',
            active: route.name === 'posts' || route.name === 'post-item',
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
    return (
        <>
            <MenuContainer>
                <StyledButton aria-expanded="false" id="js-mainMenu-openButton">
                    <StyledButtonText>Apri il menu</StyledButtonText>
                    <Icon icon={HamburgerIcon} l />
                </StyledButton>
                <Panel
                    aria-label="Navigazione principale"
                    id="js-mainMenu-panel"
                >
                    <PanelHeader>
                        <StyledButton id="js-mainMenu-closeButton">
                            <StyledButtonText>Chiudi il menu</StyledButtonText>
                            <Icon icon={CloseIcon} l />
                        </StyledButton>
                    </PanelHeader>
                    <StyledMenu links={links} active={1} />
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
                                    inherit
                                    href={vars.facebook}
                                    title="Seguimi su Facebook"
                                >
                                    <Icon icon={Facebook} />
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink
                                    inherit
                                    noUnderline
                                    href={vars.twitter}
                                    title="Seguimi su Twitter"
                                >
                                    <Icon icon={Twitter} />
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink
                                    inherit
                                    noUnderline
                                    href={vars.instagram}
                                    title="Seguimi su Instagram"
                                >
                                    <Icon icon={Instagram} />
                                </FooterLink>
                            </li>
                            <li>
                                <FooterLink
                                    inherit
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
            </MenuContainer>
            <Script>{client}</Script>
        </>
    );
}
