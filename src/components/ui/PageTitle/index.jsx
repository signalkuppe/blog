import React from 'react';
import styled from 'styled-components';
import withFiletto from '../../hoc/withFiletto';

const StyledH1 = styled.h1``;

export default function VerticalSpace({ children, ...props }) {
    return <H1WithFiletto {...props}>{children}</H1WithFiletto>;
}

const H1WithFiletto = withFiletto(StyledH1);
