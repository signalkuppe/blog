import React from 'react';
import styled from 'styled-components';
import { Html } from 'pequeno';
import BasicHtmlStyles from '../../../components/ui/BasicHtmlStyles';
import Container from '../../../components/layout/Container';

const PostBody = styled.div`
    max-width: 65ch;
`;

export default function PostContent({ post }) {
    const { body } = post;
    return (
        <Container as="section">
            <PostBody>
                <BasicHtmlStyles>
                    <Html>{body}</Html>
                </BasicHtmlStyles>
            </PostBody>
        </Container>
    );
}
