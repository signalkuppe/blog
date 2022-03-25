import React from 'react';
import styled from 'styled-components';
import { device } from '../../../theme';
import withFiletto from '../../hoc/withFiletto';

const StyledUl = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: calc(var(--space-unit) * 1.5);
    @media ${device.mobile} {
        flex-direction: column;
    }
`;
const StyledLi = styled.li`
    margin: 0;
`;
const StyledLink = styled.a`
    font-size: var(--font-size-medium);
    font-stretch: var(--narrow-font-stretch);
    font-weight: 400;
    display: inline-block;
    color: ${(props) =>
        props.active ? `var(--color-text-light-accent)` : `var(--color-text)`};
    box-shadow: none;
    :hover {
        color: var(--color-text-light-accent);
        box-shadow: none;
    }
    @media ${device.desktop} {
        flex-direction: column;
    }
`;

const LinkWithFiletto = withFiletto(StyledLink);

export default function NavigationLinks({ links, active, ...props }) {
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
