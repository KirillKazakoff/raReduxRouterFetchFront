import styled from 'styled-components';
import { imageCompose } from './styledCompose';
import { ImageProps } from './rebassTypes';

const Image = styled.img<ImageProps>`
    ${imageCompose()};
`;

export default Image;
