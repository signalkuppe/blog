import React from 'react';
import { Script } from 'pequeno';
import client from './index.client.js';

export default function CommonScripts() {
    return (
        <Script
            libs={[
                {
                    where: 'body',
                    tag: '<script src="/js/utils.js" />',
                },
                {
                    where: 'body',
                    tag: '<script defer src="/libs/quicklink.js" />',
                },
            ]}
        >
            {client}
        </Script>
    );
}
