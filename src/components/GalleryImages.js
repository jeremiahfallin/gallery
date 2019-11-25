import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

function renderImage(file) {
  return <Img fluid={file.node.childImageSharp.fluid} />;
}

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
                src
              }
            }
          }
        }
      }
    }
  `);
  console.log(edges);
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
      {data.map(
        image =>
          image.node.relativePath === `${gallery}/${image.node.name}.png` && (
            <>
              <Img
                key={image.node.childImageSharp.fluid.src}
                fluid={image.node.childImageSharp.fluid}
                style={{ height: "100%", width: "100%" }}
              />
            </>
          )
      )}
    </div>
  );
};

export default GalleryImages;
