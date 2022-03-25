import React from 'react';
import styled from 'styled-components';
import { device } from '../../../theme';

const StyledButton = styled.button`
    font-weight: 500;
    background-color: var(--color-button-background);
    border-radius: var(--border-radius);
    border: none;
    color: var(--color-button-color);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    padding: 0.5em 1em;
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
        transform: translate(-1px, -1px);
    }
    :active {
        transform: translate(1px, 1px);
    }
`;

export default function Button({ ...props }) {
    return <StyledButton role="button" {...props} />;
}
