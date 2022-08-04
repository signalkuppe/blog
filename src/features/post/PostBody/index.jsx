import React from 'react';
import styled from 'styled-components';
import { Html } from 'pequeno';
import BasicHtmlStyles from '../../../components/ui/BasicHtmlStyles';
import Container from '../../../components/layout/Container';

const PostBody = styled.div`
    max-width: 65ch;
    @media screen {
        p:first-of-type:first-letter {
            font-family: var(--font-family-drop-cap);
            font-size: var(--font-size-xxxx-large);
            font-weight: 700;
            color: var(--color-text-light-accent);
            float: left;
            line-height: 0.8em;
            padding-top: 10px;
            padding-right: 0.2em;
            padding-left: 0;
        }
    }
`;

export default function PostContent({ post }) {
    const { body } = post;
    return (
        <Container as="section">
            <PostBody className="print-post-body">
                <BasicHtmlStyles>
                    <Html>{body}</Html>
                </BasicHtmlStyles>
            </PostBody>
        </Container>
    );
}
