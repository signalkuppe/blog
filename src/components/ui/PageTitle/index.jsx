import React from 'react';
import styled, { css } from 'styled-components';
import { headingsStyles } from '../../../theme';
import withFiletto from '../../hoc/withFiletto';

export default function PageTitle({ children, ...props }) {
    return <H1WithFiletto {...props}>{children}</H1WithFiletto>;
}

const StyledH1 = styled.h1`
    ${headingsStyles}
    font-size: clamp(var(--font-size-x-large), 5vmax, 7rem);
    ${(props) =>
        props.small &&
        css`
            font-size: clamp(var(--font-size-x-large), 3.5vmax, 4rem);
        `}
    ${(props) =>
        props.xsmall &&
        css`
            font-size: clamp(var(--font-size-x-large), 2.5vmax, 4rem);
        `}
    margin: 0;
`;

const H1WithFiletto = withFiletto(StyledH1);
