import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import GalleryImages from "../components/GalleryImages";

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} />
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
              alignSelf: "end",
              justifySelf: "center",
            }}
          >
            <h1
              style={{
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                display: `block`,
                marginBottom: 0,
              }}
            >
              {post.frontmatter.date}
            </p>
          </header>
          <div style={{ gridRow: "span 2" }}>
            <GalleryImages
              gallery={this.props.data.markdownRemark.frontmatter.title}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
