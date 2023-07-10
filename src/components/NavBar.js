import * as React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styled from "styled-components";

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: transparent;
  padding-top: 20px;
`;

const NavBar = () => {
  return (
    <Nav>
      <ConnectButton accountStatus="address" chainStatus="icon" />
    </Nav>
  );
};

export default NavBar;
