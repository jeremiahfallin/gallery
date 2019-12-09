import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import Socials from "./Socials";

const SidebarStyle = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr 5fr;
  grid-template-columns: 3fr 2fr;
  grid-row-gap: 30px;
  width: 100%;
  height: 100vh;

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr 3fr;
    height: 100%;
    grid-template-rows: 1fr 3fr 3fr;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    grid-template-columns: 1fr 3fr 1fr;
    grid-column-gap: 100px;
  }
`;

const Sidebar = () => {
  return (
    <SidebarStyle>
      <div
        style={{
          gridColumn: "-2/-1",
          fontSize: "32px",
          alignSelf: "end",
        }}
      >
        <Link to="/">
          <strong>Dan Scott</strong>
        </Link>
      </div>
      <div
        style={{
          gridColumn: "-2/-1",
          gridTemplateRows: "repeat(3, 1fr)",
          alignSelf: "center",
        }}
      >
        <ul
          style={{
            padding: 0,
            listStyleType: "none",
            float: "left",
            marginLeft: 0,
          }}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/gallery">Gallery</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      <div style={{ gridColumn: "-2/-1" }}>
        <Socials />
      </div>
    </SidebarStyle>
  );
};

export default Sidebar;
