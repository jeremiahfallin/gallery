import React from "react";
import Img from "gatsby-image";

const cont = {
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
};

const GalleryImage = ({ index, photo, margin, direction, top, left }) => {
  if (direction === "column") {
    cont.position = "absolute";
    cont.left = left;
    cont.top = top;
  }
  console.log(left);

  return (
    <div
      style={{
        margin,
        height: `100%`,
        width: photo.width,
        textAlign: "center",
        ...cont,
      }}
    >
      <Img alt={photo.title} fluid={photo.node.childImageSharp.fluid} />
      <div
        style={{
          position: "absolute",
          top: "8px",
          left: "16px",
          backgroundColor: "#000000c0",
          paddingLeft: "20px",
          paddingTop: "10px",
          paddingRight: "10px",
          fontSize: "20px",
          color: "hsla(100, 100%, 100%, 0.9)",
        }}
      >
        <strong>{photo.node.relativeDirectory}</strong>
      </div>
    </div>
  );
};

export default GalleryImage;
