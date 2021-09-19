import React from 'react';
import styled from 'styled-components';
import vars from '../../../vars';
import { visuallyHidden } from '../../../theme';
import BaseLayout from '../../../components/layout/Base';
import Head from '../../../components/common/Head';
import BlogPageTitle from '../BlogPageTitle';
import BlogMap from '../BlogMap';

const PageTitle = styled.h1`
    ${visuallyHidden}
`;

export default function BlogPage({ post, route }) {
    const title = 'Blog';
    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title={title}
                    slogan={vars.siteName}
                    description="L’elenco completo di tutte le relazioni, con la mappa e la ricerca"
                />
            }
        >
            <BlogPageTitle title={title} />
            <BlogMap />
        </BaseLayout>
    );
}
