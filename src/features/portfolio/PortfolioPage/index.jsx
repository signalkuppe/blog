import React from 'react';
import styled from 'styled-components';
import vars from '../../../vars';
import { device } from '../../../theme';
import Container from '../../../components/layout/Container';
import PageTitle from '../../../components/ui/PageTitle';
import Pager from '../../../components/ui/Pager';
import BaseLayout from '../../../components/layout/Base';
import Head from '../../../components/common/Head';
import PortfolioPhotos from '../PortfolioPhotos';

const StyledPageTitle = styled(PageTitle)`
    margin-top: calc(var(--space-unit) * 1.5);
    margin-bottom: calc(
        var(--space-unit) * ${(props) => (props.firstPage ? 1 : 2)}
    );
    @media ${device.desktop} {
        margin-top: calc(var(--space-unit) * 2.5);
    }
`;
const Intro = styled.p`
    margin-bottom: calc(var(--space-unit) * 2);
`;

const StyledPager = styled(Pager)`
    margin-top: calc(var(--space-unit) * 2);
    margin-bottom: calc(var(--space-unit) * 4);
`;

export default function PortfolioPage({ route, pagination }) {
    let title = 'Portfolio';
    if (pagination.page > 1) {
        title = `Portfolio / ${pagination.page}`;
    }
    const photos = pagination.items;
    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title={title}
                    slogan={vars.siteName}
                    description="Una raccolta delle mie foto più belle"
                    extraLinks={
                        <>
                            <link
                                rel="preconnect"
                                href="https://assets.ctfassets.net"
                                crossOrigin="true"
                            />
                        </>
                    }
                />
            }
        >
            <Container fullWidth>
                <StyledPageTitle small firstPage={pagination.page === 1}>
                    {title}
                </StyledPageTitle>
                {pagination.page === 1 && (
                    <Intro>Una raccolta delle mie foto più belle</Intro>
                )}
                <PortfolioPhotos photos={photos} />
                <StyledPager pagination={pagination} />
            </Container>
        </BaseLayout>
    );
}
