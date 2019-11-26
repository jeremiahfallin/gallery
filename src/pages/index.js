import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr 4fr",
        gridRowGap: "30px",
        width: "100%",
        height: "100vh",
      }}
    >
      <header
        style={{
          alignSelf: "end",
          justifySelf: "center",
        }}
      >
        <h1
          style={{
            marginBottom: 0,
          }}
        >
          Home
        </h1>
      </header>
      <div>
        <div style={{ gridRow: "span 2" }}>
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
                  {image.node.relativeDirectory && (
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
                          <button>{image.node.relativeDirectory}</button>
                        </div>
                      </div>
                    </Link>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

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
