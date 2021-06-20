import React from 'react';
import styled, { css } from 'styled-components';
import { getVar } from '../../../theme';

const StyledList = styled.ul`
    ${(props) =>
        props.reset &&
        css`
            margin: 0;
            padding: 0;
            list-style: none;
        `}
    ${(props) =>
        props.inline &&
        css`
            display: flex;
        `};
    ${(props) =>
        props.gap &&
        css`
            > * + * {
                margin-left: ${props.gap};
            }
        `};
`;

export default function List({
    inline,
    reset,
    ordered,
    gap,
    children,
    ...props
}) {
    if (gap) {
        if (typeof gap === 'boolean') {
            gap = getVar('--space-unit');
        } else if (typeof gap === 'number') {
            gap = `calc(${getVar('--space-unit')} * ${gap})`;
        } else {
            gap = 0;
        }
    }
    return (
        <StyledList
            inline={inline}
            reset={reset}
            gap={gap}
            as={ordered ? 'ol' : 'ul'}
            {...props}
        >
            {children}
        </StyledList>
    );
}
