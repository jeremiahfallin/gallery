import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const GalleryImages = () => {
  const {
    allFile: { edges },
  } = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          relativeDirectory: { eq: "Champion Images" }
          extension: { regex: "/jpeg|jpg|png|gif/" }
        }
      ) {
        edges {
          node {
            name
            childImageSharp {
              id
              fluid {
                src
              }
            }
          }
        }
      }
    }
  `);
  const data = edges;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 200px)",
        gridTemplateRows: "repeat(auto-fill, 200px)",
        gridGap: "20px",
        width: "100%",
        height: "100%",
      }}
    >
      {data.map(image => (
        <Img
          key={image.node.childImageSharp.fluid.src}
          fluid={image.node.childImageSharp.fluid}
          style={{ height: "100%", width: "100%" }}
        />
      ))}
    </div>
  );
};

export default GalleryImages;
