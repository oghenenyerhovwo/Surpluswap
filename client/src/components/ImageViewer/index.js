import React from 'react'

import Modal from "../Modal"

import styles from "./imageviewer.module.css"

const ImageViewer = props => {
    const { image, showImage, setShowImage, darkMode } = props

  return (
    <Modal
        showModal={showImage}
        setShowModal={setShowImage}
    >
        <div className={`${styles.image_viewer} ${darkMode && styles.image_viewer_dark}`}>
            <img src={image} alt="image_viewer" />
        </div>
    </Modal>
  )
}

export default ImageViewer