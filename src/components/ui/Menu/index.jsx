import React from 'react';
import styled, { css } from 'styled-components';
import withFiletto from '../../hoc/withFiletto';
import List from '../List';
import Link from '../Link';

const StyledUl = styled(List)`
    display: flex;
    flex-direction: column;
    > * + * {
        margin-top: var(--space-unit);
    }
`;
const StyledLi = styled.li``;
const StyledLink = styled(Link)`
    font-size: var(--font-size-medium);
    font-stretch: 50%;
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
`;

export default function Menu({ links, active, ...props }) {
    const renderLink = function (index, link) {
        if (index === active) {
            return (
                <LinkWithFiletto active href={link.href}>
                    {link.text}
                </LinkWithFiletto>
            );
        } else {
            return (
                <StyledLink inherit href={link.href}>
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

const LinkWithFiletto = withFiletto(StyledLink);
