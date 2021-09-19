import React from 'react';
import styled from 'styled-components';
import { visuallyHidden } from '../../../theme';
import Container from '../../../components/layout/Container';

const PageTitle = styled.h1`
    ${visuallyHidden}
`;

export default function BlogPageTitle({ title }) {
    return (
        <Container>
            <PageTitle>{title}</PageTitle>
        </Container>
    );
}
