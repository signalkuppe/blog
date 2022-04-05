import React from 'react';
import styled from 'styled-components';
import {
    headingsSize,
    headingsStyles,
    linksStyles,
    imagesStyles,
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

    p + h3,
    img + p {
        margin-top: calc(var(--space-unit) * 2);
    }

    h3 + figure {
        margin-top: calc(var(--space-unit) * 0.5);
    }

    ul {
        margin-bottom: calc(var(--space-unit) * 2);
        padding-left: var(--space-unit);
        list-style-type: disc;
    }

    ul li {
        margin-bottom: calc(var(--space-unit) / 2);
        p {
            margin: 0;
        }
    }

    li::marker {
        color: var(--color-links);
    }

    b,
    strong {
        font-weight: 700;
        color: var(--color-text-light-accent);
    }

    i,
    em {
        font-family: var(--font-family-cursive);
        color: var(--color-primary);
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
        font-family: var(--font-family-cursive);
        color: var(--color-text-light-accent);
        padding-top: 0.5em;
        background: var(--color-background);
    }

    @media screen {
        > p:first-of-type:first-letter {
            font-family: var(--font-family-drop-cap);
            font-size: var(--font-size-xxxx-large);
            color: var(--color-text-light-accent);
            float: left;
            line-height: 0.7em;
            padding-top: 10px;
            padding-right: 0.2em;
            padding-left: 0;
        }
    }
`;

export default function BasicHtmlStyles({ children }) {
    return <Container>{children}</Container>;
}
