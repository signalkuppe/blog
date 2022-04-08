import React from 'react';
import { Script } from 'pequeno';
import styled from 'styled-components';
import vars from '../../../vars';
import { linksStyles } from '../../../theme';
import Container from '../../../components/layout/Container';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';
import VerticalSpace from '../../../components/ui/VerticalSpace';
import Facebook from '../../../public/icons/Facebook.svg';
import Twitter from '../../../public/icons/Twitter.svg';
import Whatsapp from '../../../public/icons/Whatsapp.svg';
import PrintIcon from '../../../public/icons/Print.svg';
import client from './index.client.js';

const StyledSocialLink = styled.a`
    color: var(--color-text-light-accent);
    display: block;
    :hover {
        color: ${(props) => {
            if (props.social === 'facebook') {
                return `var(--color-facebook)`;
            } else if (props.social === 'twitter') {
                return `var(--color-twitter)`;
            } else if (props.social === 'whatsapp') {
                return `var(--color-whatsapp)`;
            }
        }};
    }
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    gap: var(--space-unit);
    list-style: none;
`;

const NewsletterLink = styled.a`
    ${linksStyles}
`;

export default function PostShare({ post }) {
    const { title, permalink } = post;
    const fullPermalink = `${vars.websiteUrl}/${permalink}`;
    const shareLinks = [
        {
            id: 'facebook',
            title: 'Condividi su Facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${fullPermalink}&title=${title}`,
            icon: Facebook,
        },
        {
            id: 'twitter',
            title: 'Condividi su Twitter',
            url: `https://twitter.com/intent/tweet?url=${fullPermalink}&text=${title}&via=${vars.twitterAuthor}`,
            icon: Twitter,
        },
        {
            id: 'whatsapp',
            title: 'Condividi su Whatsapp',
            url: `whatsapp://send?text=${fullPermalink}`,
            icon: Whatsapp,
        },
    ];

    /* 
                                    link.id !== 'whatsapp'
                                        ? `window.open(${link.url}); return false;`
                                        : null  */
    return (
        <>
            <Container as="section">
                <VerticalSpace size={3} />
                <List>
                    {shareLinks.map((link, i) => (
                        <li key={i}>
                            <StyledSocialLink
                                className="js-postShare-link"
                                href={link.url}
                                data-social={link.id}
                                title={link.title}
                                aria-label={link.title}
                                social={link.id}
                            >
                                <Icon icon={link.icon} xl />
                            </StyledSocialLink>
                        </li>
                    ))}
                </List>
                <VerticalSpace size={3} />
                <Button className="js-postShare-print">
                    <Icon icon={PrintIcon} l left />
                    Stampa
                </Button>
                <VerticalSpace size={3} />
                <p>
                    Vuoi rimanere aggiornato sui nuovi post? <br />
                    <NewsletterLink href="http://eepurl.com/dgiWQH">
                        Iscriviti alla newsletter
                    </NewsletterLink>
                </p>
                <VerticalSpace size={12} />
            </Container>
            <Script>{client}</Script>
        </>
    );
}
