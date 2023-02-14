import React from 'react';
import styled from 'styled-components';
import { visuallyHidden } from '../../../theme';
import Button from '../../../components/ui/Button';
import TextField from '../../../components/ui/TextField';
import TextArea from '../../../components/ui/TextArea';
import VerticalSpace from '../../../components/ui/VerticalSpace';

export default function ContattiForm() {
    // https://docs.netlify.com/forms/setup/

    return (
        <StyledForm
            action="/grazie"
            name="contact"
            method="POST"
            autoComplete="off"
            data-netlify="true"
            netlify-honeypot="bot-field"
        >
            <HoneyPot>
                <label>
                    Non compilarlo se sei umano: <input name="bot-field" />
                </label>
            </HoneyPot>
            <TextField
                required
                label="Email"
                name="email"
                type="email"
                autoCapitalize="off"
                placeholder="es: info@miaemail.it"
                block
            />
            <VerticalSpace />
            <TextArea
                required
                label="Messaggio"
                name="message"
                spellCheck="false"
                autoCorrect="off"
                autoComplete="off"
                autoCapitalize="off"
                rows="5"
                block
            />
            <VerticalSpace size={2} />
            <Button type="submit">Invia il messaggio</Button>
        </StyledForm>
    );
}

const HoneyPot = styled.div`
    ${visuallyHidden};
`;

const StyledForm = styled.form`
    border-radius: var(--border-radius);
    max-width: 85ch;
    padding: var(--space-unit);
    background: var(--color-background-light);
    border: 4px solid var(--color-background-light);
    :focus-within {
        box-shadow: 0 1px 1px var(--drop-shadow-color),
            0 2px 2px var(--drop-shadow-color),
            0 4px 4px var(--drop-shadow-color),
            0 8px 8px var(--drop-shadow-color),
            0 16px 16px var(--drop-shadow-color);
    }
`;
