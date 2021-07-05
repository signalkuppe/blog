import React from 'react';
import styled from 'styled-components';
import withFiletto from '../../hoc/withFiletto';

const StyledH1 = styled.h1`
    font-size: clamp(var(--font-size-xx-large), 100rem, calc(4vh + 3vw));
    margin: 0;
`;

export default function VerticalSpace({ children, ...props }) {
    return <H1WithFiletto {...props}>{children}</H1WithFiletto>;
}

const H1WithFiletto = withFiletto(StyledH1);
