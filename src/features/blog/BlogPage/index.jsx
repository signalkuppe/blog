import React from 'react';
import styled from 'styled-components';
import vars from '../../../vars';
import BaseLayout from '../../../components/layout/Base';
import Container from '../../../components/layout/Container';
import Head from '../../../components/common/Head';
import withFiletto from '../../../components/hoc/withFiletto';
import Pager from '../../../components/ui/Pager';
import BlogPageTitle from '../BlogPageTitle';
import BlogMap from '../BlogMap';
import BlogTabs from '../BlogTabs';
import BlogSearch from '../BlogSearch';
import BlogPostList from '../BlogPostList';
import VerticalSpace from '../../../components/ui/VerticalSpace';

const StyledTitle = withFiletto(
    styled.h2`
        margin: calc(var(--space-unit) * 6) 0;
        font-size: var(--font-size-x-large);
    `,
    {},
);

export default function BlogPage({
    posts,
    category,
    categories,
    route,
    pagination,
}) {
    let title = 'Blog';
    if (category) {
        title = category;
    }
    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title={title}
                    slogan={vars.siteName}
                    description="L’elenco completo di tutte le relazioni, con la mappa e la ricerca"
                    extraLinks={
                        <>
                            <link
                                rel="preconnect"
                                href="https://assets.ctfassets.net"
                                crossOrigin="true"
                            />
                            <link
                                rel="preconnect"
                                href="https://tile.thunderforest.com"
                                crossOrigin="true"
                            />
                        </>
                    }
                />
            }
        >
            <BlogPageTitle title={title} />
            <BlogTabs category={category} categories={categories} />
            <BlogMap category={category} />
            <BlogSearch category={category} />
            <Container>
                <StyledTitle>
                    {category || 'Tutte le relazioni'}
                    {pagination.page > 1 ? `, pagina ${pagination.page}` : ''}
                </StyledTitle>
                <BlogPostList posts={posts} />
                <VerticalSpace size={6} />
                <Pager pagination={pagination} />
                <VerticalSpace size={6} />
            </Container>
        </BaseLayout>
    );
}
