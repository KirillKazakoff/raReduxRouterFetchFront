import styled from 'styled-components';

import { variant } from 'styled-system';
import { textCompose } from './styledCompose';
import { HeadingProps } from './rebassTypes';

const headingVariants = {
    h1: {
        fontSize: '30px',
        color: 'primary',
    },
    h2: {
        fontSize: '25px',
        color: 'tan',
    },
};

type MyHeadingProps = {} & HeadingProps;

const Heading = styled.h2<MyHeadingProps>`
    ${textCompose()};
    ${variant({ variants: headingVariants })}
`;

export default Heading;
