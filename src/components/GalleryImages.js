import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import "./GalleryImages.css";

const GalleryImages = ({ gallery }) => {
  const [overlayImagePath, setOverlayImagePath] = useState("");
  const [overlay, setOverlay] = useState(false);
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
    <section className="page">
      {data.map(
        image =>
          image.node.relativePath.includes(gallery) && (
            <React.Fragment key={image.node.childImageSharp.fluid.src}>
              <div className="item">
                <Img
                  className="img"
                  fluid={image.node.childImageSharp.fluid}
                  onClick={e => {
                    setOverlay(true);
                    setOverlayImagePath(image.node.childImageSharp.fluid);
                  }}
                />
                <div className="item__overlay">
                  <button
                    onClick={e => {
                      setOverlay(true);
                      setOverlayImagePath(image.node.childImageSharp.fluid);
                    }}
                  >
                    View →
                  </button>
                </div>
              </div>
              <div className={overlay ? "overlay open" : "overlay"}>
                <div className="overlay-inner">
                  <button
                    className="close"
                    onClick={e => {
                      setOverlay(false);
                    }}
                  >
                    × Close
                  </button>
                  {overlay && <Img fluid={overlayImagePath} />}
                </div>
              </div>
            </React.Fragment>
          )
      )}
    </section>
  );
};

export default GalleryImages;
