import React from 'react';
import styled, { css } from 'styled-components';
import { device } from '../../../theme';

const StyledContainer = styled.div`
    padding: 0 var(--space-unit);
    ${(props) =>
        !props.fullWidth &&
        css`
            max-width: var(--container-max-width);
        `}
    @media ${device.desktop} {
        margin-left: var(--container-offset);
        ${(props) =>
            props.fullWidth &&
            css`
                padding-right: calc(var(--space-unit) * 4);
            `}
        ${(props) =>
            !props.fullWidth &&
            css`
                padding: 0;
            `}
    }
`;

export default function Container({ children, ...props }) {
    return <StyledContainer {...props}>{children}</StyledContainer>;
}
