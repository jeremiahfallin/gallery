import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import Socials from "./Socials";

import useWindowWidth from "../components/hooks/useWindowWidth";

const SidebarWebStyle = styled.div`
  display: grid;
  width: 100%;
  grid-column-gap: 30px;
  grid-template-rows: 1fr 3fr 5fr;
  height: 100vh;
  grid-row-gap: 30px;
  grid-template-columns: 2fr 2fr;
`;

const SidebarPhoneStyle = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100%;
  grid-auto-flow: column;
  align-self: center;
  justify-self: center;
  padding-top: 1em;
  padding-left: 1em;
`;

const MenuStyles = styled.div`
  display: grid;
  @media only screen and (max-width: 900px) {
    grid-auto-flow: column;
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
  float: left;
  padding-bottom: 0;
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
`;

const Sidebar = () => {
  const width = useWindowWidth();
  console.log(width);

  if (width < 900) {
    return (
      <SidebarPhoneStyle>
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
        </MenuStyles>
        <StyledSocials>
          <Socials />
        </StyledSocials>
      </SidebarPhoneStyle>
    );
  } else {
    return (
      <SidebarWebStyle>
        <StyledName>
          <Link to="/">
            <strong>Dan Scott</strong>
          </Link>
        </StyledName>
        <div
          style={{
            gridColumn: "-2/-1",
            gridTemplateRows: "repeat(3, 1fr)",
            alignSelf: "center",
          }}
        >
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
        </div>
        <div style={{ gridColumn: "-2/-1" }}>
          <Socials />
        </div>
      </SidebarWebStyle>
    );
  }
};

export default Sidebar;
