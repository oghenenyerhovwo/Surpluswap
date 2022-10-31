import React from 'react'

import styles from "./card.module.css"

const Paragraph = props => {
  return (
    <p className={styles.card_paragraph}>{props.children}</p>
  )
}

export default Paragraph