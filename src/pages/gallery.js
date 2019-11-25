import React from "react";

import Gallery from "../components/Gallery";
import Layout from "../components/layout";
import SEO from "../components/seo";

const GalleryPage = () => (
  <Layout>
    <SEO title="Gallery" />
    <Gallery />
  </Layout>
);

export default GalleryPage;
