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

export default function BlogPostCard({ post }) {
    return (
        <WrapperLink
            href={post.permalink}
            id={`js-post-${post.id}`}
            className="js-post"
            title="Leggi la relazione"
        >
            <ImageWrapper>
                <StyledImage
                    src={`${post.cover.src}?w=140&h=140&fm=webp&fit=thumb&q=50&f=center`}
                    alt={post.cover.alt}
                    width="200"
                    height="200"
                    loading="lazy"
                />
            </ImageWrapper>
            <ContentWrapper>
                <ContentHeader>
                    <PostDate>{post.dateShort}</PostDate>
                    <span aria-hidden="true">|</span>
                    <PostCategory>
                        <PostCategoryIcon category={post.category} left />
                        {post.category}
                    </PostCategory>
                </ContentHeader>
                <PostTitle>{post.title}</PostTitle>
                <PostAbstract>{post.description}</PostAbstract>
                <object aria-label="Leggi tutto">
                    <PostLink href={post.permalink}>Leggi tutto</PostLink>
                </object>
            </ContentWrapper>
        </WrapperLink>
    );
}

const WrapperLink = styled.a`
    display: flex;
    width: fit-content;
    color: inherit;
    @media (hover: hover) {
        :hover img {
            transform: rotate(-5deg);
            border-color: var(--color-primary);
        }
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
    gap: 0.5em;
`;

const PostCategory = styled.div`
    display: flex;
    align-items: center;
`;

const PostDate = styled.div``;

const PostTitle = styled.h2`
    ${headingsStyles};
    line-height: 1.3;
    font-size: ${headingsSize.h2};
    margin: 0;
    margin-bottom: calc(var(--space-unit) / 2);
    @media ${device.desktop} {
        font-size: var(--font-size-large);
    }
    @media ${device.largeDesktop} {
        font-size: var(--font-size-x-large);
    }
`;

const PostAbstract = styled.p`
    font-size: var(--font-size-small);
    margin: 0;
    max-width: 55ch;
`;

const PostLink = styled.a`
    font-size: var(--font-size-small);
    display: inline-block;
    margin-top: calc(var(--space-unit) / 2);
    ${linksStyles};
`;
