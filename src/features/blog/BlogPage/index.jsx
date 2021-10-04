import React from 'react';
import vars from '../../../vars';
import BaseLayout from '../../../components/layout/Base';
import Head from '../../../components/common/Head';
import BlogPageTitle from '../BlogPageTitle';
import BlogMap from '../BlogMap';
import BlogTabs from '../BlogTabs';

export default function BlogPage({ posts, category, categories, route }) {
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
            <BlogPageTitle title={title} />
            <BlogTabs category={category} categories={categories} />
            <BlogMap />
            <ul>
                {posts.map((post, i) => (
                    <li key={i}>{post.title}</li>
                ))}
            </ul>
        </BaseLayout>
    );
}
