import React from "react";
import { NavLink } from "react-router-dom";
import "./MainHeader.css"

const MainHeader = () => {
  return (
    <header>
      <nav>
        <div className="nav-link">
        <NavLink to="/search">뉴스 검색</NavLink>
        </div>
        <div className="nav-link">
        <NavLink to="/like">좋아요</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
