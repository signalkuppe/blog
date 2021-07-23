import React from 'react';
import { Script } from 'pequeno';
import styled from 'styled-components';
import vars from '../../../vars';
import Container from '../../../components/layout/Container';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/ui/Icon';
import Link from '../../../components/ui/Link';
import Facebook from '../../../components/ui/Icon/icons/Facebook.svg';

export default function PostShare({ post }) {
    const { slug, title } = post;
    const shareLinks = [
        {
            title: 'Condividi su Facebook',
            url: 'https://www.facebook.com/sharer/sharer.php?u=',
            icon: Facebook,
        },
    ];
    return (
        <Container as="section">
            <ul>
                {shareLinks.map((link, i) => (
                    <li key={i}>
                        <Link
                            href={`${link.url}${vars.websiteUrl}/${slug}`}
                            title={link.title}
                            aria-label={link.title}
                            target="_blank"
                            rel="noopener"
                        >
                            <Icon icon={link.icon} />
                        </Link>
                    </li>
                ))}
            </ul>
        </Container>
    );
}
