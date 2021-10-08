import React from 'react';
import styled, { css } from 'styled-components';
import { device } from '../../../theme';

const StyledContainer = styled.div`
    padding: 0 var(--space-unit);
    max-width: var(--container-max-width);
    @media ${device.desktop} {
        margin-left: var(--container-offset);
        padding: 0;
    }
`;

export default function Container({ children, ...props }) {
    return <StyledContainer {...props}>{children}</StyledContainer>;
}
