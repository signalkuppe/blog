import React from 'react';
import vars from '../../../vars';
import { vars as themeVars } from '../../../theme';

export default function Head({
    title,
    slogan,
    description,
    url,
    ogImage,
    twitterCardImage,
    extraLinks,
    extraMetas,
}) {
    let titleTag = `${title || '-title-'} | ${slogan || '-slogan-'}`;
    ogImage = ogImage || `${vars.homepageFoto}?w=1280&h=630&fm=jpg&q=80`;
    twitterCardImage =
        twitterCardImage || `${vars.homepageFoto}?w=1200&h=600&fm=jpg&q=80`;

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
            <link
                rel="preload"
                href="/fonts/roboto-flex.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="true"
            />
            <link
                rel="preload"
                href="/fonts/sriracha-regular.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="true"
            />
            <link
                rel="preload"
                href="/fonts/yeseva-regular.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="true"
            />
            {extraLinks}
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="color-scheme" content="dark" />
            <meta
                name="theme-color"
                content={themeVars['--color-background']}
            />
            <meta name="generator" content="pequeno" />
            <meta name="og:type" content="website" />
            <meta name="twitter:site" content="@signalkuppe" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={twitterCardImage} />
            <meta name="og:image" content={ogImage} />
            {extraMetas}
            {vars.env === 'development' && (
                <meta name="robots" content="noindex" />
            )}
        </head>
    );
}
