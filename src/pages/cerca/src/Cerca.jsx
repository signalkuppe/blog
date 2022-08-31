import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useKey } from 'rooks';
import lunr from 'lunr';
import GlobalStyles from '../../../theme/globalStyles';
import { linksStyles, boldStyles, device } from '../../../theme';
import CloseIcon from '../../../public/icons/Cross.svg';
import SearchIcon from '../../../public/icons/Search.svg';
import ContentContainer from '../../../components/layout/Container';
import Icon from '../../../components/ui/Icon';
import PageTitle from '../../../components/ui/PageTitle';
import TextField from '../../../components/ui/TextField';
import Loader from '../../../components/ui/Loader';
import Fab from '../../../components/ui/Fab';
import BlogPostCard from '../../../features/blog/BlogPostCard';

function Cerca() {
    const [state, setState] = useState({
        fetching: true,
        searching: false,
        hasSearched: false,
        posts: [],
        query: '',
        searchIndex: null,
        searchResults: [],
    });
    const inputRef = useRef();
    const hasResults = state.searchResults.length > 0;
    const backToLink = '/blog/index.html';

    function onFormSubmit(e) {
        e.preventDefault();
        setState({ ...state, searching: true });
        const results = state.searchIndex
            .search(state.query)
            .map((result) => state.posts.find((p) => p.id === result.ref));

        setTimeout(() => {
            setState({
                ...state,
                searchResults: results,
                searching: false,
                hasSearched: true,
            });
        }, 2000);
    }

    useKey(
        ['Escape'],
        function () {
            setState({ ...state, query: '' });
        },
        {
            target: inputRef,
            eventTypes: ['keypress', 'keydown', 'keyup'],
        },
    );

    useEffect(() => {
        fetch('/_data/posts.json')
            .then((response) => response.json())
            .then((data) => {
                const idx = lunr(function () {
                    this.field('title');
                    this.field('tags');
                    this.field('description');
                    data.forEach(function (post) {
                        this.add(post);
                    }, this);
                });
                setTimeout(() => {
                    setState({
                        ...state,
                        fetching: false,
                        searchIndex: idx,
                        posts: data,
                    });
                }, 1500);
            });
    }, []);

    return (
        <>
            <GlobalStyles />

            <Header>
                <CloseButton
                    href={backToLink}
                    title="Torna alla relazione"
                    aria-label="Torna alla relazione"
                >
                    <Icon icon={CloseIcon} l />
                </CloseButton>
            </Header>
            <ContentContainer as="main">
                {state.fetching && (
                    <FetchingInfo>
                        <Loader size="2rem" /> <b>Inizializzo la ricerca ...</b>
                    </FetchingInfo>
                )}

                <Content fetching={state.fetching}>
                    <TitleAndFormContainer>
                        <PageTitle small>Cerca una relazione</PageTitle>
                        <Form onSubmit={onFormSubmit}>
                            <FormSearch>
                                <TextField
                                    block
                                    placeholder="Es:Pizzo Scalino, orobie"
                                    value={state.query}
                                    onChange={(e) =>
                                        setState({
                                            ...state,
                                            query: e.target.value,
                                        })
                                    }
                                    ref={inputRef}
                                    type="search"
                                />
                                <ButtonContainer>
                                    {!state.searching && (
                                        <Fab type="submit" aria-label="Cerca">
                                            <Icon icon={SearchIcon} l />
                                        </Fab>
                                    )}
                                    {state.searching && <Loader />}
                                </ButtonContainer>
                            </FormSearch>
                        </Form>
                    </TitleAndFormContainer>

                    {!state.searching && state.hasSearched && (
                        <>
                            {!hasResults && (
                                <NoResults>Nessun risultato 😕</NoResults>
                            )}
                            {hasResults && (
                                <ResultsList>
                                    {state.searchResults.map((post) => (
                                        <li key={post.id}>
                                            <BlogPostCard post={post} />
                                        </li>
                                    ))}
                                </ResultsList>
                            )}

                            <BackLink href={backToLink}>
                                &laquo; Torna alle relazioni
                            </BackLink>
                        </>
                    )}
                </Content>
            </ContentContainer>
        </>
    );
}

const Header = styled.header`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 10vh;
    padding-right: var(--space-unit);
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--color-background);
`;

const CloseButton = styled.a`
    color: var(--color-text);
`;

const FetchingInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-top: calc(var(--space-unit) * 2);
`;

const TitleAndFormContainer = styled.div`
    position: sticky;
    top: 10vh;
    z-index: 1;
    background: var(--color-background);
    padding-bottom: calc(var(--space-unit) * 2);
`;

const Form = styled.form`
    padding-top: calc(var(--space-unit) * 2);
`;

const FormSearch = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-unit);
    @media ${device.mobile} {
        gap: calc(var(--space-unit) / 1.5);
    }
`;

const ButtonContainer = styled.div`
    width: 3.5rem;
    flex-shrink: 0;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: calc(var(--space-unit) * 1);
    padding-bottom: calc(var(--space-unit) * 4);
    opacity: ${(props) => (props.fetching ? 0 : 1)};
    transition: opacity 0.2s ease-in-out;
`;

const BackLink = styled.a`
    ${linksStyles}
    display: block;
`;

const NoResults = styled.p`
    ${boldStyles}
    font-size: var(--font-size-large);
`;

const ResultsList = styled.ol`
    display: flex;
    flex-direction: column;
    gap: calc(var(--space-unit) * 2);
    margin-top: calc(var(--space-unit) * 1);
    margin-bottom: calc(var(--space-unit) * 4);
    margin-left: calc(var(--space-unit) * 0.5);
`;

export default Cerca;
