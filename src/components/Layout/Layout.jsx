//import { Test } from './Layout.styles';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout as LayoutAntD } from 'antd';
import { H, C, Nav, MyDrawer, MenuBtn, MyDynamicMenu, Logo, GlobalStyle, HeadContainer } from "./Layout.styles";
import { HiMenu } from "react-icons/hi";
import useMobile from "./use-mobile";
import Links from "./Links";
import { Container, Wrapper } from "./styles/common";

const Layout = ({ children }) => {
  const { isMobile } = useMobile();
  const [showDrawer, setShowDrawer] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowDrawer(false);
  }, [location]);

  return (
    <LayoutAntD style={{ alignItems: 'start' }}>
      <GlobalStyle />
      <H>
        <Container>
          <HeadContainer>
            <Logo src="/logo192.png" />
            <DynamicMenu isMobile={isMobile} showDrawer={showDrawer} setShowDrawer={(d) => {
              setShowDrawer(d)
            }}>
              <Nav isMobile={isMobile}>
                <Links />
              </Nav>
            </DynamicMenu>
          </HeadContainer>
        </Container>
      </H>
      <C>
        {children}
      </C>
    </LayoutAntD >
  );
}
const DynamicMenu = ({ ...props }) => (
  <MyDynamicMenu>
    {
      props.isMobile ? (
        <> <MenuBtn type="primary" onClick={() => props.setShowDrawer(true)}>
          <HiMenu />
        </MenuBtn>
          <MyDrawer {...props} open={props.showDrawer} onClose={() => props.setShowDrawer(false)} />
        </>
      ) : <div {...props} />
    }
  </MyDynamicMenu>
);


export default Layout;
