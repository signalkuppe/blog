import React from 'react';
import styled from 'styled-components';
import vars from '../../../vars';
import PageTitle from '../../../components/ui/PageTitle';
import BaseLayout from '../../../components/layout/Base';
import DefaultPageLayout from '../../../components/layout/DefaultPageLayout';
import Head from '../../../components/common/Head';
import ContattiForm from '../ContattiForm';

const Description = styled.p`
    margin: 0;
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
            <DefaultPageLayout
                title={<PageTitle small>{title}</PageTitle>}
                description={<Description>{description}</Description>}
            >
                <ContattiForm />
            </DefaultPageLayout>
        </BaseLayout>
    );
}
