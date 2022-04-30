import React from 'react';
import styled, { css } from 'styled-components';
import Icon from '../../../components/ui/Icon';
import FirstIcon from '../../../public/icons/DoubleChevronLeft.svg';
import LeftIcon from '../../../public/icons/ChevronLeft.svg';
import RightIcon from '../../../public/icons/ChevronRight.svg';
import LastIcon from '../../../public/icons/DoubleChevronRight.svg';

const StyledList = styled.ul`
    display: flex;
    align-items: center;
`;

const StyledLi = styled.li`
    display: flex;
    align-items: center;
    ${(props) =>
        props.firstPage &&
        css`
            margin-right: 0.5em;
        `}
    ${(props) =>
        props.lastPage &&
        css`
            margin-left: 0.5em;
        `}
`;

const Page = styled.div`
    margin: 0 0.75em;
    > * + * {
        margin-left: 0.2em;
    }
    ${(props) =>
        props.firstPage &&
        css`
            margin-left: 0;
        `}
`;

const StyledLink = styled.a`
    display: flex;
    align-items: center;
    padding: 0.25em;
    color: var(--color-text);
    border: 4px solid var(--color-text);
    border-radius: 8px;
    &:hover {
        border-color: var(--color-text-light-accent);
        color: var(--color-text-light-accent);
    }
`;

export default function Pager({ pagination, ...props }) {
    const { next, prev, pages, page, total } = pagination;
    const firstPage = pages[0];
    const lastPage = pages[total - 1];
    if (!pages || total === 1) {
        return null;
    } else {
        return (
            <StyledList {...props}>
                {prev && (
                    <>
                        <StyledLi firstPage>
                            <StyledLink href={firstPage} title="Prima pagina">
                                <Icon icon={FirstIcon} />
                            </StyledLink>
                        </StyledLi>
                        <StyledLi>
                            <StyledLink href={prev} title="Pagina precedente">
                                <Icon icon={LeftIcon} />
                            </StyledLink>
                        </StyledLi>
                    </>
                )}
                <StyledLi>
                    <Page firstPage={!prev}>
                        <span>Pagina</span>
                        <strong>{page}</strong>
                        <span>di</span>
                        <span>{total}</span>
                    </Page>
                </StyledLi>
                {next && (
                    <>
                        <StyledLi>
                            <StyledLink href={next} title="Pagina successiva">
                                <Icon icon={RightIcon} />
                            </StyledLink>
                        </StyledLi>
                        <StyledLi lastPage>
                            <StyledLink href={lastPage} title="Ultima pagina">
                                <Icon icon={LastIcon} />
                            </StyledLink>
                        </StyledLi>
                    </>
                )}
            </StyledList>
        );
    }
}
