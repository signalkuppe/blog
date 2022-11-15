import React from 'react';
import styled from 'styled-components';
import BasicHtmlStyles from '../../../components/ui/BasicHtmlStyles';
import { permalink as contattiPermalink } from '../../../pages/contatti';

const Description = styled.p`
    font-size: var(--font-size-small);
`;

export default function PhotoDisclaimer({ small }) {
    return (
        <BasicHtmlStyles>
            <Description small={small}>
                Potete usare le foto come volete, ci dedico tempo e passione
                quindi una <b>citazione</b> con il <b>link al mio blog</b> è
                opzionale ma <b>tanto gradita.</b> In questo caso{' '}
                <a href={contattiPermalink}>scrivetemi</a> per dirmi dove
                l’avete usata 🙂
            </Description>
        </BasicHtmlStyles>
    );
}
