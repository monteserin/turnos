import styled, { createGlobalStyle } from 'styled-components';
import { Layout as LayoutAntD, Drawer } from 'antd';
const { Header } = LayoutAntD;

export const H = styled(Header)`
height: auto!important;
width: 100%;
padding: 0 20px 0 20px;

 a{
   color: white;
   font-size: 1.2rem;
   padding: 10px 40px 10px 40px;
   display: block;
}
`;

export const C = styled.div`
`;

export const HeadContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px 0 10px 0;
`

export const MyDrawer = styled(Drawer)`
   .ant-drawer-body{
   display: flex;
   flex-direction: column;
	a{
      display: block;
      font-size: 1.4rem;
      padding: 7px;
      transition: 0.4s;
      color:black;
&:hover{
         color:#0099D5;
         transform: scale(1.1);
      }
   }
}
`

export const MenuBtn = styled.div`
cursor: pointer;
padding: 7px;
font-size: 2.2rem;
color: white;
align-self: center;
margin: 15px;
line-height: 0;
display: inline-block;
`;


export const Nav = styled.nav`
display: flex;
align-items: center;
justify-content: right;
ul{
   list-style: none;
   display: flex;
   margin: 0;
   flex-direction: ${({ isMobile }) => isMobile ? 'column' : 'row'};
   padding-left: 0;
   a{
      text-decoration: none;
      transition: transform 0.3s;
      padding: 0px 10px 0;
   &:hover {
         transform: scale(1.2);
      }
   }
}

`;

export const MyDynamicMenu = styled.div`
display: flex;
justify-content: end;
`;

export const Logo = styled.img`
width: 60px;
height: 60px;
`;



export const GlobalStyle = createGlobalStyle`
	body {
   margin: 0;
}
h1{
   margin-top: 0;
}

.ant-layout {
  min-height: 100vh;
  display: block;
}

.ant-layout-header{
   background-color: #f77754;
}
`;