import React from 'react';
import Html from '../../common/Html';
import Body from '../../common/Body';
import CommonScripts from '../../common/CommonScripts';
import CommonStyles from '../../common/CommonStyles';
import Header from '../../common/Header';

export default function BaseLayout({ route, head, children }) {
    return (
        <Html className="no-js" id="top">
            {head}
            <Body>
                <CommonStyles />
                <header className="print-layout-header">
                    <Header route={route} />
                </header>
                <main>{children}</main>
                <CommonScripts />
            </Body>
        </Html>
    );
}
