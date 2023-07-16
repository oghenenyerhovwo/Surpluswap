import { useRef, useState, Fragment } from 'react'

import styles from "./imagegallery.module.css"

import ImageViewer from "../ImageViewer"

import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs"
import { AiFillPicture } from 'react-icons/ai'

const Image = props => {
  const [showImage, setShowImage] = useState(false)
  const { darkMode, image } = props

  const toggleImageDisplay = () => setShowImage(prevToggle => !prevToggle)

  return (
    <div 
      className={`${styles.image_gallery_images_card} flex flex__center`}
      onClick={toggleImageDisplay}
    >
        <img src={image.url} alt={`${styles.gallery_image}`} />
        <div className={`${styles.gallery__image_icon} flex flex__column flex__center`}>
            <AiFillPicture />
            <p>Open</p>
        </div>
        <ImageViewer 
            darkMode={darkMode} 
            showImage={showImage} 
            setShowImage={setShowImage}
            image={image.url}
        />
    </div>
  )
}

const ImageGallery = props => {
    const { images, darkMode } = props

    const scrollRef = useRef(null);

    const scroll = (direction) => {
      const { current } = scrollRef;
  
      if (direction === 'left') {
        current.scrollLeft -= 300;
      } else {
        current.scrollLeft += 300;
      }
    };

    const scrollLeft = () => scroll('left')
    const scrollRight = () => scroll('right')
  
    return (
      <div className={`${styles.image_gallery} ${darkMode && styles.image_gallery_dark} flex flex__center`}>
        <div className={`${styles.image_gallery_images}`}>
          <div 
            className={`${styles.image_gallery_images_container}`} 
            ref={scrollRef}
        >
            {images && images.length > 0 && images.map(image => (
              <Fragment key={image._id}>
                <Image 
                  image={image}
                  darkMode={darkMode}
                />
              </Fragment>
            ))}
          </div>
          <div className={`${styles.image_gallery_images_arrows}`}>
            <BsArrowLeftShort className={`${styles.gallery__arrow_icon}`} onClick={scrollLeft} />
            <BsArrowRightShort className={`${styles.gallery__arrow_icon}`} onClick={scrollRight} />
          </div>
        </div>
      </div>
    );
}

export default ImageGallery