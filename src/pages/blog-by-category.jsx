import React from 'react';
import { map, uniq } from 'lodash';
import BlogPage from '../features/blog/BlogPage';

export const paginate = {
    data: 'posts',
    size: 10,
    groupBy: 'category',
};

export const categoryLink = function (page, group) {
    group = group.toLowerCase();
    page = page || 1;
    if (page === 1) {
        return `/blog/${group}/index.html`;
    } else {
        return `/blog/${group}/${page}/index.html`;
    }
};

export const permalink = function (data) {
    const { page, group } = data.pagination;
    return categoryLink(page, group);
};

export default function BlogByCategory({ route, pagination, posts }) {
    const categories = uniq(map(posts, 'category'));
    return (
        <BlogPage
            route={route}
            posts={pagination.items}
            category={pagination.group}
            categories={categories}
            pagination={pagination}
        />
    );
}
