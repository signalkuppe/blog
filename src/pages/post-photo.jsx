import React from 'react';
import PhotoPage from '../features/photo/PhotoPage';
import { postLink } from './post-item';

export const paginate = {
    data: 'postPhotos',
    size: 1,
};

export const postPhotoLink = function (photo) {
    return `/${photo.post.slug}/${photo.slug}/index.html`;
};

export const permalink = function (data) {
    const photo = data.pagination.items[0];
    return postPhotoLink(photo);
};

export default function PostPhoto({ pagination, route }) {
    const photo = pagination.items[0];

    if (!pagination.prev || pagination.prevItem.post.slug !== photo.post.slug) {
        pagination.prev = pagination.prevItem = null;
    }
    if (!pagination.next || pagination.nextItem.post.slug !== photo.post.slug) {
        pagination.next = pagination.nextItem = null;
    }

    let backTo = `${postLink(photo.post)}#foto`;

    return (
        <PhotoPage
            photo={photo}
            pagination={pagination}
            backTo={backTo}
            route={route}
        />
    );
}
