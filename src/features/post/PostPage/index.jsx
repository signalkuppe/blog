import React from 'react';
import vars from '../../../vars';
import BaseLayout from '../../../components/layout/Base';
import Head from '../../../components/common/Head';
import PostLayout from '../PostLayout';
import PostHero from '../PostHero';
import PostCover from '../PostCover';
import PostSections from '../PostSections';

export default function PostPage({ post, route, prev, next }) {
    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title={post.title}
                    slogan={vars.siteName}
                    description={post.description}
                    ogImage={`${post.cover.src}?w=1280&h=630&fm=jpg&q=80`}
                    twitterCardImage={`${post.cover.src}?w=1200&h=600&fm=jpg&q=80`}
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
            <PostLayout
                hero={<PostHero post={post} />}
                content={
                    <>
                        <PostCover cover={post.cover} />
                        <PostSections post={post} prev={prev} next={next} />
                    </>
                }
            />
        </BaseLayout>
    );
}
