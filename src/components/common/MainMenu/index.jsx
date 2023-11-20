import React from 'react';
import styled from 'styled-components';
import { findIndex } from 'lodash';
import { device } from '../../../theme';
import withFiletto from '../../hoc/withFiletto';
import { blogLink } from '../../../pages/blog';
import { portfolioLink } from '../../../pages/portfolio';
import { permalink as contattiLink } from '../../../pages/contatti';

export default function MainMenu({ route }) {
    const links = [
        {
            href: blogLink(),
            text: 'Gite',
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
            href: '/meteo-concenedo?fromBlog=true',
            text: 'Meteo Concenedo',
        },
        {
            href: contattiLink,
            text: 'Contatti',
            active: route.name === 'contatti' || route.name === 'grazie',
        },
    ];

    const activeLinkIndex = findIndex(links, (l) => l.active);
    return <NavigationLinks links={links} active={activeLinkIndex} />;
}

const StyledUl = styled.ul`
    font-weight: 700;
    font-size: var(--font-size-small);
    letter-spacing: var(--headings-letter-spacing);

    list-style: none;
    margin: 0;
    padding: 0;

    @media ${device.mobile} {
        display: grid;
        grid-template-columns: max-content max-content;
        grid-column-gap: 1em;
        grid-row-gap: 1.2em;
    }
    @media ${device.atLeastTablet} {
        display: flex;
        font-size: var(--font-size-base);
        gap: calc(var(--space-unit) * 1.5);
    }
`;
const StyledLi = styled.li`
    margin: 0;
    @media ${device.mobile} {
        line-height: 1;
        justify-self: flex-end;
    }
`;
const StyledLink = styled.a`
    display: inline-block;
    line-height: 1.25;
    color: ${(props) =>
        props.active ? `var(--color-text-light-accent)` : `var(--color-text)`};
    transition: color 0.2s ease-in;
    :hover {
        color: var(--color-text-light-accent);
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
