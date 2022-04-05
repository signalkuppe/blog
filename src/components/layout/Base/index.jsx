import React from 'react';
import { Script } from 'pequeno';
import Header from '../../common/Header';
import GlobalStyles from '../../../theme/globalStyles';
import PrintStyles from '../../../theme/printStyles';

export default function BaseLayout({ route, head, children }) {
    return (
        <html lang="it">
            {head}
            <body>
                <GlobalStyles />
                <PrintStyles />
                <Header route={route} />
                <main>{children}</main>
                <footer></footer>
                <Script
                    libs={[
                        {
                            where: 'body',
                            tag: '<script src="/js/utils.js" />',
                        },
                    ]}
                />
            </body>
        </html>
    );
}
