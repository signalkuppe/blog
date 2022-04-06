import React from 'react';
import Html from '../../common/Html';
import Body from '../../common/Body';
import CommonScripts from '../../common/CommonScripts';
import CommonStyles from '../../common/CommonStyles';
import Header from '../../common/Header';

export default function BaseLayout({ route, head, children }) {
    return (
        <Html>
            {head}
            <Body>
                <CommonStyles />
                <Header route={route} />
                <main>{children}</main>
                <footer></footer>
                <CommonScripts />
            </Body>
        </Html>
    );
}
