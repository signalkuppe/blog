import React from 'react';
import styled from 'styled-components';
import { Script } from 'pequeno';
import List from '../../../components/ui/List';
import Image from '../../../components/ui/Image';
import Link from '../../../components/ui/Link';
import { device } from '../../../theme';
import client from './index.client';

const Wrapper = styled.section``;
const StyledList = styled(List)`
    display: grid;
    grid-gap: var(--space-unit);
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    @media ${device.mobileAndTablet} {
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    }
`;

const StyledListItem = styled.li`
    background: var(--color-background-light);
    width: 150px;
    height: 150px;
    aspect-ratio: 1/1;
    @media ${device.mobileAndTablet} {
        width: 80px;
        height: 80px;
    }
`;

export default function PostGallery({ gallery }) {
    const imgThumbUrl = function (url, format) {
        return `${url}?w=300&h=300&fm=${format}&fit=thumb&q=80`;
    };
    return (
        <>
            <Wrapper>
                <StyledList reset id="js-postGallery">
                    {gallery.map((item, i) => (
                        <StyledListItem key={i}>
                            <Link href={item.url}>
                                <picture>
                                    <source
                                        srcSet={imgThumbUrl(item.src, 'webp')}
                                        type="image/webp"
                                    />
                                    <source
                                        srcSet={imgThumbUrl(item.src, 'jpg')}
                                        type="image/jpeg"
                                    />
                                    <Image
                                        src={imgThumbUrl(item.src, 'jpg')}
                                        alt={item.alt}
                                        width={item.width}
                                        height={item.height}
                                        loading="lazy"
                                        className="js-postGallery-item"
                                    />
                                </picture>
                            </Link>
                        </StyledListItem>
                    ))}
                </StyledList>
            </Wrapper>
            <Script
                libs={[
                    {
                        where: 'body',
                        tag: '<script src="/libs/lightgallery.js" />',
                    },
                    {
                        where: 'head',
                        tag: '<link rel="stylesheet" href="/libs/lightgallery.css" />',
                    },
                ]}
            >
                {client}
            </Script>
        </>
    );
}
