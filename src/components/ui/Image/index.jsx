import React from 'react';
import styled, { css } from 'styled-components';

export const imgStyles = css`
    max-width: 100%;
    height: auto;
    display: block;
    aspect-ratio: attr(width) / attr(height);
`;

const StyledImage = styled.img`
    ${imgStyles}
`;

export default function Image({ ...props }) {
    return <StyledImage {...props} />;
}
