import React from 'react';
import styled, { css } from 'styled-components';
import { boldStyles, device, visuallyHidden } from '../../../theme';
import vars from '../../../vars';
import withFiletto from '../../../components/hoc/withFiletto';
import BaseLayout from '../../../components/layout/Base';
import Head from '../../../components/common/Head';
import Pager from '../../../components/ui/Pager';
import Fab from '../../../components/ui/Fab';
import Icon from '../../../components/ui/Icon';
import SearchIcon from '../../../public/icons/Search.svg';
import Bloglayout from '../BlogLayout';
import BlogMap from '../BlogMap';
import BlogMenu from '../BlogMenu';
import BlogPostList from '../BlogPostList';
import VerticalSpace from '../../../components/ui/VerticalSpace';

const StyledPageTitle = withFiletto(styled.h1`
    text-transform: uppercase;
    ${boldStyles}
    margin-bottom: calc(var(--space-unit) * 1.5);
    ${(props) =>
        !props.category &&
        css`
            ${visuallyHidden}
        `}
    @media ${device.desktop} {
        ${visuallyHidden}
    }
`);

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
                        <StyledPageTitle category={category}>
                            {title}
                        </StyledPageTitle>
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
                fab={
                    <Fab
                        as="a"
                        href="/cerca"
                        title="Cerca una relazione"
                        aria-label="Cerca una relazione"
                    >
                        <Icon icon={SearchIcon} l />
                    </Fab>
                }
            />
        </BaseLayout>
    );
}
