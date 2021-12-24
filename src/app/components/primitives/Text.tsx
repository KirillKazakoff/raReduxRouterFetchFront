/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

import { textCompose } from './styledCompose';
import { TextProps } from './rebassTypes';

type MyTextProps = {} & TextProps;

export const Text = styled.span<MyTextProps>`
    ${textCompose()};
`;
