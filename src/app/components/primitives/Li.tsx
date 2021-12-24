import styled from 'styled-components';
import { FlexProps } from './Flex';
import { flexCompose } from './styledCompose';

const Li = styled.li<FlexProps>`
    gap: ${({ gap }) => gap || ''};
    row-gap: ${({ rowGap }) => rowGap || ''};
    ${flexCompose()};
`;

export default Li;
