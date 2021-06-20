import React from 'react';
import vars from '../../../vars';
import BaseLayout from '../../../components/layout/Base';
import Head from '../../../components/common/Head';
import List from '../../../components/ui/List';
import Link from '../../../components/ui/Link';
import PostCover from '../PostCover';

export default function PostPage({ post, pagination, route }) {
    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title={post.title}
                    slogan={vars.siteName}
                    description="An awesome meta description"
                />
            }
        >
            <PostCover cover={post.cover} />
            <List reset inline>
                {pagination.prev && (
                    <li>
                        <Link href={pagination.prev}>&laquo; Prev</Link>
                    </li>
                )}
                {pagination.next && (
                    <li>
                        <Link href={pagination.next}>Next &raquo;</Link>
                    </li>
                )}
            </List>
        </BaseLayout>
    );
}
