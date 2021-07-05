import React from 'react';
import vars from '../vars';
import BaseLayout from '../components/layout/Base';
import Head from '../components/common/Head';

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
                adipisci voluptates nulla ullam fugiat voluptatem dignissimos{' '}
                <a href="">saepe doloremque impedit</a> numquam cum, beatae
                veritatis. Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Molestiae, ad inventore. Eius <em>quos nesciunt qui</em>{' '}
                quia adipisci voluptates nulla ullam fugiat voluptatem
                dignissimos saepe doloremque impedit numquam cum, beatae
                veritatis. Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Molestiae, ad inventore. Eius <em>quos nesciunt qui</em>{' '}
                quia adipisci voluptates nulla ullam fugiat voluptatem
                dignissimos saepe doloremque impedit numquam cum, beatae
                veritatis.
            </p>
            <h2>This is a subtitle</h2>
            <img src="https://images.ctfassets.net/rotmy72mdop6/3wnzYLgxMDyQ0ygU9Z50pe/0e1c75c605a4605bcf4cce990b6946dd/scialpinismo-piz-vadret-cresta.jpg?fit=thumb&w=1440&fm=jpg&fl=progressive&q=70" />
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Molestiae, ad inventore. Eius <strong>quos nesciunt qui</strong>
                quia adipisci voluptates nulla ullam fugiat voluptatem
                dignissimos saepe doloremque impedit numquam cum, beatae
                veritatis. Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Molestiae, ad inventore. Eius{' '}
                <strong>quos nesciunt qui</strong>
                quia adipisci voluptates nulla ullam fugiat voluptatem
                dignissimos saepe doloremque impedit numquam cum, beatae
                veritatis. Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Molestiae, ad inventore. Eius{' '}
                <strong>quos nesciunt qui</strong>
                quia adipisci voluptates nulla ullam fugiat voluptatem
                dignissimos saepe doloremque impedit numquam cum, beatae
                veritatis. Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Molestiae, ad inventore. Eius{' '}
                <strong>quos nesciunt qui</strong>
                quia adipisci voluptates nulla ullam fugiat voluptatem
                dignissimos saepe doloremque impedit numquam cum, beatae
                veritatis.
            </p>
            <p>
                quia adipisci voluptates nulla ullam fugiat voluptatem
                dignissimos saepe doloremque impedit numquam cum, beatae
                veritatis.{' '}
            </p>
        </BaseLayout>
    );
}
