import React from 'react';
import PhotoPage from '../features/photo/PhotoPage';
import { portfolioLink, portfolioPaginationSize } from './portfolio';

export const paginate = {
    data: 'portfolio',
    size: 1,
};

export const portfolioPhotoLink = function (photo) {
    return `/portfolio/${photo.slug}/index.html`;
};

export const permalink = function (data) {
    const photo = data.pagination.items[0];
    return portfolioPhotoLink(photo);
};

let page = 0;

export default function PortfolioPhoto({ pagination, route }) {
    const photo = pagination.items[0];
    if (photo.index % portfolioPaginationSize === 1) {
        page++;
    }
    let backTo = `${portfolioLink(page)}`;
    return (
        <PhotoPage
            photo={photo}
            pagination={pagination}
            backTo={backTo}
            route={route}
        />
    );
}
