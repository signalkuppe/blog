import React from 'react';
import styled, { css } from 'styled-components';

export default function Button({ ...props }) {
    return <StyledButton role="button" {...props} />;
}

const StyledButton = styled.button`
    font-size: var(--font-size-small);
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    text-transform: uppercase;
    color: var(--color-button-color);
    background: var(--color-button-background);
    cursor: pointer;
    border: var(--inputs-border);
    border-radius: var(--inputs-border-radius);
    padding: var(--inputs-padding);
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    :not([disabled]) {
        :active {
            top: 5px;
            left: 5px;
        }
    }
    ${(props) =>
        props.disabled &&
        css`
            filter: saturate(70%);
            opacity: 0.8;
            cursor: not-allowed;
        `};
`;
