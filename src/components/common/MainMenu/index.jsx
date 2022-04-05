import React from 'react';
import styled from 'styled-components';
import { findIndex } from 'lodash';
import { device } from '../../../theme';
import withFiletto from '../../hoc/withFiletto';
import { blogLink } from '../../../pages/blog';
import { portfolioLink } from '../../../pages/portfolio';
import { permalink as contattiLink } from '../../../pages/contatti';

const StyledUl = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: calc(var(--space-unit) * 1.5);
    @media ${device.mobile} {
        flex-direction: column;
        gap: 0.1em;
        text-align: right;
    }
`;
const StyledLi = styled.li`
    margin: 0;
`;
const StyledLink = styled.a`
    font-stretch: var(--narrow-font-stretch);
    font-weight: 500;
    display: inline-block;
    color: ${(props) =>
        props.active ? `var(--color-text-light-accent)` : `var(--color-text)`};
    transition: color 0.2s ease-in;
    :hover {
        color: var(--color-text-light-accent);
    }
    @media ${device.atLeastTablet} {
        font-size: var(--font-size-medium);
    }
`;

const LinkWithFiletto = withFiletto(StyledLink);

function NavigationLinks({ links, active, ...props }) {
    const renderLink = function (index, link) {
        const last = index === links.length - 1;
        const lastId = 'js-lastFocusableElement';

        if (index === active) {
            return (
                <LinkWithFiletto
                    active
                    href={link.href}
                    id={last ? lastId : null}
                >
                    {link.text}
                </LinkWithFiletto>
            );
        } else {
            return (
                <StyledLink href={link.href} id={last ? lastId : null}>
                    {link.text}
                </StyledLink>
            );
        }
    };
    return (
        <StyledUl {...props}>
            {links.map((link, i) => (
                <StyledLi key={i}>{renderLink(i, link)}</StyledLi>
            ))}
        </StyledUl>
    );
}

export default function MainMenu({ route }) {
    const links = [
        {
            href: blogLink(),
            text: 'Relazioni',
            active:
                route.name === 'blog' ||
                route.name === 'post-item' ||
                route.name === 'blog-by-category',
        },
        {
            href: portfolioLink(),
            text: 'Portfolio',
            active: route.name === 'portfolio',
        },
        {
            href: contattiLink,
            text: 'Info & Contatti',
            active: route.name === 'contatti' || route.name === 'grazie',
        },
    ];

    const activeLinkIndex = findIndex(links, (l) => l.active);
    return <NavigationLinks links={links} active={activeLinkIndex} />;
}
