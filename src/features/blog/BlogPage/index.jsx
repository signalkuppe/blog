import React from 'react';
import styled from 'styled-components';
import { visuallyHidden } from '../../../theme';
import vars from '../../../vars';
import BaseLayout from '../../../components/layout/Base';
import Head from '../../../components/common/Head';
import Pager from '../../../components/ui/Pager';
import Bloglayout from '../Bloglayout';
import BlogMap from '../BlogMap';
import BlogMenu from '../BlogMenu';
import BlogSearch from '../BlogSearch';
import BlogPostList from '../BlogPostList';
import VerticalSpace from '../../../components/ui/VerticalSpace';

const StyledPageTitle = styled.h1`
    ${visuallyHidden}
`;

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
            <Bloglayout
                topBar={
                    <BlogMenu category={category} categories={categories} />
                }
                content={
                    <>
                        <StyledPageTitle>{title}</StyledPageTitle>
                        <BlogPostList posts={posts} />
                        <VerticalSpace size={4} />
                        <Pager pagination={pagination} />
                    </>
                }
                map={<BlogMap category={category} />}
                search={<BlogSearch category={category} />}
            />
        </BaseLayout>
    );
}
