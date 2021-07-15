import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Html } from 'pequeno';
import { imgStyles } from '../../../components/ui/Image';

const PostBody = styled.div`
    p:first-child:first-letter {
        font-family: var(--font-family-serif);
        font-size: var(--font-size-xxxx-large);
        color: var(--color-text-light-accent);
        float: left;
        line-height: 0.7em;
        padding-top: 4px;
        padding-right: 0.2em;
        padding-left: 0;
    }
`;

const PostBodyStyles = createGlobalStyle`
    /**
    * css styles for images inside post body: markup defined in lib/normalizePosts.js
    */
    .postImage {
        margin-bottom: calc(var(--space-unit) * 1.5);
        img {
          ${imgStyles};
        }
        figcaption {
          font-family:  var(--font-family-cursive);
          font-size: var(--font-size-small);
          font-weight:400;
          font-stretch: 50%;
          padding-top: 0.5em;
        }
    }
`;

export default function PostContent({ body }) {
    return (
        <PostBody>
            <PostBodyStyles />
            <Html>{body}</Html>
        </PostBody>
    );
}
