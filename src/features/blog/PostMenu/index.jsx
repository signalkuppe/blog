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
    z-index: 1000000;
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
    font-stretch: var(--headings-font-stretch);
    font-weight: 400;
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
        font-size: var(--font-size-medium);
    }
`;

const MenuLinkText = styled.span`
    &.js-is-active {
        ${styles}
    }
`;

export default function PostMenu({ sections }) {
    return (
        <>
            <MenuContainer className="js-postMenu">
                <Container>
                    <List className="js-postMenu-list">
                        {sections.map((section, i) =>
                            section.content ? (
                                <ListItem key={i}>
                                    <MenuLink
                                        href={`#${section.id}`}
                                        inherit
                                        noUnderline
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
