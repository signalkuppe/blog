import React from 'react';
import styled from 'styled-components';
import vars from '../../../vars';
import HomePageLayout from '../../../components/layout/HomePage';
import Head from '../../../components/common/Head';
import PageTitle from '../../../components/ui/PageTitle';
import VerticalSpace from '../../../components/ui/VerticalSpace';
import HorizontalRule from '../../../components/ui/HorizontalRule';
import BlogPostCard from '../../../features/blog/BlogPostCard';

const StyledH2 = styled.h2`
    font-size: var(--font-size-large);
`;

export default function HomePage({ route, lastPost }) {
    return (
        <HomePageLayout
            route={route}
            head={
                <Head
                    title={vars.siteName}
                    slogan={vars.siteSlogan}
                    description={vars.description}
                />
            }
        >
            <PageTitle small>Piacere Matteo!</PageTitle>
            <VerticalSpace size={2} />
            <p>
                La <strong>montagna</strong> è la mia grande passione. È stato
                mio papà a introdurmi a questo magico mondo e, da allora, non ho
                mai smesso di cercare nuove avventure. Questo blog è un semplice
                diario di tutte le mie gite, spero possa esservi utile per
                scoprire nuovi itinerari.
            </p>
            <p>
                Sono un semplice <strong>appassionato di fotografia, </strong>
                senza alcuna velleità professionale. Potete utilizzare tutte le
                mie foto come volete. Non avete neanche l’obbligo di citare la
                fonte ma un gesto di cortesia verrà apprezzato sicuramente.
            </p>
            <p>
                Lavoro come un <strong>front-end engineer.</strong> Trasformo un
                design in un’applicazione web, con particolare attenzione alla
                scomposizione in componenti. Utilizzo principalmente{' '}
                <a href="https://reactjs.org/">React</a>,{' '}
                <a href="https://storybook.js.org/">Storybook</a> e{' '}
                <a href="https://styled-components.com/">Styled Components</a> .
                Quando possibile cerco di non usare alcun framework. Amo{' '}
                <a href="https://en.wikipedia.org/wiki/CSS">css,</a> credo sia
                un linguaggio meraviglioso.
            </p>
            <p>
                <a
                    href="https://it.wikipedia.org/wiki/Punta_Gnifetti"
                    rel="noopener"
                >
                    Signalkuppe
                </a>
                <em> — il mio nickname — </em> è il nome in tedesco della Punta
                Gnifetti.
            </p>
            <p>
                <a href="/contatti" rel="noopener">
                    Contattatemi
                </a>{' '}
                per parlare di un vostro progetto o di montagna!
            </p>

            <HorizontalRule size={3} />
            <StyledH2>Ultima relazione</StyledH2>
            <VerticalSpace size={2} />
            <BlogPostCard post={lastPost} />
        </HomePageLayout>
    );
}
