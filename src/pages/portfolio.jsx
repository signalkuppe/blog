import React from 'react';
import PortfolioPage from '../features/portfolio/PortfolioPage';

export const portfolioPaginationSize = 16;

export const paginate = {
    data: 'portfolio',
    size: portfolioPaginationSize,
};

export const portfolioLink = function (page) {
    page = page || 1;
    if (page === 1) {
        return `/portfolio/index.html`;
    } else {
        return `/portfolio/${page}/index.html`;
    }
};

export const permalink = function (data) {
    const { page } = data.pagination;
    return portfolioLink(page);
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
