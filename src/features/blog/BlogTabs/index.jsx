import React from 'react';
import styled from 'styled-components';
import Tabs from '../../../components/ui/Tabs';
import Icon from '../../../components/ui/Icon';
import AllIcon from '../../../components/ui/Icon/icons/All.svg';
import PostCategoryIcon from '../../post/PostCategoryIcon';
import { categoryPermalink } from '../../../pages/blog-by-category';
import { permalink as blogPermalink } from '../../../pages/blog';

const StyledTabs = styled(Tabs)`
    background: var(--color-background-light);
    justify-content: center;
`;

export default function BlogTabs({ categories, category }) {
    const tabs = [
        {
            text: 'Tutti',
            href: blogPermalink,
            textLeft: <Icon icon={AllIcon} left s />,
        },
        ...categories.map((cat) => ({
            text: cat,
            href: categoryPermalink(1, cat),
            textLeft: <PostCategoryIcon category={cat} left />,
        })),
    ];

    const active = category ? categories.indexOf(category) + 1 : 0;
    return <StyledTabs items={tabs} active={active} />;
}
