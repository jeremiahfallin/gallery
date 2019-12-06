import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";

import useInterval from "../components/hooks/useInterval";

const IndexPage = ({ data }) => {
  const [imageIndex, setImageIndex] = useState(5);
  const [imageArray] = useState(
    data.allFile.edges.filter(image => image.node.name !== "icon")
  );

  useInterval(() => {
    setImageIndex(i => (i + 1) % (imageArray.length - 1));
  }, 5000);

  return (
    <Layout>
      <SEO title="Home" />
      <div
        style={{
          display: "grid",
          gridTemplateRows: "1fr 8fr 0fr",
          gridRowGap: "30px",
          width: "100%",
          height: "100vh",
        }}
      >
        <header
          style={{
            display: "grid",
            height: "100%",
            width: "100%",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          <h1
            onClick={e => {
              setImageIndex(i => (i - 1 >= 0 ? i - 1 : imageArray.length - 1));
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
            onClick={e => setImageIndex(i => (i + 1) % imageArray.length)}
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
        <div style={{ gridRow: "span 2" }}>
          <div
            style={{
              display: "grid",
              width: "100%",
              height: "100%",
            }}
          >
            <React.Fragment key={imageIndex}>
              {imageArray[imageIndex].node.relativeDirectory && (
                <Link
                  to={`/${imageArray[imageIndex].node.relativeDirectory}/`}
                  style={{ boxShadow: `none` }}
                >
                  <div className="item">
                    <Img
                      fluid={imageArray[imageIndex].node.childImageSharp.fluid}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        justifySelf: "center",
                      }}
                    />
                    <div className="item__overlay">
                      <button>
                        {imageArray[imageIndex].node.relativeDirectory}
                      </button>
                    </div>
                  </div>
                </Link>
              )}
            </React.Fragment>
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
