import React from "react"

const About = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr 4fr 0fr",
        gridRowGap: "30px",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          fontSize: "24px",
          alignSelf: "end",
          justifySelf: "center",
        }}
      >
        <strong>About</strong>
      </div>
      <div style={{ justifySelf: "right" }}>
        <p></p>
      </div>
    </div>
  )
}

export default About
