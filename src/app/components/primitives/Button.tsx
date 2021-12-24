import styled from 'styled-components';
import { variant } from 'styled-system';
import { boxVariants } from './Box';
import { BoxProps } from './rebassTypes';
import { boxCompose } from './styledCompose';

type ButtonProps = { cursor?: string } & BoxProps;
const buttonVariants = {
    ...boxVariants,
    cancel: {
        color: 'cancel',
        fontSize: '20px',
        bg: 'white',
        border: '2px solid red',
        borderRadius: '100px',
        px: '5px',
    },
    boxButton: {
        textAlign: 'center',
        width: '150px',
        color: 'boxButton',
        fontSize: '15px',
        ...boxVariants.primary,
    },
};
const Button = styled('button')<ButtonProps>(
    {
        cursor: 'pointer',
    },
    variant({ variants: buttonVariants }),
    boxCompose(),
);

Button.defaultProps = {
    cursor: 'pointer',
};

export default Button;
