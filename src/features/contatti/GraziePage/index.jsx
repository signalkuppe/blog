import React from 'react';
import styled, { keyframes } from 'styled-components';
import vars from '../../../vars';
import { linksStyles } from '../../../theme';
import PageTitle from '../../../components/ui/PageTitle';
import BaseLayout from '../../../components/layout/Base';
import DefaultPageLayout from '../../../components/layout/DefaultPageLayout';
import Head from '../../../components/common/Head';

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
            <DefaultPageLayout
                title={
                    <StyledPageTitle small>Messaggio ricevuto!</StyledPageTitle>
                }
                description={
                    <Text>
                        <Intro>
                            Cercherò di risponderti il prima possibile 🙂
                        </Intro>
                        <RegularLink href="/">Torna alla homepage</RegularLink>
                    </Text>
                }
            />
        </BaseLayout>
    );
}

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
    animation: 0.65s ${backInLeft} ease-out;
`;

const Text = styled.div`
    animation: 0.5s ${fadeInUp} ease-out;
    animation-delay: 0.8s;
    animation-fill-mode: backwards;
`;

const Intro = styled.p`
    margin-bottom: calc(var(--space-unit) * 0.5);
    margin-top: calc(var(--space-unit) * 2);
`;

const RegularLink = styled.a`
    ${linksStyles}
`;
