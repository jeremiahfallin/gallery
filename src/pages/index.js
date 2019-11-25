import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = ({ data }) => (
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
      <div
        style={{
          fontSize: "24px",
          alignSelf: "end",
          justifySelf: "center",
        }}
      >
        <strong>Home</strong>
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
                <p />
              </section>
            </article>
          );
        })}
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
  }
`;
