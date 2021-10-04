import React from 'react';
import vars from '../../../vars';
import BaseLayout from '../../../components/layout/Base';
import Head from '../../../components/common/Head';
import PostHero from '../PostHero';
import PostCover from '../PostCover';
import PostSections from '../PostSections';

export default function PostPage({ post, route }) {
    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title={post.title}
                    slogan={vars.siteName}
                    description={post.description}
                    extraLinks={
                        <>
                            <link
                                rel="preconnect"
                                href="https://assets.ctfassets.net"
                                crossOrigin={true}
                            />
                            <link
                                rel="preconnect"
                                href="https://tile.thunderforest.com"
                                crossOrigin={true}
                            />
                        </>
                    }
                />
            }
        >
            <PostHero post={post} />
            <PostCover cover={post.cover} />
            <PostSections post={post} />
        </BaseLayout>
    );
}
