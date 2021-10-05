import React from 'react';
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
            </body>
        </html>
    );
}
