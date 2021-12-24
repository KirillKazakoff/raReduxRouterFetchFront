import styled from 'styled-components';
import { variant } from 'styled-system';
import { BoxProps } from './rebassTypes';
import { boxCompose } from './styledCompose';

export const boxVariants = {
    layout: {
        p: '20px',
        bg: 'tan',
        minHeight: '100vh',
        fontSize: '20px',
    },
    primary: {
        px: '10px',
        py: '5px',
        borderRadius: '5px',
        border: 'primary',
    },
    rounded: {
        border: 'primary',
        borderRadius: '100px',
        p: '5px',
    },
    secondary: {
        color: 'blue',
    },
};

export const Box = styled.div<BoxProps>(variant({ variants: boxVariants }), boxCompose());
