import React from 'react';
import styled, { css } from 'styled-components';
import {
    visuallyHidden,
    device,
    headingsStyles,
    headingsSize,
} from '../../../theme';
import Container from '../../../components/layout/Container';
import PostMenu from '../PostMenu';
import PostBody from '../PostBody';
import PostGallery from '../PostGallery';
import PostGps from '../PostGps';
import PostShare from '../PostShare';
import PostPrevNext from '../PostPrevNext';

export default function PostSections({ post, prev, next }) {
    const { gps } = post;
    const sections = [
        {
            id: 'relazione',
            title: 'Relazione',
            content: <PostBody post={post} />,
        },
        {
            id: 'foto',
            title: 'Galleria fotografica',
            content: <PostGallery post={post} />,
        },
        {
            id: 'mappa',
            title: 'Mappa e tracce',
            content: gps.hasTracks ? <PostGps post={post} /> : null,
        },
        {
            id: 'condividi',
            title: 'Stampa e condividi',
            content: <PostShare post={post} />,
        },
    ];
    return (
        <>
            <PostMenu sections={sections} />
            <Wrapper
                className="print-post-sections-wrapper"
                id="js-post-sections-wrapper"
            >
                {sections.map((section, i) =>
                    section.content ? (
                        <PostSection
                            key={i}
                            className={`js-postSection print-post-section-${section.id}`}
                            data-step={section.id}
                            sectionId={section.id}
                        >
                            <Container as="header">
                                <PostSectionTitle
                                    hide={section.id === 'relazione'}
                                    id={section.id}
                                >
                                    {section.title}
                                </PostSectionTitle>
                            </Container>
                            {section.content}
                        </PostSection>
                    ) : null,
                )}
                <PostPrintThanks
                    aria-hidden="true"
                    className="print-post-thanks"
                >
                    👋 Grazie per aver stampato la relazione, buona gita!
                </PostPrintThanks>
                <PostPrevNext
                    prev={prev}
                    next={next}
                    className="print-post-nav"
                />
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
    margin-top: calc(var(--space-unit) * 2);
    margin-bottom: calc(var(--space-unit) * 4);
    padding-bottom: calc(var(--space-unit) * 4);

    overflow: hidden;
    @media ${device.desktop} {
        margin-top: calc(var(--space-unit) * 4);
    }
`;

const PostSectionTitle = styled.h2`
    ${headingsStyles};
    font-size: ${headingsSize.h2};
    margin-bottom: var(--space-unit);
    ${(props) =>
        props.hide &&
        css`
            ${visuallyHidden};
        `}
`;

const PostSection = styled.section`
    ${(props) =>
        props.sectionId !== 'condividi' &&
        css`
            padding-bottom: calc(var(--space-unit) * 6);
        `}
    ${(props) =>
        (props.sectionId === 'relazione' || props.sectionId === 'foto') &&
        css`
            @media ${device.onlyTablet} {
                margin-left: calc(var(--space-unit) * 2);
            }
        `}

    ${(props) =>
        props.sectionId === 'condividi' &&
        css`
            min-height: 20rem;
            margin-bottom: calc(var(--space-unit) * 2);
        `}
`;

const PostPrintThanks = styled.div`
    display: none;
`;
