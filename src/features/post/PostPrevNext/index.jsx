import React from 'react';
import styled from 'styled-components';
import { linksStyles, boldStyles } from '../../../theme';
import Container from '../../../components/layout/Container';

export default function PostPrevNext({ prev, next, ...props }) {
    return (
        <Container as="footer" {...props}>
            <nav>
                <PostNavigation>
                    {prev && (
                        <li>
                            <Strong>Relazione precedente</Strong>
                            <Link href={prev.permalink}>{prev.title}</Link>
                        </li>
                    )}
                    {next && (
                        <li>
                            <Strong>Relazione successiva</Strong>
                            <Link href={next.permalink}>{next.title}</Link>
                        </li>
                    )}
                </PostNavigation>
            </nav>
        </Container>
    );
}

const PostNavigation = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 2em;
`;
const Link = styled.a`
    ${linksStyles}
`;

const Strong = styled.strong`
    ${boldStyles};
    display: block;
`;
