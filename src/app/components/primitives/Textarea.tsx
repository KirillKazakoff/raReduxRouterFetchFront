import styled from 'styled-components';
import { variant } from 'styled-system';
import { BoxProps } from './rebassTypes';
import { boxCompose } from './styledCompose';

const textareaVariants = {
    default: {
        display: 'block',
        width: '85%',
        fontSize: '20px',
    },
};

const Textarea = styled.textarea<BoxProps>`
    ${variant({ variants: textareaVariants })};
    ${boxCompose()};
`;

Textarea.defaultProps = {
    name: 'textarea',
    defaultValue: 'Type your message here',
};

export default Textarea;
