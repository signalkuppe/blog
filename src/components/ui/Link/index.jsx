import React from 'react';
import styled, { css } from 'styled-components';

export const defaultStyles = css`
    color: var(--color-secondary);
    text-decoration: none;
    font-weight: 500;
    :not([role='button']) {
        /* button component with href */
        box-shadow: ${(props) => {
            if (!props.noUnderline) {
                let color = `var(--color-secondary)`;
                if (props.inherit) {
                    color = `currentColor`;
                }
                return `0px 2px 0px ${color};`;
            } else {
                return 'none';
            }
        }};
        transition: box-shadow 100ms ease 0s;
    }
`;

const StyledLink = styled.a`
    ${defaultStyles};
    ${(props) =>
        props.inherit &&
        css`
            color: inherit;
            font-size: inherit;
            font-weight: inherit;
        `}
`;

export default function Link({ ...props }) {
    return <StyledLink {...props} />;
}
