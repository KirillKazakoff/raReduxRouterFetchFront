import styled from 'styled-components';
import { variant } from 'styled-system';
import { boxVariants } from './Box';
import { BoxProps } from './rebassTypes';
import { boxCompose } from './styledCompose';

type AbsoluteBoxType = BoxProps & { top?: number };

const AbsoluteBox = styled.div<AbsoluteBoxType>`
    position: absolute;
    ${boxCompose()};
    ${variant({ variants: boxVariants })};
`;

AbsoluteBox.defaultProps = {
    top: 0,
};

export default AbsoluteBox;
