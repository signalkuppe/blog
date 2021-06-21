import React from 'react';

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
    return <nav>nav</nav>;
}
