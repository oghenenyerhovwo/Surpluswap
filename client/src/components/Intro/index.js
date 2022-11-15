import React from 'react'
import { motion } from "framer-motion"

import styles from "./intro.module.css"

import Button from "../Button"

import {
    introInterpreter, 
  } from "../../assets"

const Intro = () => {
  return (
    <div className={`${styles.intro}`}>
        <div className={`${styles.container} ${styles.intro_container}`}>
        <div className={styles.intro_col1}>
            <h1 className="spacing-sm">Impex Funds</h1>
            <p className="spacing-md">Enjoy seamless, unlimited and swift payments for all of your RMB, Gift Cards and Crypto transactions.</p>
            <Button type="link" variant="primary">TRADE WITH US TODAY</Button>
        </div>
        <div className={styles.intro_col2}>
            <motion.img src={introInterpreter} alt="introInterpreter" />
        </div>
        </div>
    </div>
  )
}

export default Intro