import React from 'react';
import styled from 'styled-components';
import { device } from '../../../theme';
import PostLayout from '../PostLayout';
import PostMenu from '../PostMenu';

export default function PostContent({ post }) {
    return <PostLayout header={<PostMenu />}>post content</PostLayout>;
}
