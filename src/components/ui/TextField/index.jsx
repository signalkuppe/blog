import React from 'react';
import { omit } from 'lodash';
import styled, { css } from 'styled-components';
import { Script } from 'pequeno';
import client from './index.client.js';

let i = 0;

const StyledLabel = styled.label`
    display: block;
    font-weight: 500;
    margin-bottom: 0.5em;
`;
const StyledTextField = styled.input`
    border: 4px solid var(--color-text);
    background: var(--color-background);
    padding: 1em;
    color: var(--color-text);
    border-radius: 15px;
    :focus {
        border-color: var(--color-primary);
        outline: transparent;
    }
    &.js-is-invalid {
        border-color: var(--color-error);
    }
    transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    ${(props) =>
        props.block &&
        css`
            display: block;
            width: 100%;
        `};
    appareance: none;
`;

export default function TextField({ ...props }) {
    const uid = `textfield-${i++}`;
    const className = 'js-textinput';

    return (
        <>
            {props.label && (
                <StyledLabel htmlFor={uid}>{props.label}</StyledLabel>
            )}
            <StyledTextField
                id={uid}
                className={className}
                type={props.type || 'text'}
                {...omit(props, ['className'])}
            />
            <Script>{client}</Script>
        </>
    );
}
