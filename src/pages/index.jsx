import React from 'react';
import vars from '../vars';
import Head from '../components/common/Head';
import BaseLayout from '../components/layout/Base';

export const permalink = '/index.html';

export default function HomePage({ route }) {
    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title={vars.siteName}
                    slogan={vars.siteSlogan}
                    description="An awesome meta description"
                />
            }
        >
            <h1>{vars.siteName}</h1>
        </BaseLayout>
    );
}
