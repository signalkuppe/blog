import React, { Fragment } from 'react';

export default function LoremIspum({ times }) {
    const qty = [...Array(times || 1).keys()];
    return (
        <>
            {qty.map((q) => (
                <Fragment key={q}>
                    Un testo segnaposto utilizzato nel settore della tipografia
                    e della stampa. Lorem Ipsum è considerato il testo
                    segnaposto standard sin dal sedicesimo secolo, quando un
                    anonimo tipografo prese una cassetta di caratteri e li
                    assemblò per preparare un testo campione. È sopravvissuto
                    non solo a più di cinque secoli, ma anche al passaggio alla
                    videoimpaginazione, pervenendoci sostanzialmente inalterato.
                    Fu reso popolare, negli anni ’60, con la diffusione dei
                    fogli di caratteri trasferibili “Letraset”, che contenevano
                    passaggi del Lorem Ipsum, e più recentemente da software di
                    impaginazione come Aldus PageMaker, che includeva versioni
                    del Lorem Ipsum.
                </Fragment>
            ))}
        </>
    );
}
