import React from 'react';
import PortfolioPage from '../features/portfolio/PortfolioPage';

export const paginate = {
    data: 'portfolio',
    size: 16,
};

export const portfolioPermalink = function (page) {
    if (page === 1) {
        return `/portfolio/index.html`;
    } else {
        return `/portfolio/${page}/index.html`;
    }
};

export const permalink = function (data) {
    const { page } = data.pagination;
    return portfolioPermalink(page);
};

export default function Portfolio({ route, pagination }) {
    return (
        <PortfolioPage
            route={route}
            photos={pagination.items}
            pagination={pagination}
        />
    );
}
