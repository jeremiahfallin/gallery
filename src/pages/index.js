import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = ({ data }) => {
  const [imageIndex, setImageIndex] = useState(5);

  useEffect(() => {
    data.allFile.edges.shift();
    setImageIndex(i => i - 1);
  }, []);

  return (
    <Layout>
      <SEO title="Home" />
      <div
        style={{
          display: "grid",
          gridTemplateRows: "1fr 4fr 0fr",
          gridRowGap: "30px",
          width: "100%",
          height: "100vh",
        }}
      >
        <header
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          <h1
            onClick={e => {
              setImageIndex(i =>
                i - 1 >= 0 ? i - 1 : data.allFile.edges.length - 1
              );
            }}
            style={{
              marginBottom: 0,
              fontSize: "20px",
              alignSelf: "end",
              justifySelf: "left",
              color: "#6699ff",
              cursor: "pointer",
            }}
          >
            ← Previous
          </h1>
          <h1
            style={{
              marginBottom: 0,
              alignSelf: "end",
              justifySelf: "center",
            }}
          >
            Home
          </h1>
          <h1
            onClick={e =>
              setImageIndex(i => (i + 1) % data.allFile.edges.length)
            }
            style={{
              marginBottom: 0,
              fontSize: "20px",
              alignSelf: "end",
              justifySelf: "right",
              color: "#6699ff",
              cursor: "pointer",
            }}
          >
            Next →
          </h1>
        </header>
        <div>
          <div style={{ gridRow: "span 2" }}>
            <div
              style={{
                display: "grid",
                width: "100%",
                height: "100%",
              }}
            >
              <React.Fragment key={imageIndex}>
                {data.allFile.edges[imageIndex].node.relativeDirectory && (
                  <Link
                    to={`/${data.allFile.edges[imageIndex].node.relativeDirectory}/`}
                    style={{ boxShadow: `none` }}
                  >
                    <div className="item">
                      <Img
                        fluid={
                          data.allFile.edges[imageIndex].node.childImageSharp
                            .fluid
                        }
                        style={{ height: "100%", width: "100%" }}
                      />
                      <div className="item__overlay">
                        <button>
                          {
                            data.allFile.edges[imageIndex].node
                              .relativeDirectory
                          }
                        </button>
                      </div>
                    </div>
                  </Link>
                )}
              </React.Fragment>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
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
    allFile(filter: { extension: { regex: "/jpeg|jpg|png|gif/" } }) {
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
`;
