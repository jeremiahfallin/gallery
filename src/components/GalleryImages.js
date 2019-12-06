import React, { useState, useCallback } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

import "./GalleryImages.css";

const GalleryImages = ({ gallery }) => {
  const {
    allFile: { edges },
  } = useStaticQuery(graphql`
    query {
      allFile(filter: { extension: { regex: "/jpeg|jpg|png|gif/" } }) {
        edges {
          node {
            name
            relativePath
            childImageSharp {
              id
              fluid(maxWidth: 500) {
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
  console.log(edges);
  const [overlayImagePath, setOverlayImagePath] = useState("");
  const [overlay, setOverlay] = useState(false);
  const images = edges.filter(image =>
    image.node.relativePath.includes(gallery)
  );
  const [imageArray] = useState(
    images.map(i => {
      return {
        src: i.node.childImageSharp.fluid.src,
        width: i.node.childImageSharp.fluid.presentationWidth,
        height: i.node.childImageSharp.fluid.presentationHeight,
      };
    })
  );

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  function columns(containerWidth) {
    let columns = 1;
    if (containerWidth >= 500) columns = 2;
    if (containerWidth >= 900) columns = 3;
    if (containerWidth >= 1500) columns = 4;
    return columns;
  }

  return (
    <div>
      <React.Fragment>
        <Gallery
          photos={imageArray}
          onClick={openLightbox}
          direction="column"
          columns={columns}
        />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={imageArray.map(x => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title,
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </React.Fragment>
    </div>
  );
};

export default GalleryImages;
