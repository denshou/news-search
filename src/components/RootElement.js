import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import { styled } from "styled-components";

const RootElement = () => {
  return (
    <Root>
      <MainHeader />
      <Outlet />
    </Root>
  );
};

export default RootElement;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
