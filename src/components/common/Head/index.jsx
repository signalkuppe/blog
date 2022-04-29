import React from 'react';
import { Script } from 'pequeno';
import vars from '../../../vars';
import { vars as themeVars } from '../../../theme';
import serviceWorkerActivation from './index.client';

export default function Head({
    title,
    slogan,
    description,
    url,
    ogImage,
    ogType,
    twitterCardImage,
    extraLinks,
    extraMetas,
}) {
    let titleTag = `${title || '-title-'} | ${slogan || '-slogan-'}`;
    ogImage = ogImage || `https:${vars.homepageFoto}?w=1280&h=630&fm=jpg&q=80`;
    twitterCardImage =
        twitterCardImage ||
        `https:${vars.homepageFoto}?w=1200&h=600&fm=jpg&q=80`;

    ogType = ogType || 'website';

    return (
        <head>
            <meta charSet="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1"
            />
            <link
                rel="manifest"
                href="/manifest.json"
                crossOrigin="use-credentials"
            />
            {title && (
                <>
                    <title>{titleTag}</title>
                    <meta name="title" content={title} />
                    <meta name="og:title" content={titleTag} />
                    <meta name="twitter:title" content={titleTag} />
                </>
            )}
            {description && (
                <>
                    <meta name="description" content={description} />
                    <meta name="og:description" content={description} />
                    <meta name="twitter:description" content={description} />
                </>
            )}
            {url && (
                <>
                    <meta name="og:url" content={url} />
                    <meta name="twitter:url" content={url} />
                </>
            )}
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/img/favicons/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/img/favicons/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/img/favicons/favicon-16x16.png"
            />
            <link
                rel="mask-icon"
                href="/img/favicons/safari-pinned-tab.svg"
                color="#009fe3"
            />
            {extraLinks}
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="color-scheme" content="dark" />
            <meta
                name="theme-color"
                content={themeVars['--color-background']}
            />
            <meta name="generator" content="pequeno" />
            <meta name="og:type" content={ogType} />
            <meta name="twitter:site" content="@signalkuppe" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:image" content={twitterCardImage} />
            <meta name="og:image" content={ogImage} />
            {extraMetas}
            {vars.env !== 'production' && (
                <meta name="robots" content="noindex" />
            )}
            {vars.env !== 'development' && (
                <Script>{serviceWorkerActivation}</Script>
            )}
            {vars.env === 'production' && (
                <>
                    <link
                        rel="preconnect"
                        crossOrigin="anonymous"
                        href="https://www.googletagmanager.com"
                    />
                    <link
                        rel="preconnect"
                        crossOrigin="anonymous"
                        href="https://www.google-analytics.com"
                    />
                </>
            )}
        </head>
    );
}
