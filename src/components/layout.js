import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Sidebar from "./Sidebar";
import "./layout.css";

const StyledLayout = styled.div`
  display: grid;
  grid-column-gap: 50px;
  font-family: Montserrat, sans-serif;

  /* Extra small devices (phones, 900px and down) */
  @media only screen and (max-width: 900px) {
    grid-auto-flow: row;
    grid-auto-columns: 100%;
    height: 100vh;
  }

  /* Small devices (portrait tablets and large phones, 900px and up) */
  @media only screen and (min-width: 900px) {
    grid-template-columns: 1fr 3fr 1fr;
    grid-column-gap: 30px;
  }
`;

const Layout = ({ children }) => {
  return (
    <StyledLayout>
      <Sidebar />
      <main>{children}</main>
    </StyledLayout>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
