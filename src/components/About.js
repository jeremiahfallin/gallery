import React from "react";

const About = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr 8fr 0fr",
        gridRowGap: "30px",
        width: "100%",
        height: "100vh",
      }}
    >
      <h1
        style={{
          alignSelf: "end",
          justifySelf: "center",
          marginBottom: 0,
        }}
      >
        About
      </h1>
      <div style={{ justifySelf: "right" }}>
        <p></p>
      </div>
    </div>
  );
};

export default About;
