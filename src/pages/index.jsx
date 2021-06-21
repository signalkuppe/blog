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
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Molestiae, ad inventore. Eius <em>quos nesciunt qui</em> quia
                adipisci voluptates nulla ullam fugiat voluptatem dignissimos
                saepe doloremque impedit numquam cum, beatae veritatis.
            </p>
            <h2>This is a subtitle</h2>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Molestiae, ad inventore. Eius <strong>quos nesciunt qui</strong>
                quia adipisci voluptates nulla ullam fugiat voluptatem
                dignissimos saepe doloremque impedit numquam cum, beatae
                veritatis.
            </p>
        </BaseLayout>
    );
}
