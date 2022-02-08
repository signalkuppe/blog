import React from 'react';
import styled from 'styled-components';

const StyledHr = styled.hr`
    height: 2px;
    border: none;
    background: var(--color-background-light);
`;

function HorizontalRule({ ...props }) {
    return <StyledHr {...props} />;
}
export default HorizontalRule;
