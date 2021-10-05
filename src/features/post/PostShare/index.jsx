import React from 'react';
import { Script } from 'pequeno';
import styled from 'styled-components';
import vars from '../../../vars';
import Container from '../../../components/layout/Container';
import Icon from '../../../components/ui/Icon';
import Link from '../../../components/ui/Link';
import List from '../../../components/ui/List';
import Button from '../../../components/ui/Button';
import VerticalSpace from '../../../components/ui/VerticalSpace';
import Facebook from '../../../public/icons/Facebook.svg';
import Twitter from '../../../public/icons/Twitter.svg';
import Whatsapp from '../../../public/icons/Whatsapp.svg';
import PrintIcon from '../../../public/icons/Print.svg';
import client from './index.client.js';

const StyledSocialLink = styled(Link)`
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
    * {
        pointer-events: none;
    }
`;

export default function PostShare({ post }) {
    const { title, permalink } = post;
    const shareLinks = [
        {
            id: 'facebook',
            title: 'Condividi su Facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${permalink}&amp;title=${title}`,
            icon: Facebook,
        },
        {
            id: 'twitter',
            title: 'Condividi su Twitter',
            url: `https://twitter.com/intent/tweet?text=${title}&amp;url=${permalink}&amp;via=${vars.twitterAuthor}`,
            icon: Twitter,
        },
        {
            id: 'whatsapp',
            title: 'Condividi su Whatsapp',
            url: `whatsapp://send?text=${permalink}`,
            icon: Whatsapp,
        },
    ];
    return (
        <>
            <Container as="section">
                <VerticalSpace size={3} />
                <List reset inline gap={1}>
                    {shareLinks.map((link, i) => (
                        <li key={i}>
                            <StyledSocialLink
                                href={link.url}
                                title={link.title}
                                aria-label={link.title}
                                target="_blank"
                                rel="noopener"
                                inherit
                                noUnderline
                                social={link.id}
                                className="js-postShare-link"
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
                    <a href="http://eepurl.com/dgiWQH">
                        Iscriviti alla newsletter
                    </a>
                </p>
                <VerticalSpace size={12} />
            </Container>
            <Script>{client}</Script>
        </>
    );
}
