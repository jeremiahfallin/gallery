import React from "react";
import { Link } from "gatsby";

import Socials from "./Socials";

const Sidebar = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr 3fr 5fr",
        gridTemplateColumns: "3fr 2fr",
        gridRowGap: "30px",
        width: "100%",
        height: "100vh",
      }}
    >
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
    </div>
  );
};

export default Sidebar;
