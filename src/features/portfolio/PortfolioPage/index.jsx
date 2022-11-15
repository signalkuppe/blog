import React from 'react';
import styled from 'styled-components';
import vars from '../../../vars';
import PhotoDisclaimer from '../../../components/common/PhotoDisclaimer';
import PageTitle from '../../../components/ui/PageTitle';
import Pager from '../../../components/ui/Pager';
import BaseLayout from '../../../components/layout/Base';
import DefaultPageLayout from '../../../components/layout/DefaultPageLayout';
import Head from '../../../components/common/Head';
import PortfolioPhotos from '../PortfolioPhotos';

const StyledPager = styled(Pager)`
    margin-top: calc(var(--space-unit) * 6);
    margin-bottom: calc(var(--space-unit) * 4);
`;

export default function PortfolioPage({ route, pagination }) {
    let title = 'Portfolio';
    let description = 'Una raccolta delle foto che mi piacciono di più';

    if (pagination.page > 1) {
        title = `Portfolio / ${pagination.page}`;
    }
    const photos = pagination.items;
    const firstPage = pagination.page === 1;

    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title={title}
                    slogan={vars.siteName}
                    description={description}
                    extraLinks={
                        <>
                            <link
                                rel="preconnect"
                                href="https://assets.ctfassets.net"
                                crossOrigin="anonymous"
                            />
                        </>
                    }
                />
            }
        >
            <DefaultPageLayout
                title={<PageTitle small>{title}</PageTitle>}
                description={firstPage ? description : null}
            >
                <PortfolioPhotos photos={photos} />
                <nav>
                    <StyledPager pagination={pagination} />
                </nav>
                <PhotoDisclaimer />
            </DefaultPageLayout>
        </BaseLayout>
    );
}
