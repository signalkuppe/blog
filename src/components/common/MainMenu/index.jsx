import React from 'react';
import styled from 'styled-components';
import { findIndex } from 'lodash';
import { device } from '../../../theme';
import withFiletto from '../../hoc/withFiletto';
import { blogLink } from '../../../pages/blog';
import { portfolioLink } from '../../../pages/portfolio';
import { permalink as contattiLink } from '../../../pages/contatti';

const StyledUl = styled.ul`
    font-weight: 700;
    font-size: var(--font-size-x-small);
    letter-spacing: var(--headings-letter-spacing);
    text-transform: uppercase;
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: calc(var(--space-unit) * 1.5);
    @media ${device.mobile} {
        flex-direction: column;
        text-align: right;
        gap: 0;
    }
    @media ${device.atLeastTablet} {
        font-size: 85%;
    }
`;
const StyledLi = styled.li`
    margin: 0;
    @media ${device.mobile} {
        padding: 0.4em 0;
    }
`;
const StyledLink = styled.a`
    display: inline-block;
    line-height: 1.5;
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
