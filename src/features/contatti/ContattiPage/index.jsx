import React from 'react';
import styled from 'styled-components';
import vars from '../../../vars';
import { device } from '../../../theme';
import Container from '../../../components/layout/Container';
import PageTitle from '../../../components/ui/PageTitle';
import BaseLayout from '../../../components/layout/Base';
import Head from '../../../components/common/Head';
import ContattiForm from '../ContattiForm';

const StyledPageTitle = styled(PageTitle)`
    margin-top: calc(var(--space-unit) * 1.5);
    margin-bottom: calc(var(--space-unit) * 2);
    @media ${device.desktop} {
        margin-top: calc(var(--space-unit) * 2.5);
    }
`;

const Intro = styled.p`
    margin-bottom: calc(var(--space-unit) * 2);
`;

export default function PortfolioPage({ route }) {
    let title = 'Inviami un messaggio';
    let description =
        'Inviami un messaggio per parlare di un vostro progetto o di montagna';
    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title={title}
                    slogan={vars.siteName}
                    description={description}
                />
            }
        >
            <Container fullWidth>
                <StyledPageTitle small>{title}</StyledPageTitle>
                <Intro>{description}</Intro>
                <ContattiForm />
            </Container>
        </BaseLayout>
    );
}
