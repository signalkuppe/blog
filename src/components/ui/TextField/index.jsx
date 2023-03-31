import React from 'react';
import { omit } from 'lodash';
import styled, { css } from 'styled-components';

let i = 0;

function TextField({ ...props }, ref) {
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
                ref={ref}
            />
        </>
    );
}

const StyledLabel = styled.label`
    display: block;
    font-weight: 500;
    margin-bottom: 0.5em;
    padding-left: 25px;
`;
const StyledTextField = styled.input`
    line-height: 1;
    border: var(--inputs-border);
    background: var(--inputs-background);
    padding: var(--inputs-padding);
    color: var(--inputs-color);
    border-radius: var(--border-radius);
    -webkit-appearance: none;
    ::-webkit-search-cancel-button {
        /* customize cross button  */
        -webkit-appearance: none;
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-left: 10px;
        background: linear-gradient(
                45deg,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0) 43%,
                var(--color-primary) 45%,
                var(--color-primary) 55%,
                rgba(0, 0, 0, 0) 57%,
                rgba(0, 0, 0, 0) 100%
            ),
            linear-gradient(
                135deg,
                transparent 0%,
                transparent 43%,
                var(--color-primary) 45%,
                var(--color-primary) 55%,
                transparent 57%,
                transparent 100%
            );
    }

    :focus {
        border-color: var(--inputs-focused-border-color);
        outline: transparent;
    }
    transition: border-color 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    ${(props) =>
        props.block &&
        css`
            display: block;
            width: 100%;
        `};
`;

export default React.forwardRef(TextField);
