import styled, { css } from 'styled-components';
import { colors } from '../Layout/styles/variables'

const commonStyle = css`
border-radius: 25px;
background-color: white;


`;

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f77754;
    color:white;
`;

export const InnerContainer = styled.div`
 display: block;
 border-radius: 15px;
 padding:20px;
 max-width: 300px;
 width: 100%;
`;

export const GoogleBtn = styled.button`
${commonStyle};
padding: 7px 20px 7px 10px;
border: none;
cursor: pointer;
display: inline-flex;
align-items: center;
img{
    width:30px
}
`

export const ErrorMsg = styled.p`
font-weight: bold;
`;
export const AccessBtn = styled.button`
${commonStyle};
padding:10px;
border: none;
cursor: pointer;
display: inline-flex;
align-items: center;
img{
    width:30px
}
`

export const Panel = styled.div`
display:${({ visible }) => visible ? 'block' : 'none'};
text-align: center;
`;

export const PWelcome = styled.p`
    font-size: 1.5rem;
`;
export const BackButton = styled.button`
border: 1px solid black;
border-radius: 5px;
cursor: pointer;

`;

export const Row = styled.div`
display: flex;
justify-content: space-around;
`;

export const H2 = styled.h2`
padding: 7px;
border-bottom: ${({ visible }) => visible ? '2px solid #ff7020' : 'none'};
cursor:pointer;
`;

export const PRecoverPass = styled.p`
color: white;
text-decoration: underline;
text-align: center;
margin-top: 27px;
margin-bottom: 27px;
`;

export const LoginInput = styled.input`
${commonStyle}
padding: 15px;
border: none;
display: block;
width:100%;
box-sizing: border-box;
`

export const Separator = styled.div`
width: 100%;
position: relative;
text-align: center;
.line{
    position:absolute;
    display: block;
    height: 1px;
    background-color: white;
    width: 100%;
    top:1.2rem
}
.txt{
    position: relative;
    z-index: 10;
    display: inline-block;
    margin: auto;
    padding: 10px;
    background-color: ${colors.primary};
}
`;