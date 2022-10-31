import React from 'react'

import styles from "./card.module.css"

const Heading = props => {
  return (
    <h2 className={`${styles.card_heading}`}>{props.children}</h2>
  )
}

export default Heading