import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const GalleryImages = ({ gallery }) => {
  const {
    allFile: { edges },
  } = useStaticQuery(graphql`
    query {
      allFile(filter: { extension: { regex: "/jpeg|jpg|png|gif/" } }) {
        edges {
          node {
            name
            relativePath
            childImageSharp {
              id
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
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
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 2fr))",
        gridAutoRows: "minmax(100px, 1fr)",
        gridGap: "20px",
        width: "100%",
        height: "100%",
      }}
    >
      {data.map(
        image =>
          image.node.relativePath.includes(gallery) && (
            <React.Fragment key={image.node.childImageSharp.fluid.src}>
              <Img
                fluid={image.node.childImageSharp.fluid}
                style={{ height: "100%", width: "100%" }}
              />
            </React.Fragment>
          )
      )}
    </div>
  );
};

export default GalleryImages;
