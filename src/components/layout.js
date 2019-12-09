import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import "./layout.css";

const StyledLayout = styled.div`
  display: grid;
  grid-column-gap: 50px;
  font-family: Montserrat, sans-serif;

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    grid-auto-flow: row;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    grid-template-columns: 1fr 3fr 1fr;
    grid-column-gap: 100px;
  }
`;

const Layout = ({ children }) => {
  const isMobile = window.innerWidth < 600;
  if (isMobile) {
    return (
      <>
        <StyledLayout>
          <main>{children}</main>
          <Sidebar />
        </StyledLayout>
      </>
    );
  } else {
    return (
      <>
        <StyledLayout>
          <Sidebar />
          <main>{children}</main>
        </StyledLayout>
      </>
    );
  }
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
