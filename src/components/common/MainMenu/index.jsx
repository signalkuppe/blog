import React from 'react';
import styled, { css } from 'styled-components';
import Logo from '../../ui/Logo';
import List from '../../ui/List';
import Link from '../../ui/Link';
import Icon from '../../ui/Icon';
import FacebookIcon from '../../ui/Icon/icons/Facebook.svg';
import TwitterIcon from '../../ui/Icon/icons/Twitter.svg';
import InstagramIcon from '../../ui/Icon/icons/Instagram.svg';
import GithubIcon from '../../ui/Icon/icons/Github.svg';
import vars from '../../../vars';
import { getVar, device } from '../../../theme';

const StyledNav = styled.nav`
    @media ${device.desktop} {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const LogoAndMenu = styled.div`
    @media ${device.desktop} {
        display: flex;
    }
`;

const LogoContainer = styled.h1`
    margin: 0;
    line-height: 1;
    transform: translateY(0.5rem);
    @media ${device.desktop} {
        margin-right: ${getVar('--space-unit')};
        width: 8rem;
    }
`;

const StyledList = styled(List)`
    @media ${device.desktop} {
        display: flex;
    }
`;

const StyledMenuListItem = styled.li`
    @media ${device.desktop} {
        display: flex;
        align-items: center;
        :not(:last-child)::after {
            display: block;
            content: '';
            width: 1.85em;
            height: 1px;
            background: ${getVar('--color-primary')};
        }
    }
`;

const StyledMenuLink = styled(Link)`
    @media ${device.desktop} {
        font-size: ${getVar('--font-size-x-small')};
        font-weight: 700;
        color: ${getVar('--color-text')};
        text-transform: uppercase;
        padding: 0.85em 1.25em;
        ${(props) =>
            props.active &&
            css`
                color: ${getVar('--color-primary')};
            `}
        :hover {
            color: ${getVar('--color-primary')};
        }
    }
`;

const StyledSocialLink = styled(Link)`
    @media ${device.desktop} {
        color: ${getVar('--color-text')};
        display: block;
        line-height: 1;
    }
`;

export default function MainMenu({ route }) {
    const links = [
        {
            href: '/index.html',
            text: 'Home',
            active: route.name === 'index',
        },
        {
            href: '/blog.html',
            text: 'Blog',
            active: route.name === 'posts' || route.name === 'post-item',
        },
        {
            href: '/portfolio.html',
            text: 'Portfolio',
            active: route.name === 'portfolio',
        },
        {
            href: '/contatti.html',
            text: 'Contatti',
            active: route.name === 'contact',
        },
    ];
    return (
        <StyledNav>
            <LogoAndMenu>
                <LogoContainer>
                    <Link href="/" title="signalkuppe.com">
                        <Logo />
                    </Link>
                </LogoContainer>
                <StyledList reset>
                    {links.map((link, i) => (
                        <StyledMenuListItem key={i}>
                            <StyledMenuLink
                                href={link.href}
                                active={link.active}
                            >
                                {link.text}
                            </StyledMenuLink>
                        </StyledMenuListItem>
                    ))}
                </StyledList>
            </LogoAndMenu>

            <List reset inline gap={0.35}>
                <li>
                    <StyledSocialLink
                        href={vars.facebook}
                        title="Visita la mia pagina Facebook"
                    >
                        <Icon icon={FacebookIcon} />
                    </StyledSocialLink>
                </li>
                <li>
                    <StyledSocialLink
                        href={vars.twitter}
                        title="Visita il mio profilo Twitter"
                    >
                        <Icon icon={TwitterIcon} />
                    </StyledSocialLink>
                </li>
                <li>
                    <StyledSocialLink
                        href={vars.instagram}
                        title="Visita il mio canale Instagram"
                    >
                        <Icon icon={InstagramIcon} />
                    </StyledSocialLink>
                </li>
                <li>
                    <StyledSocialLink
                        href={vars.github}
                        title="Visita la mia pagina su Github"
                    >
                        <Icon icon={GithubIcon} />
                    </StyledSocialLink>
                </li>
            </List>
        </StyledNav>
    );
}
