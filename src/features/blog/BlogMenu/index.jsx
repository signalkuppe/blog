import React from 'react';
import styled, { css } from 'styled-components';
import withFiletto from '../../../components/hoc/withFiletto';
import { device, visuallyHidden } from '../../../theme';
import PostCategoryIcon from '../../post/PostCategoryIcon';
import { categoryLink } from '../../../pages/blog-by-category';
import { blogLink } from '../../../pages/blog';

const StyledList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    list-style: none;
    background: var(--color-background-light);
    height: 100%;
    gap: 0.2em;
    padding-left: var(--space-unit);
    @media ${device.atLeastTablet} {
        gap: var(--space-unit);
    }
`;
const StyledLi = styled.li`
    height: 100%;
    margin: 0;
`;
const StyledLink = styled.a`
    font-stretch: var(--narrow-font-stretch);
    font-weight: 400;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 1.5em;
    color: ${(props) =>
        props.active ? `var(--color-text-light-accent)` : `var(--color-text)`};
    @media ${device.atLeastTablet} {
        font-size: var(--font-size-medium);
    }
    :first-child {
        padding-left: 0;
    }
    :hover {
        color: var(--color-text-light-accent);
    }
`;

const LinkIcon = styled.span`
    display: flex;
    align-items: center;
    @media ${device.mobileAndTablet} {
        ${(props) =>
            props.active &&
            css`
                color: var(--color-primary);
            `};
    }
`;
const LinkText = styled.span`
    ${(props) =>
        !props.first &&
        css`
            @media ${device.mobileAndTablet} {
                ${visuallyHidden};
            }
        `}
`;

const WithFilettoLinkText = withFiletto(LinkText);

export default function BlogMenu({ categories, category }) {
    const tabs = [
        {
            text: 'Tutte',
            href: blogLink(),
            title: 'Tutte le relazioni',
        },
        ...categories.map((cat) => ({
            text: cat,
            href: categoryLink(1, cat),
            icon: <PostCategoryIcon category={cat} left />,
            title: `Solo ${cat}`,
        })),
    ];

    const active = category ? categories.indexOf(category) + 1 : 0;

    return (
        <StyledList>
            {tabs.map((tab, i) => {
                let linkText = <LinkText first={i === 0}>{tab.text}</LinkText>;
                if (i === active) {
                    linkText = (
                        <WithFilettoLinkText first={i === 0}>
                            {tab.text}
                        </WithFilettoLinkText>
                    );
                }
                return (
                    <StyledLi key={i}>
                        <StyledLink
                            href={tab.href}
                            active={i === active}
                            title={tab.title}
                        >
                            <LinkIcon active={i === active}>
                                {tab.icon}
                            </LinkIcon>
                            {linkText}
                        </StyledLink>
                    </StyledLi>
                );
            })}
        </StyledList>
    );
}