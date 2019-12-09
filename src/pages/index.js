import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";

import useInterval from "../components/hooks/useInterval";

const StyledMiddleColumn = styled.div`
  display: grid;
  grid-template-rows: 1fr 8fr 0fr;
  grid-row-gap: 30px;
  width: 100%;
  height: 100vh;
`;

const StyledHeader = styled.header`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
`;

const ImageCrementer = styled.h1`
  margin-bottom: 0;
  font-size: 20px;
  align-self: end;
  justify-self: ${props => (props.left ? "left" : "right")};
  color: #6699ff;
  cursor: pointer;
`;

const StyledInner = styled.div`
  grid-row: span 2;
`;

const StyledImageContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
`;

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
      <StyledMiddleColumn>
        <StyledHeader>
          <ImageCrementer
            left={true}
            onClick={e => {
              setImageIndex(i => (i - 1 >= 0 ? i - 1 : imageArray.length - 1));
            }}
          >
            ← Previous
          </ImageCrementer>
          <h1
            style={{
              marginBottom: 0,
              alignSelf: "end",
              justifySelf: "center",
            }}
          >
            Home
          </h1>
          <ImageCrementer
            left={false}
            onClick={e => setImageIndex(i => (i + 1) % imageArray.length)}
          >
            Next →
          </ImageCrementer>
        </StyledHeader>
        <StyledInner>
          <StyledImageContainer>
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
          </StyledImageContainer>
        </StyledInner>
      </StyledMiddleColumn>
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
