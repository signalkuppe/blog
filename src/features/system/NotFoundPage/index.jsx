import React from 'react';
import styled from 'styled-components';
import vars from '../../../vars';
import { linksStyles, headingsStyles } from '../../../theme';
import CommonStyles from '../../../components/common/CommonStyles';
import Head from '../../../components/common/Head';

export default function NotFoundPage() {
    let title = 'Pagina non trovata';
    let description = 'La pagina che stai cercando non esiste';
    return (
        <>
            <CommonStyles />
            <Head
                title={title}
                slogan={vars.siteName}
                description={description}
            />
            <Container>
                <Emoji aria-hidden="true">🥲</Emoji>
                <Title>Ops, questa pagina non esiste</Title>
                <RegularLink href="/">Torna alla homepage</RegularLink>
            </Container>
        </>
    );
}

const Container = styled.main`
    padding: var(--space-unit);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const Emoji = styled.span`
    font-size: var(--font-size-xx-large);
`;

const Title = styled.h1`
    ${headingsStyles};
    font-size: var(--font-size-x-large);
    margin-bottom: calc(var(--space-unit) * 2);
    text-align: center;
    text-wrap: balance;
`;

const RegularLink = styled.a`
    ${linksStyles}
`;
