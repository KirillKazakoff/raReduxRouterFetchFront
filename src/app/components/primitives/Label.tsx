import styled from 'styled-components';
import { textCompose } from './styledCompose';
import { TextProps } from './rebassTypes';

const Label = styled.label<TextProps>`
    ${textCompose()};
`;

export default Label;
