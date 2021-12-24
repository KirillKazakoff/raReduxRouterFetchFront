import styled from 'styled-components';
import { FlexProps } from './Flex';
import { BoxProps } from './rebassTypes';
import { boxCompose, flexCompose } from './styledCompose';

const Form = styled.form<BoxProps>`
    ${boxCompose()};
`;

export default Form;
