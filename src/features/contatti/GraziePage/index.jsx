import React from 'react';
import styled, { keyframes } from 'styled-components';
import vars from '../../../vars';
import { device } from '../../../theme';
import Container from '../../../components/layout/Container';
import PageTitle from '../../../components/ui/PageTitle';
import Link from '../../../components/ui/Link';
import BaseLayout from '../../../components/layout/Base';
import Head from '../../../components/common/Head';

const backInLeft = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const StyledPageTitle = styled(PageTitle)`
    margin-top: calc(var(--space-unit) * 1.5);
    margin-bottom: calc(var(--space-unit) * 2);
    @media ${device.desktop} {
        margin-top: calc(var(--space-unit) * 2.5);
    }
    animation: 0.65s ${backInLeft} ease-out;
`;

const Text = styled.div`
    animation: 0.5s ${fadeInUp} ease-out;
    animation-delay: 0.8s;
    animation-fill-mode: backwards;
`;

const Intro = styled.p`
    margin-bottom: calc(var(--space-unit) * 0.5);
`;

export default function GraziePage({ route }) {
    let title = 'Grazie!';
    let description = 'Grazie per avermi contattato';
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
                <StyledPageTitle small>Messaggio ricevuto!</StyledPageTitle>
                <Text>
                    <Intro>Cercherò di risponderti il prima possibile 🙂</Intro>
                    <Link href="/">Torna alla homepage</Link>
                </Text>
            </Container>
        </BaseLayout>
    );
}
