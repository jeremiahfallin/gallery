import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import Socials from "./Socials";

import useWindowWidth from "../components/hooks/useWindowWidth";

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

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 900px) {
    grid-template-columns: 1fr 3fr 1fr;
    grid-column-gap: 100px;
    grid-template-rows: 1fr 3fr 5fr;
    height: 100vh;
    grid-row-gap: 30px;
    grid-template-columns: 3fr 2fr;
  }
`;

const MenuStyles = styled.div`
  @media only screen and (max-width: 900px) {
  }

  @media only screen and (min-width: 900px) {
    grid-column: -2 / -1;
    grid-template-rows: repeat(3, 1fr);
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
  @media only screen and (max-width: 900px) {
  }

  @media only screen and (min-width: 900px) {
    float: left;
    padding-bottom: 0;
  }
`;

const StyledSocials = styled.div`
  @media only screen and (max-width: 900px) {
  }

  @media only screen and (min-width: 900px) {
    grid-column: -2 / -1;
  }
`;

const StyledListItem = styled.li`
  @media only screen and (max-width: 900px) {
    margin-bottom: 0;
    display: inline;
  }
`;

const StyledLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Sidebar = () => {
  const width = useWindowWidth();

  if (width > 900) {
    return (
      <SidebarStyle>
        <StyledName>
          <Link to="/">
            <strong>Dan Scott</strong>
          </Link>
        </StyledName>
        <MenuStyles>
          <StyledList>
            <StyledListItem>
              <Link to="/" activeStyle={{ textDecoration: "underline" }}>
                Home
              </Link>
            </StyledListItem>
            <StyledListItem>
              <Link to="/gallery" activeStyle={{ textDecoration: "underline" }}>
                Galleries
              </Link>
            </StyledListItem>
            <StyledListItem>
              <Link to="/about" activeStyle={{ textDecoration: "underline" }}>
                About
              </Link>
            </StyledListItem>
          </StyledList>
        </MenuStyles>
        <StyledSocials>
          <Socials />
        </StyledSocials>
      </SidebarStyle>
    );
  } else {
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
              style={{ justifySelf: "center" }}
            >
              Galleries
            </Link>
            <Link
              to="/about"
              activeStyle={{ textDecoration: "underline" }}
              style={{ justifySelf: "end" }}
            >
              About
            </Link>
          </StyledLinks>
        </MenuStyles>
        <StyledSocials>
          <Socials />
        </StyledSocials>
      </SidebarStyle>
    );
  }
};

export default Sidebar;
