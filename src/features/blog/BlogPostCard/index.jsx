import React from 'react';
import styled from 'styled-components';
import {
    device,
    headingsSize,
    headingsStyles,
    linksStyles,
    imagesStyles,
} from '../../../theme';
import PostCategoryIcon from '../../post/PostCategoryIcon';

const WrapperLink = styled.a`
    display: flex;
    color: inherit;
    :hover img {
        transform: rotate(-5deg);
        border-color: var(--color-primary);
    }
`;
const ImageWrapper = styled.figure`
    width: 120px;
    margin-right: var(--space-unit);
    flex-shrink: 0;
    @media ${device.mobile} {
        width: 80px;
    }
`;
const StyledImage = styled.img`
    ${imagesStyles};
    transition: all 0.1s linear;
    border: 4px solid var(--color-text-light-accent);
    border-radius: var(--border-radius);
    @media ${device.atLeastTablet} {
        border-width: 6px;
    }
`;
const ContentWrapper = styled.div``;

const ContentHeader = styled.div`
    display: flex;
    align-items: center;
    text-transform: uppercase;
    font-size: var(--font-size-x-small);
    margin-bottom: 0.5em;
`;

const PostCategory = styled.div`
    display: flex;
    align-items: center;
    font-weight: 500;
`;

const PostDate = styled.div`
    margin-left: var(--space-unit);
`;

const PostTitle = styled.h3`
    ${headingsStyles};
    font-size: ${headingsSize.h2};
    margin: 0;
    margin-bottom: calc(var(--space-unit) / 2);
    @media ${device.mobile} {
        font-size: var(--font-size-large);
    }
`;

const PostAbstract = styled.p`
    margin: 0;
    max-width: 55ch;
    @media ${device.mobile} {
        font-size: var(--font-size-small);
    }
`;

const PostLink = styled.a`
    display: inline-block;
    margin-top: calc(var(--space-unit) / 2);
    ${linksStyles};
`;

export default function BlogPostCard({ post }) {
    return (
        <WrapperLink
            href={post.permalink}
            id={`js-post-${post.id}`}
            className="js-post"
        >
            <ImageWrapper>
                <StyledImage
                    src={`${post.cover.src}?w=300&h=300&fm=webp&fit=thumb&q=80&f=center`}
                    alt={post.cover.alt}
                    width="300"
                    height="300"
                    loading="lazy"
                />
            </ImageWrapper>
            <ContentWrapper>
                <ContentHeader>
                    <PostCategory>
                        <PostCategoryIcon category={post.category} left />
                        {post.category}
                    </PostCategory>
                    <PostDate>{post.dateShort}</PostDate>
                </ContentHeader>
                <PostTitle>{post.title}</PostTitle>
                <PostAbstract>{post.description}</PostAbstract>
                <object>
                    <PostLink>Leggi tutto</PostLink>
                </object>
            </ContentWrapper>
        </WrapperLink>
    );
}
