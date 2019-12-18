import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import Socials from "./Socials";

const SidebarStyle = styled.div`
  display: grid;
  width: 100%;

  @media only screen and (max-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
    height: 100%;
    grid-auto-flow: column;
    align-self: center;
    justify-self: center;
    padding-top: 1em;
    padding-left: 1em;
  }

  @media only screen and (min-width: 900px) {
    grid-column-gap: 30px;
    grid-template-rows: 1fr 3fr 5fr;
    height: 100vh;
    grid-row-gap: 30px;
    grid-template-columns: 2fr 2fr;
  }
`;

const MenuStyles = styled.div`
  display: grid;
  @media only screen and (max-width: 900px) {
    grid-auto-flow: column;
  }

  @media only screen and (min-width: 900px) {
    grid-column: -2 / -1;
    align-self: center;
  }
`;

const StyledName = styled.div`
  font-size: 32px;
  @media only screen and (max-width: 900px) {
  }

  @media only screen and (min-width: 900px) {
    grid-column: -2 / -1;
    align-self: end;
  }
`;

const StyledList = styled.ul`
  list-style-type: none;
  margin-left: 0;
  padding: 0;
  float: left;
  padding-bottom: 0;
  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

const StyledSocials = styled.div`
  @media only screen and (max-width: 900px) {
  }

  @media only screen and (min-width: 900px) {
    grid-column: -2 / -1;
  }
`;

const StyledLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media only screen and (min-width: 900px) {
    display: none;
  }
`;

const Sidebar = () => {
  return (
    <SidebarStyle>
      <StyledName>
        <Link to="/">
          <strong>Dan Scott</strong>
        </Link>
      </StyledName>
      <MenuStyles>
        <StyledLinks>
          <Link to="/" activeStyle={{ textDecoration: "underline" }}>
            Home
          </Link>
          <Link
            to="/gallery"
            activeStyle={{ textDecoration: "underline" }}
            style={{ justifySelf: "center", alignSelf: "center" }}
          >
            Galleries
          </Link>
          <Link
            to="/about"
            activeStyle={{ textDecoration: "underline" }}
            style={{ justifySelf: "end", alignSelf: "end" }}
          >
            About
          </Link>
        </StyledLinks>
        <StyledList>
          <li>
            <Link to="/" activeStyle={{ textDecoration: "underline" }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/gallery" activeStyle={{ textDecoration: "underline" }}>
              Galleries
            </Link>
          </li>
          <li>
            <Link to="/about" activeStyle={{ textDecoration: "underline" }}>
              About
            </Link>
          </li>
        </StyledList>
      </MenuStyles>
      <StyledSocials>
        <Socials />
      </StyledSocials>
    </SidebarStyle>
  );
};

export default Sidebar;
