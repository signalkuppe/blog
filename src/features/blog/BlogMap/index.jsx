import React from 'react';
import styled from 'styled-components';
import { visuallyHidden } from '../../../theme';
import Tabs from '../../../components/ui/Tabs';

export default function BlogMap({ route }) {
    const tabs = [
        {
            href: '/blog/index.html',
            text: 'Tutti',
        },
        {
            href: '/blog/scialpinismo/index.html',
            text: 'Scialpinismo',
        },
        {
            href: '/blog/alpinismo/index.html',
            text: 'Alpinismo',
        },
        {
            href: '/blog/escursionismo/index.html',
            text: 'Escursionismo',
        },
        {
            href: '/blog/trail/index.html',
            text: 'Trail',
        },
        {
            href: '/blog/trekking/index.html',
            text: 'Trekking',
        },
        {
            href: '/blog/viaggi/index.html',
            text: 'Viaggi',
        },
    ];
    return (
        <div>
            e
            <Tabs items={tabs} active={1} />
        </div>
    );
}
