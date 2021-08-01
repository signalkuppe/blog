import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Html } from 'pequeno';
import List from '../../../components/ui/List';
import Container from '../../../components/layout/Container';
import { imgStyles } from '../../../components/ui/Image';

export default function PostPrevNext({ pagination }) {
    return (
        <List reset inline>
            {pagination.prev && (
                <li>
                    <a href={pagination.prev}>
                        &laquo; {pagination.prevItem.title}
                    </a>
                </li>
            )}
            {pagination.next && (
                <li>
                    <a href={pagination.next}>
                        {pagination.nextItem.title} &raquo;
                    </a>
                </li>
            )}
        </List>
    );
}
