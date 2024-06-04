import styled from 'styled-components';

export const PersonBtn = styled.button`
background-color: ${props => props.color};
display: flex;
align-items: center;
cursor: pointer;
border: 3px solid ${({ isActive }) => isActive ? 'black' : 'transparent'};
font-size: 1.3rem;
span{
    border-right: 3px solid black;
    padding:13px;
}
`;