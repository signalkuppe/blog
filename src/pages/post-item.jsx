import React from 'react';
import PostPage from '../features/post/PostPage';

export const paginate = {
    data: 'posts',
    size: 1,
};

export const permalink = function (data) {
    const post = data.pagination.items[0];
    return `/${post.slug}/index.html`;
};

export default function PostItem({ pagination, route }) {
    const post = pagination.items[0];
    return <PostPage route={route} post={post} />;
}
