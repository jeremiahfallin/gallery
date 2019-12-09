import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";
import GalleryImages from "../components/GalleryImages";

const StyledMiddleColumn = styled.div`
  display: grid;
  grid-template-rows: 1fr 8fr 0fr;
  grid-row-gap: 30px;
  width: 100%;
  height: 100vh;
`;

const StyledHeader = styled.header`
  align-self: end;
  justify-self: center;
`;

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = this.props.data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} />
        <StyledMiddleColumn>
          <StyledHeader>
            <h1
              style={{
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                marginBottom: 0,
              }}
            >
              {post.frontmatter.date}
            </p>
          </StyledHeader>
          <div style={{ gridRow: "span 2" }}>
            <GalleryImages
              gallery={this.props.data.markdownRemark.frontmatter.title}
            />
          </div>
        </StyledMiddleColumn>
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
