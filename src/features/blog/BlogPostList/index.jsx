import React from 'react';
import styled from 'styled-components';
import BlogPostCard from '../BlogPostCard';
import List from '../../../components/ui/List';

const PostGridList = styled(List)`
    display: flex;
    flex-direction: column;
    > * + * {
        margin-top: calc(var(--space-unit) * 6);
    }
`;

export default function BlogPostList({ posts }) {
    return (
        <PostGridList reset>
            {posts.map((post, i) => (
                <li key={i}>
                    <BlogPostCard post={post} />
                </li>
            ))}
        </PostGridList>
    );
}
