import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Images from "./Images";
import ImageSupplier from "./ImageSupplier";

// <Images src={`images/${key}.png`} key={"Image" + String(key)} />

// {images.map(image => (
//     <Img
//       key={image.node.childImageSharp.fluid.src}
//       fluid={image.node.childImageSharp.fluid}
//       style={{ margin: '3rem 0' }}
//     />
//   ))}

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
      <div>
        {data.allMarkdownRemark.edges.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <article key={node.fields.slug}>
              <header>
                <h3 style={{}}>
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
