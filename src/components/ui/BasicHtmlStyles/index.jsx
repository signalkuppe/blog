import React from 'react';
import styled from 'styled-components';
import {
    headingsSize,
    headingsStyles,
    linksStyles,
    imagesStyles,
    italicStyles,
    boldStyles,
    figCaptionStyles,
} from '../../../theme';

/** Injects basic html styles in a component  */

const Container = styled.div`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        ${headingsStyles};
    }

    h1 {
        font-size: ${headingsSize.h1};
    }

    h2 {
        font-size: ${headingsSize.h2};
    }

    h3 {
        font-size: ${headingsSize.h3};
    }

    p {
        margin-bottom: calc(var(--space-unit) * 1.5);
    }

    ul {
        margin-bottom: calc(var(--space-unit) * 2);
        padding-left: var(--space-unit);
        list-style-type: disc;
    }

    li::marker {
        color: var(--color-links);
    }

    b,
    strong {
        ${boldStyles}
    }

    i,
    em {
        ${italicStyles};
    }

    a {
        ${linksStyles};
    }

    hr {
        height: 2px;
        border: none;
        background: var(--color-background-light);
    }

    figure {
        margin-bottom: calc(var(--space-unit) * 1.5);
    }

    img {
        ${imagesStyles}
    }

    figcaption {
        ${figCaptionStyles}
    }

    p + h3,
    img + p {
        margin-top: calc(var(--space-unit) * 2);
    }

    h3 + figure {
        margin-top: calc(var(--space-unit) * 0.5);
    }

    ul li {
        margin-bottom: calc(var(--space-unit) / 2);
        p {
            margin: 0;
        }
    }

    /* youtube embeds */

    [data-youtube-embed] {
        aspect-ratio: 16 / 9;
        width: 100%;
    }
`;

export default function BasicHtmlStyles({ children }) {
    return <Container>{children}</Container>;
}
