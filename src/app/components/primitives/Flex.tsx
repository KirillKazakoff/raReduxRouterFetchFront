import styled from 'styled-components';
import { variant } from 'styled-system';
import { boxVariants } from './Box';
import { FlexProps as FlexPropsRebass } from './rebassTypes';
import { flexCompose } from './styledCompose';

export type FlexProps = FlexPropsRebass & {
    gap?: string;
    rowGap?: string;
};

export const Flex = styled.div<FlexProps>`
    gap: ${({ gap }) => gap || ''};
    row-gap: ${({ rowGap }) => rowGap || ''};
    display: flex;
    ${flexCompose()};
    ${variant({ variants: boxVariants })};
`;
