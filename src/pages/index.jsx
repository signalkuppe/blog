import React from 'react';
import vars from '../vars';
import BaseLayout from '../components/layout/Base';
import Head from '../components/common/Head';

export const permalink = '/index.html';

export default function HomePage({ route, posts }) {
    const post = posts[1];

    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title={vars.siteName}
                    slogan={vars.siteSlogan}
                    description={vars.description}
                />
            }
        >
            <ul>
                {posts.map((post, i) => (
                    <li key={i}>
                        <a href={post.slug}>{post.title}</a>
                    </li>
                ))}
            </ul>
        </BaseLayout>
    );
}
