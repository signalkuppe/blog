import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    font-weight: 500;
    background-color: var(--color-primary);
    border: 2px solid var(--color-text-light-accent);
    border-radius: 30px;
    box-shadow: var(--color-text-light-accent) 0.2em 0.2em 0 0;
    color: var(--color-background);
    cursor: pointer;
    display: inline-block;
    padding: 0 var(--font-size-base);
    line-height: calc(var(--font-size-base) * 3.2);
    text-align: center;
    -webkit-text-decoration: none;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    :hover {
        background-color: var(--color-secondary);
        color: var(--color-text-light-accent);
        box-shadow: var(--color-text-light-accent) 0.2em 0.2em 0 0;
    }
    :active {
        box-shadow: var(--color-text-light-accent) 0.1em 0.1em 0 0;
        transform: translate(2px, 2px);
    }
`;

export default function Button({ ...props }) {
    return <StyledButton role="button" {...props} />;
}
