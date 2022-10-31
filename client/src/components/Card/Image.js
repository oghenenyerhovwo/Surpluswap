import React from 'react'

import styles from "./card.module.css"

const ImageCard = props => {
    const {
        src,
        alt,
    } = props
  return (
    <div className={`${styles.card_image}`}>
        <img src={src}  alt={alt || "image"} />
    </div>
  )
}

export default ImageCard