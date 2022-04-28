import React from 'react';
import styled, { css } from 'styled-components';
import { Script } from 'pequeno';
import { device, hideScrollbar, pageMenuTypography } from '../../../theme';
import { styles } from '../../../components/hoc/withFiletto';
import Container from '../../../components/layout/Container';
import client from './index.client';

const MenuContainer = styled.nav`
    background: var(--color-background-light);
    position: sticky;
    top: 0;
    z-index: var(--z-index-post-menu);
    /*
    box-shadow: 0 1px 1px var(--drop-shadow-color),
        0 2px 2px var(--drop-shadow-color), 0 4px 4px var(--drop-shadow-color),
        0 8px 8px var(--drop-shadow-color), 0 16px 16px var(--drop-shadow-color); */
    @media ${device.noReduceMotion} {
        transition: opacity 0.2s linear;
    }
`;

const List = styled.ul`
    ${pageMenuTypography};
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
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
    margin-bottom: 0;
    @media ${device.mobileAndTablet} {
        scroll-snap-align: end;
        white-space: nowrap;
        flex-shrink: 0;
        width: 100%;
    }
`;

const MenuLink = styled.a`
    display: block;
    color: ${(props) =>
        props.active ? `var(--color-text-light-accent)` : `var(--color-text)`};
    padding: calc(var(--space-unit) / 2) 0;
    :hover {
        color: var(--color-text-light-accent);
        ${(props) =>
            props.active &&
            css`
                box-shadow: none;
            `}
    }
    @media ${device.desktop} {
        padding: var(--space-unit) 0;
    }
`;

const MenuLinkText = styled.span`
    &.js-is-active {
        ${styles}
        color: var(--color-text-light-accent);
    }
`;

export default function PostMenu({ sections }) {
    return (
        <>
            <MenuContainer className="js-postMenu print-post-menu">
                <Container>
                    <List className="js-postMenu-list">
                        {sections.map((section, i) =>
                            section.content ? (
                                <ListItem key={i}>
                                    <MenuLink
                                        href={`#${section.id}`}
                                        className="js-postMenuLink"
                                    >
                                        <MenuLinkText
                                            className="js-postMenuLinkText"
                                            id={`js-postMenuLinkText-${section.id}`}
                                        >
                                            {section.title}
                                        </MenuLinkText>
                                    </MenuLink>
                                </ListItem>
                            ) : null,
                        )}
                    </List>
                </Container>
            </MenuContainer>
            <Script
                libs={[
                    {
                        where: 'body',
                        tag: '<script src="/libs/scrollama.js" />',
                    },
                ]}
            >
                {client}
            </Script>
        </>
    );
}
