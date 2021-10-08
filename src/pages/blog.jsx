import React from 'react';
import { uniq, map } from 'lodash';
import BlogPage from '../features/blog/BlogPage';

export const paginate = {
    data: 'posts',
    size: 16,
};

export const blogPermalink = function (page) {
    if (page === 1) {
        return `/blog/index.html`;
    } else {
        return `/blog/${page}/index.html`;
    }
};

export const permalink = function (data) {
    const { page } = data.pagination;
    return blogPermalink(page);
};

export default function Blog({ route, posts, pagination }) {
    const categories = uniq(map(posts, 'category'));
    return (
        <BlogPage
            route={route}
            posts={pagination.items}
            categories={categories}
            pagination={pagination}
        />
    );
}
