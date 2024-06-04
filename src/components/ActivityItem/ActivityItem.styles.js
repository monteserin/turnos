import styled from 'styled-components';

export const Act = styled.div`
display: flex;
background-color: ${({ color }) => color};
justify-content: space-between;
align-items: center;
& > span:first-of-type{
    flex:2
}
& > div:last-of-type{
    flex: 1;
}
`;
