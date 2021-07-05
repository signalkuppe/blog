import React from 'react';
import styled from 'styled-components';
import { device } from '../../../theme';
import Container from '../../../components/layout/Container';

const Layout = styled.div`
    margin-top: calc(var(--space-unit) * 3);
`;
const Content = styled.div`
    max-width: 70ch;
`;
const Header = styled.header``;

export default function PostLayout({ header, children }) {
    return (
        <Container as="section">
            <Layout>
                <Header>{header}</Header>
                <Content>{children}</Content>
            </Layout>
        </Container>
    );
}
