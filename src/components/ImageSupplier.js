import { useStaticQuery, graphql } from "gatsby";

const ImageSupplier = () => {
  // Don't forget to set the size of your image in
  // fluid(maxWidth: 300, quality: 100) {
  const { allFile } = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(jpeg)|(png)/" }
          sourceInstanceName: { eq: "galleries" }
        }
      ) {
        edges {
          node {
            childImageSharp {
              fluid(maxWidth: 300, quality: 100) {
                originalName
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  return allFile.edges;
};

export default ImageSupplier;
