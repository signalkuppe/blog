import React from 'react';
import styled, { css } from 'styled-components';
import withFiletto from '../../hoc/withFiletto';

const StyledH1 = styled.h1`
    ${(props) =>
        !props.small &&
        css`
            font-size: clamp(
                var(--font-size-xx-large),
                100rem,
                calc(4vh + 3vw)
            );
        `}
    ${(props) =>
        props.small &&
        css`
            font-size: clamp(var(--font-size-x-large), 100rem, calc(2vh + 2vw));
        `}
    margin: 0;
`;

export default function VerticalSpace({ children, ...props }) {
    return <H1WithFiletto {...props}>{children}</H1WithFiletto>;
}

const H1WithFiletto = withFiletto(StyledH1);
