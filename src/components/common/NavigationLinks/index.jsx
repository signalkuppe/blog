import React from 'react';
import styled, { css } from 'styled-components';
import { device } from '../../../theme';
import withFiletto from '../../hoc/withFiletto';
import List from '../../ui/List';
import Link from '../../ui/Link';

const StyledUl = styled(List)`
    display: flex;
    gap: calc(var(--space-unit) * 1.5);
    @media ${device.mobile} {
        flex-direction: column;
    }
`;
const StyledLi = styled.li``;
const StyledLink = styled(Link)`
    font-size: var(--font-size-medium);
    font-stretch: var(--narrow-font-stretch);
    font-weight: 400;
    display: inline-block;
    color: ${(props) =>
        props.active ? `var(--color-text-light-accent)` : `var(--color-text)`};
    :hover {
        color: var(--color-text-light-accent);
        ${(props) =>
            props.active &&
            css`
                box-shadow: none;
            `}
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
                    noUnderline
                    href={link.href}
                    id={last ? lastId : null}
                >
                    {link.text}
                </LinkWithFiletto>
            );
        } else {
            return (
                <StyledLink
                    noUnderline
                    href={link.href}
                    id={last ? lastId : null}
                >
                    {link.text}
                </StyledLink>
            );
        }
    };
    return (
        <StyledUl reset {...props}>
            {links.map((link, i) => (
                <StyledLi key={i}>{renderLink(i, link)}</StyledLi>
            ))}
        </StyledUl>
    );
}
