import styled from 'styled-components';
import { variant } from 'styled-system';
import { boxCompose } from './styledCompose';
import { BoxProps } from './rebassTypes';

type InputProps = BoxProps;

const Input = styled.input<InputProps>(
    variant({
        scale: 'forms',
        variants: {
            input: {
                px: '10px',
                py: '5px',
                borderRadius: '5px',
                border: 'primary',
                color: 'input',
                fontSize: '18px',
            },
        },
    }),
    boxCompose(),
);

export default Input;
