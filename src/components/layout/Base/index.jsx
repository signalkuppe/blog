import React from 'react';
import vars from '../../../vars';
import Html from '../../common/Html';
import Body from '../../common/Body';
import CommonScripts from '../../common/CommonScripts';
import CommonStyles from '../../common/CommonStyles';
import Header from '../../common/Header';
import GoogleAnalytics from '../../common/GoogleAnalytics';

export default function BaseLayout({ route, head, children }) {
    return (
        <Html className="no-js">
            {head}
            <Body>
                <CommonStyles />
                <header className="print-layout-header">
                    <Header route={route} />
                </header>
                <main>{children}</main>
                <CommonScripts />
                {vars.env === 'production' && <GoogleAnalytics />}
            </Body>
        </Html>
    );
}
