import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    font-size: var(--font-size-small);
    font-weight: 700;
    text-decoration: none;
    display: grid;
    place-items: center;
    width: ${(props) => (props.s ? '2rem' : '3.5em')};
    height: ${(props) => (props.s ? '2rem' : '3.5em')};
    border-radius: 50%;
    color: var(--color-button-color);
    border: var(--inputs-border);
    background: var(--color-button-background);
    cursor: pointer;
    position: relative;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    appearance: none;
    outline: none;
    padding: 0;
    :active {
        top: 5px;
        left: 5px;
    }
`;

export default function Fab({ ...props }) {
    return <StyledButton {...props} />;
}
