/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import {
    border,
    compose,
    layout,
    position,
    typography,
    space,
    color,
    flexbox,
    alignSelf,
    background,
} from 'styled-system';

export const boxCompose = () => compose(border, space, layout, typography, color, position, alignSelf);

export const flexCompose = () => {
    return compose(border, space, layout, typography, color, position, flexbox);
};

export const textCompose = () => compose(space, typography, color);

export const imageCompose = () => compose(space, layout, position, background);
