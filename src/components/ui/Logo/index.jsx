import React from 'react';
import styled from 'styled-components';
import vars from '../../../vars';

const Logotext = styled.span`
    font-family: var(--font-family-cursive);
`;

export default function Logo() {
    return <Logotext>{vars.siteName}</Logotext>;
}
