import React from 'react';
import styled, { css } from 'styled-components';
import { device, visuallyHidden } from '../../../theme';
import List from '../../../components/ui/List';
import Link from '../../../components/ui/Link';
import PostCategoryIcon from '../../post/PostCategoryIcon';
import { categoryPermalink } from '../../../pages/blog-by-category';
import { blogPermalink } from '../../../pages/blog';

const StyledList = styled(List)`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background: var(--color-background-light);
    height: 100%;
    padding: 0 var(--space-unit);
`;
const StyledLi = styled.li`
    height: 100%;
`;
const StyledLink = styled(Link)`
    font-stretch: var(--narrow-font-stretch);
    font-weight: 400;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 2em;
    color: ${(props) =>
        props.active ? `var(--color-text-light-accent)` : `var(--color-text)`};
    @media ${device.atLeastTablet} {
        font-size: var(--font-size-medium);
    }
    :first-child {
        padding-left: 0;
    }
`;

const TabIcon = styled.span`
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
const TabText = styled.span`
    ${(props) =>
        props.active &&
        css`
            box-shadow: 0px 0.2em 0px var(--color-primary);
        `}
    :hover {
        ${(props) =>
            !props.active &&
            css`
                box-shadow: 0px 0.2em 0px var(--color-secondary);
            `}
    }
    ${(props) =>
        !props.first &&
        css`
            @media ${device.mobileAndTablet} {
                ${visuallyHidden};
            }
        `}

    transition: all linear 0.1s;
`;

export default function BlogTabs({ categories, category }) {
    const tabs = [
        {
            text: 'Tutte',
            href: blogPermalink(1),
            title: 'Tutte le relazioni',
        },
        ...categories.map((cat) => ({
            text: cat,
            href: categoryPermalink(1, cat),
            icon: <PostCategoryIcon category={cat} left />,
            title: `Solo ${cat}`,
        })),
    ];

    const active = category ? categories.indexOf(category) + 1 : 0;

    return (
        <StyledList reset id="js-blogTabs" {...props}>
            {tabs.map((tab, i) => (
                <StyledLi key={i}>
                    <StyledLink
                        noUnderline
                        href={tab.href}
                        active={i === active}
                        title={tab.title}
                    >
                        <TabIcon active={i === active}>{tab.icon}</TabIcon>
                        <TabText first={i === 0} active={i === active}>
                            {tab.text}
                        </TabText>
                    </StyledLink>
                </StyledLi>
            ))}
        </StyledList>
    );
}
