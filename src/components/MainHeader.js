import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const MainHeader = () => {
  return (
    <header>
      <Nav>
        <NavDiv>
          <NavLink to="/search">뉴스 검색</NavLink>
        </NavDiv>
        <NavDiv>
          <NavLink to="/like">좋아요</NavLink>
        </NavDiv>
      </Nav>
    </header>
  );
};

export default MainHeader;

const Nav = styled.div`
  display: flex;
`;
const NavDiv = styled.div`
  margin: 2rem;
`;
const NavStyle = styled(NavLink)``;
