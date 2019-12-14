import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { default as Galleries } from "react-photo-gallery";
import GalleryImage from "./GalleryImage";

import "./Gallery.css";

const StyledMiddleColumn = styled.div`
  display: grid;
  grid-template-rows: 1fr 8fr 0fr;
  grid-row-gap: 30px;
  width: 100%;
  height: 100vh;

  @media only screen and (max-width: 600px) {
    grid-auto-flow: row;
    height: 50vh;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
  }
`;

const GalleryStyles = styled.div`
  display: grid;
  grid-template-rows: span 2;
  gap: 100px 20px;
  width: 100%;
  height: 100%;
`;

const Gallery = () => {
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
              fluid(maxWidth: 4000, quality: 90) {
                ...GatsbyImageSharpFluid
                presentationWidth
                presentationHeight
              }
            }
          }
        }
      }
    }
  `);

  const images = data.allFile.edges;

  const [imageArray] = useState(
    images.map(i => {
      return {
        ...i,
        src: i.node.childImageSharp.fluid.src,
        width: i.node.childImageSharp.fluid.presentationWidth,
        height: i.node.childImageSharp.fluid.presentationHeight,
      };
    })
  );

  function columns(containerWidth) {
    let columns = 1;
    if (containerWidth >= 500) columns = 2;
    if (containerWidth >= 900) columns = 3;
    if (containerWidth >= 1200) columns = 4;
    return columns;
  }

  const imageRenderer = ({ index, left, top, key, photo, direction }) => (
    <React.Fragment key={index}>
      <Link
        to={`/${photo.node.relativeDirectory}/`}
        style={{ boxShadow: `none` }}
        key={index}
      >
        <GalleryImage
          index={index}
          key={index}
          photo={photo}
          fluid={photo.node.childImageSharp.fluid}
          left={left}
          top={top}
          direction={direction}
        />
      </Link>
    </React.Fragment>
  );

  return (
    <StyledMiddleColumn>
      <div style={{ gridTemplateRows: "span 2", gridRowStart: 2 }}>
        <GalleryStyles>
          <Galleries
            photos={imageArray}
            direction="column"
            columns={columns}
            renderImage={imageRenderer}
          />
        </GalleryStyles>
      </div>
    </StyledMiddleColumn>
  );
};

export default Gallery;
