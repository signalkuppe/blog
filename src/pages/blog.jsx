import React from 'react';
import BlogPage from '../features/blog/BlogPage';

export const permalink = '/blog/index.html';

export default function HomePage({ route, posts }) {
    return <BlogPage route={route} posts={posts} />;
}
