import React from 'react';
import styled from 'styled-components';
import PageTitle from '../../../components/ui/PageTitle';

const Hero = styled.header`
    height: calc(100vh - var(--header-height));
    outline: 1px solid pink;
`;

export default function PostHero({ post }) {
    const { title } = post;
    return (
        <Hero>
            <PageTitle>{title}</PageTitle>
        </Hero>
    );
}
