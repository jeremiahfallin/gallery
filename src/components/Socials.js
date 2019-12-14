import React from "react";

// import twitter from "../assets/twitter.svg"
// import instagram from "../assets/instagram.svg"
import facebook from "../assets/facebook.svg";

const Socials = () => {
  const cornflowerFilter =
    "invert(62%) sepia(57%) saturate(3012%) hue-rotate(196deg) brightness(98%) contrast(106%)";
  return (
    <div
      style={{
        display: "grid",
        gridAutoColumns: "1fr",
        gridAutoFlow: "column",
        justifyItems: "center",
      }}
    >
      <a href={"https://www.facebook.com/djscott1173"}>
        <img
          src={facebook}
          style={{
            height: "32px",
            width: "32px",
            filter: `${cornflowerFilter}`,
          }}
          alt=""
        />
      </a>
    </div>
  );
};

export default Socials;
