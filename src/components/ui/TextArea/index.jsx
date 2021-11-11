import React from 'react';
import { omit } from 'lodash';
import styled, { css } from 'styled-components';
import { Script } from 'pequeno';
import client from '../TextField/index.client'; // same logic

let i = 0;

const StyledLabel = styled.label`
    display: block;
    font-weight: 500;
    margin-bottom: 0.5em;
`;
const StyledTextArea = styled.textarea`
    border: 4px solid var(--color-text);
    appareance: none;
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
        `}
`;

export default function TextArea({ ...props }) {
    const uid = `textarea-${i++}`;
    const className = 'js-textinput';

    return (
        <>
            {props.label && (
                <StyledLabel htmlFor={uid}>{props.label}</StyledLabel>
            )}
            <StyledTextArea
                id={uid}
                className={className}
                type={props.type || 'text'}
                {...omit(props, ['className'])}
            />
            <Script>{client}</Script>
        </>
    );
}
