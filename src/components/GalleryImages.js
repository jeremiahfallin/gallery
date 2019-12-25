import React, { useState, useCallback } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

import GalleryImage from "./GalleryImage";
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
  const images = edges.filter(image =>
    image.node.relativePath.includes(gallery)
  );
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
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    console.log(event);
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
    if (containerWidth >= 1200) columns = 4;
    return columns;
  }

  const imageRenderer = ({
    index,
    left,
    top,
    key,
    photo,
    direction,
    onClick,
  }) => (
    <React.Fragment key={index}>
      <GalleryImage
        index={index}
        key={index}
        photo={photo}
        fluid={photo.node.childImageSharp.fluid}
        left={left}
        top={top}
        direction={direction}
        onClick={onClick}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Gallery
        photos={imageArray}
        direction="column"
        columns={columns}
        renderImage={imageRenderer}
        onClick={openLightbox}
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
    </div>
  );
};

export default GalleryImages;
