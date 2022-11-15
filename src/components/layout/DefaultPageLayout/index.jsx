import React from 'react';
import styled from 'styled-components';
import { device } from '../../../theme';
import Container from '../../../components/layout/Container';

const Title = styled.div`
    margin-top: calc(var(--space-unit) * 1.5);
    @media ${device.desktop} {
        margin-top: calc(var(--space-unit) * 2.5);
    }
`;

const Description = styled.div`
    margin-top: calc(var(--space-unit) * 2);
`;

const Header = styled.div`
    margin-bottom: calc(var(--space-unit) * 2.5);
`;

const Content = styled.div`
    padding-bottom: calc(var(--space-unit) * 4);
`;

/*
 * default internal layout for simple pages like contatti, grazie, portfolio
 * menages only the spaces between title, description and children slots
 */

export default function DefaultPageLayout({ title, description, children }) {
    return (
        <Container fullWidth>
            <Header>
                <Title>{title}</Title>
                {description && <Description>{description}</Description>}
            </Header>
            <Content>{children}</Content>
        </Container>
    );
}
