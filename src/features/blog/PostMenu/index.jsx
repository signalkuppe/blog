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
    position: sticky;
    top: 0;
    filter: drop-shadow(0px 20px 10px rgba(0, 0, 0, 0.25));
    @media ${device.noReduceMotion} {
        transition: opacity 0.2s linear;
    }
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: row;
    @media ${device.mobileAndTablet} {
        flex-wrap: nowrap;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        ${hideScrollbar};
    }
    @media ${device.desktop} {
        > * + * {
            margin-left: calc(var(--space-unit) * 2);
        }
    }
`;
const ListItem = styled.li`
    @media ${device.mobileAndTablet} {
        scroll-snap-align: end;
        white-space: nowrap;
        flex-shrink: 0;
        width: 100%;
    }
`;

const MenuLink = styled(Link)`
    font-stretch: 50%;
    font-weight: 400;
    display: inline-block;
    color: ${(props) =>
        props.active ? `var(--color-text-light-accent)` : `var(--color-text)`};
    padding: 1.5rem 0;
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
            <MenuContainer className="js-postMenu">
                <Container>
                    <List className="js-postMenu-list">
                        {menuLinks.map((item, i) => (
                            <ListItem key={i}>
                                <MenuLink
                                    href={item.href}
                                    inherit
                                    noUnderline
                                    className="js-postMenuLink"
                                >
                                    <MenuLinkText className="js-postMenuLinkText">
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
