import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { BoxProps } from './rebassTypes';
import { boxCompose } from './styledCompose';

type StyledLinkProps = BoxProps & { isActive?: boolean; hovcolor?: string };

const SNavLink = styled(NavLink)<StyledLinkProps>`
    ${boxCompose};
    /* border: ${({ isActive }) => (isActive ? '2px solid red' : 'none')}; */
    &:hover {
        color: ${({ hovcolor }) => hovcolor || 'white'};
    }
    display: block;
`;

export default SNavLink;
