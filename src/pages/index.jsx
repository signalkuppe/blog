import React from 'react';
import HomePage from '../features/homepage/HomePage';

export const permalink = '/index.html';

export default function Index({ route, posts }) {
    return <HomePage route={route} lastPost={posts[0]} />;
}
