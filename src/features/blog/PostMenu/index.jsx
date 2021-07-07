import React from 'react';
import styled, { css } from 'styled-components';
import { Script } from 'pequeno';
import { device, hideScrollbar } from '../../../theme';
import { styles } from '../../../components/hoc/withFiletto';
import Container from '../../../components/layout/Container';
import Link from '../../../components/ui/Link';
import client from './index.client';

const MenuContainer = styled.nav`
    background: var(--color-background-light);
    width: 100vw;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    position: sticky;
    top: 0;
    filter: drop-shadow(0px 20px 10px rgba(0, 0, 0, 0.25));
    ${hideScrollbar};
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
`;
const ListItem = styled.li`
    width: 100vw;
    white-space: nowrap;
    flex-grow: 1;
    flex-shrink: 0;
`;

const MenuLink = styled(Link)`
    scroll-snap-align: start;
    font-stretch: 50%;
    font-weight: 400;
    display: inline-block;
    color: ${(props) =>
        props.active ? `var(--color-text-light-accent)` : `var(--color-text)`};
    padding: 1em 1.5rem;
    :hover {
        color: var(--color-text-light-accent);
        ${(props) =>
            props.active &&
            css`
                box-shadow: none;
            `}
    }
    @media ${device.desktop} {
        font-size: var(--font-size-medium);
    }
`;

const MenuLinkText = styled.span`
    &.js-is-active {
        ${styles}
    }
`;

export default function PostMenu({ post }) {
    const menuLinks = [
        {
            href: '#relazione',
            text: 'Relazione',
        },
        {
            href: '#foto',
            text: 'Galleria fotografica',
        },
        {
            href: '#mappa',
            text: 'Mappa e tracce',
        },
        {
            href: '#condividi',
            text: 'Stampa e condividi',
        },
    ];
    return (
        <>
            <MenuContainer>
                <Container>
                    <List>
                        {menuLinks.map((item, i) => (
                            <ListItem key={i}>
                                <MenuLink
                                    href={item.href}
                                    inherit
                                    noUnderline
                                    className="js-menuLink"
                                >
                                    <MenuLinkText className="js-menuText">
                                        {item.text}
                                    </MenuLinkText>
                                </MenuLink>
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </MenuContainer>
            <Script>{client}</Script>
        </>
    );
}
