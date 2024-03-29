import React from 'react';
import styled from 'styled-components';
import BlogPostCard from '../BlogPostCard';

export default function BlogPostList({ posts }) {
    return (
        <PostGridList>
            {posts.map((post, i) => (
                <li key={i}>
                    <BlogPostCard post={post} />
                </li>
            ))}
        </PostGridList>
    );
}

const PostGridList = styled.ul`
    display: flex;
    flex-direction: column;
    > * + * {
        margin-top: calc(var(--space-unit) * 3);
    }
`;
