import React from "react";
import Img from "gatsby-image";

const cont = {
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
};

const GalleryImage = ({
  index,
  photo,
  margin,
  direction,
  top,
  left,
  onClick,
}) => {
  if (direction === "column") {
    cont.position = "absolute";
    cont.left = left;
    cont.top = top;
  }

  return (
    <div
      style={{
        margin,
        height: photo.height,
        width: photo.width,
        textAlign: "center",
        ...cont,
      }}
    >
      <Img
        index={index}
        alt={photo.title}
        fluid={photo.node.childImageSharp.fluid}
        onClick={e =>
          onClick(e, { photo: photo.node.childImageSharp.fluid, index: index })
        }
      />
      {photo.node.relativeDirectory && (
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
      )}
    </div>
  );
};

export default GalleryImage;
