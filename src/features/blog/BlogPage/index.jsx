import React from 'react';
import styled from 'styled-components';
import { visuallyHidden, boldStyles } from '../../../theme';
import vars from '../../../vars';
import BaseLayout from '../../../components/layout/Base';
import Head from '../../../components/common/Head';
import Pager from '../../../components/ui/Pager';
import Bloglayout from '../BlogLayout';
import BlogMap from '../BlogMap';
import BlogMenu from '../BlogMenu';
import BlogSearch from '../BlogSearch';
import BlogPostList from '../BlogPostList';
import VerticalSpace from '../../../components/ui/VerticalSpace';

const StyledPageTitle = styled.h1`
    ${visuallyHidden}
`;

const PostCount = styled.p`
    margin-top: calc(var(--space-unit) * 2);
    strong {
        ${boldStyles}
    }
`;

export default function BlogPage({
    posts,
    postsCount,
    category,
    categories,
    route,
    pagination,
}) {
    let title = 'Relazioni';
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
                                crossOrigin="anonymous"
                            />
                            <link
                                rel="preconnect"
                                href="https://tile.thunderforest.com"
                                crossOrigin="anonymous"
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
                        {!category && (
                            <PostCount>
                                <strong>{postsCount}</strong>{' '}
                                <span>relazioni</span>
                            </PostCount>
                        )}
                    </>
                }
                map={<BlogMap category={category} />}
                search={<BlogSearch category={category} />}
            />
        </BaseLayout>
    );
}
