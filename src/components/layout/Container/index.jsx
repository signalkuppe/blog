import React from 'react';
import styled, { css } from 'styled-components';
import { device } from '../../../theme';

export default function Container({ children, ...props }) {
    return (
        <StyledContainer className="print-container" {...props}>
            {children}
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    padding: 0 var(--space-unit);
    @media ${device.desktop} {
        padding: 0 calc(var(--space-unit) * 2);
    }
    @media ${device.largeDesktop} {
        margin-left: var(--container-offset);
        ${(props) =>
            !props.fullWidth &&
            css`
                max-width: var(--container-max-width);
            `}
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
