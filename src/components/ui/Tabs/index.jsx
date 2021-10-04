import React from 'react';
import styled, { css } from 'styled-components';
import Link from '../../ui/Link';
import List from '../../ui/List';

const StyledList = styled(List)`
    display: flex;
    flex-wrap: wrap;
`;
const StyledLi = styled.li``;
const StyledLink = styled(Link)`
    font-size: var(--font-size-medium);
    font-stretch: var(--headings-font-stretch);
    font-weight: 400;
    display: flex;
    align-items: center;
    padding: 0.8em 1.6em;
    color: ${(props) =>
        props.active ? `var(--color-text-light-accent)` : `var(--color-text)`};
    border-bottom: 0.25em solid transparent;
    ${(props) =>
        props.active &&
        css`
            border-color: var(--color-primary);
        `}
    :hover {
        ${(props) =>
            props.active &&
            css`
                box-shadow: none;
            `};
        border-color: var(--color-secondary);
    }
`;

export default function Tabs({ items, active, ...props }) {
    return (
        <StyledList reset {...props}>
            {items.map((item, i) => (
                <StyledLi key={i}>
                    <StyledLink
                        noUnderline
                        href={item.href}
                        active={i === active}
                    >
                        {item.textLeft}
                        {item.text}
                    </StyledLink>
                </StyledLi>
            ))}
        </StyledList>
    );
}
