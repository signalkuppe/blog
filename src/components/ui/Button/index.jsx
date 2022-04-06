import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    font-size: var(--font-size-small);
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    text-transform: uppercase;
    color: var(--color-button-color);
    background: var(--color-button-background);
    cursor: pointer;
    border: 3px solid;
    border-radius: var(--border-radius);
    padding: 0.6em 1em;
    box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px,
        4px 4px 0px 0px, 5px 5px 0px 0px;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    :active {
        box-shadow: 0px 0px 0px 0px;
        top: 5px;
        left: 5px;
    }
`;

export default function Button({ ...props }) {
    return <StyledButton role="button" {...props} />;
}
