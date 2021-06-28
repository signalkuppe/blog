import React from 'react';
import vars from '../../../vars';
import BaseLayout from '../../../components/layout/Base';
import Head from '../../../components/common/Head';
import List from '../../../components/ui/List';
import PostHero from '../PostHero';
import PostCover from '../PostCover';

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
            <List reset inline>
                {pagination.prev && (
                    <li>
                        <a href={pagination.prev}>&laquo; Prev</a>
                    </li>
                )}
                {pagination.next && (
                    <li>
                        <a href={pagination.next}>Next &raquo;</a>
                    </li>
                )}
            </List>
        </BaseLayout>
    );
}
