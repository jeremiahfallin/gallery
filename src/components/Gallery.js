import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import "./Gallery.css";

const Gallery = () => {
  const [overlay, setOverlay] = useState(false);
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
            }
          }
        }
      }
      allFile(filter: { name: { eq: "cover" } }) {
        edges {
          node {
            name
            relativePath
            relativeDirectory
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
        <strong>Gallery</strong>
      </div>
      <div style={{ gridTemplateRows: "span 2" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 2fr))",
            gridAutoRows: "minmax(100px, 200px)",
            gridGap: "20px",
            width: "100%",
            height: "100%",
          }}
        >
          {data.allFile.edges.map(image => {
            return (
              <React.Fragment key={image.node.relativeDirectory}>
                <Link
                  to={`/${image.node.relativeDirectory}/`}
                  style={{ boxShadow: `none` }}
                >
                  <div className="item">
                    <Img
                      fluid={image.node.childImageSharp.fluid}
                      style={{ height: "100%", width: "100%" }}
                    />
                    <div className="item__overlay">
                      <button
                        onClick={e => {
                          setOverlay(true);
                        }}
                      >
                        {image.node.relativeDirectory}
                      </button>
                    </div>
                  </div>
                </Link>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
