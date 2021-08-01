import React from 'react';
import { Script } from 'pequeno';
import styled from 'styled-components';
import vars from '../../../vars';
import Icon from '../../../components/ui/Icon';
import Link from '../../../components/ui/Link';

const LinkWrapper = styled(Link)`
    display: block;
    max-width: 400px;
`;
const ContentWrapper = styled.article`
    position: relative;
    box-shadow: 0 19px 38px rgb(0 0 0 / 30%), 0 15px 12px rgb(0 0 0 / 20%);
    img {
        object-fit: cover;
        aspect-ratio: 2/3;
    }
`;

const Bottom = styled.header`
    position: absolute;
    bottom: 0;
    left: 0;
`;
const Title = styled.h2``;

export default function PostCard({ post }) {
    const { title, permalink, cover } = post;
    const imgUrl = function (width, format) {
        return `${cover.url}?w=${width}&h=${Math.round(
            width * 1.5,
        )}&fm=${format}&fit=thumb&q=80&f=${cover.focus}`;
    };
    return (
        <LinkWrapper inherit noUnderline>
            <ContentWrapper>
                <picture>
                    <source type="image/webp" src={imgUrl(600, 'webp')} />
                    <img
                        src={imgUrl(600, 'jpg')}
                        alt={cover.alt}
                        decoding="async"
                        loading="lazy"
                        width="600"
                        height="900"
                    />
                </picture>
                <Bottom>
                    <Title>{title}</Title>
                </Bottom>
            </ContentWrapper>
        </LinkWrapper>
    );
}
