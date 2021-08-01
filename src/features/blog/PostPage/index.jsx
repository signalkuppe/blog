import React from 'react';
import vars from '../../../vars';
import BaseLayout from '../../../components/layout/Base';
import Head from '../../../components/common/Head';
import PostHero from '../PostHero';
import PostCover from '../PostCover';
import PostSections from '../PostSections';
import PostPrevNext from '../PostPrevNext';

export default function PostPage({ post, pagination, route }) {
    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title={post.title}
                    slogan={vars.siteName}
                    description={post.description}
                />
            }
        >
            <PostHero post={post} />
            <PostCover cover={post.cover} />
            <PostSections post={post} />
            <PostPrevNext pagination={pagination} />
        </BaseLayout>
    );
}
