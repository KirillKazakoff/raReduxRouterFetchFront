import styled from 'styled-components';
import { variant } from 'styled-system';
import { boxVariants } from './Box';
import { FlexProps } from './Flex';
import { flexCompose } from './styledCompose';

const Ul = styled.ul<FlexProps>`
    gap: ${({ gap }) => gap || ''};
    row-gap: ${({ rowGap }) => rowGap || ''};
    display: flex;
    ${variant({ variants: boxVariants })};
    ${flexCompose()};
`;

export default Ul;
