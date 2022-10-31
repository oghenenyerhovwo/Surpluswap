import React from 'react'

import styles from "./card.module.css"

const Heading = props => {
  return (
    <h2 className={styles.card_subheading}>{props.children}</h2>
  )
}

export default Heading