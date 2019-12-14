import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";

import useInterval from "../components/hooks/useInterval";

const StyledMiddleColumn = styled.div`
  display: grid;
  height: 100vh;

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 900px) {
    align-content: start;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 900px) {
    grid-template-rows: 1fr 8fr 0fr;
    grid-row-gap: 30px;
  }
`;

const StyledImageContainer = styled.div`
  display: grid;
  grid-row-start: 2;
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    object-fit: contain;
    max-height: 100%;
    height: auto;
  }

  @media only screen and (max-width: 900px) {
    align-content: start;
  }

  @media only screen and (min-width: 900px) {
    grid-row-start: 2;
  }
`;

const IndexPage = ({ data }) => {
  const [imageIndex, setImageIndex] = useState(5);
  const [imageArray] = useState(
    data.allFile.edges.filter(image => image.node.name !== "icon")
  );

  useInterval(() => {
    setImageIndex(i => (i + 1) % (imageArray.length - 1));
  }, 7000);

  return (
    <Layout>
      <SEO title="Home" />
      <StyledMiddleColumn>
        <StyledImageContainer>
          <Link
            to={`/${imageArray[imageIndex].node.relativeDirectory}/`}
            style={{ boxShadow: `none` }}
          >
            <Img
              fluid={imageArray[imageIndex].node.childImageSharp.fluid}
              imgStyle={{ objectFit: "contain" }}
            />
          </Link>
        </StyledImageContainer>
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
            fluid(maxWidth: 1000, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
