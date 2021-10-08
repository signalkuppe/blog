import React from 'react';
import styled, { css } from 'styled-components';

export const imgStyles = css`
    max-width: 100%;
    height: auto;
    display: block;
    aspect-ratio: attr(width) / attr(height);
    text-indent: -9999px;
    :-moz-loading {
        visibility: hidden;
    }
`;

const StyledImage = styled.img`
    ${imgStyles}
`;

export default function Image({ ...props }) {
    return <StyledImage {...props} />;
}
