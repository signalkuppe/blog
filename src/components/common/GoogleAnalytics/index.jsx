import React from 'react';
import { Script } from 'pequeno';
import client from './index.client.js';

export default function GoogleAnalytics() {
    return <Script inline>{client}</Script>;
}
