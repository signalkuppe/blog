import React from 'react';
import { uniq, map } from 'lodash';
import BlogPage from '../features/blog/BlogPage';

export const permalink = '/blog/index.html';

export default function Blog({ route, posts }) {
    const categories = uniq(map(posts, 'category'));
    return <BlogPage route={route} posts={posts} categories={categories} />;
}
