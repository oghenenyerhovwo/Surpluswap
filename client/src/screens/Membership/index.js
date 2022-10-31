import React from 'react'

import { CustomLink } from "../../components"

import styles from "./membership.module.css"

const Membership = () => {
  return (
    <div className={styles.membership}>
      <CustomLink href="/profile">See all members</CustomLink>
    </div>
  )
}

export default Membership