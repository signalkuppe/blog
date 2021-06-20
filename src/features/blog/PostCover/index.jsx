import React from 'react';
import styled from 'styled-components';

const StyledFigure = styled.figure`
    margin: 0;
    img {
        width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
    }
    figcaption {
        font-style: normal;
        font-size: 5rem;
        font-weight: 800;
        transform: translateY(50%);
        font-family: 'mauerbutlerstencil';
    }
`;

export default function PostCover({ cover }) {
    const { alt, title, url } = cover;
    return (
        <StyledFigure>
            <figcaption>{title}</figcaption>
            <picture>
                <source
                    type="image/webp"
                    srcSet={`
                      ${url}?w=600&fm=webp 600w,
                      ${url}?w=1600&fm=webp 1600w,
                      ${url}?w=2500&fm=webp 2500w
                    `}
                    sizes="
                      (max-width: 768px) calc(100vw - 3em),
                      (max-width: 1387px) calc(100vw - 3em),
                      (min-width: 1388px) calc(100vw - 3em)"
                />
                <img
                    srcSet={`
                      ${url}?w=600&fm=jpg&fl=progressive  600w,
                      ${url}?w=1600&fm=jpg&fl=progressive 1600w,
                      ${url}?w=2500&fm=jpg&fl=progressive  2500w
                    `}
                    sizes="
                      (max-width: 768px) calc(100vw - 3em),
                      (max-width: 1387px) calc(100vw - 3em),
                      (min-width: 1388px) calc(100vw - 3em)"
                    src={url}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    width="1243"
                    height="1500"
                />
            </picture>
        </StyledFigure>
    );
}
