import React from 'react'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { motion } from "framer-motion"

import styles from "./intro.module.css"

import Button from "../Button"

import {
    introInterpreter, 
  } from "../../assets"

const Intro = () => {
  const { currentUser } =  useSelector(state => state.userStore)

  return (
    <div className={`${styles.intro}`}>
        <div className={`${styles.container} ${styles.intro_container}`}>
        <div className={styles.intro_col1}>
            <h1 className="spacing-sm">Impex Funds</h1>
            <p className="spacing-md">Enjoy seamless, unlimited and swift payments for all of your RMB, Gift Cards and Crypto transactions.</p>
            <Link to={currentUser._id ? "/dashboard" :"/user/signup" }>
              <Button variant="primary">TRADE WITH US TODAY</Button>
            </Link>
        </div>
        <div className={styles.intro_col2}>
            <motion.img src={introInterpreter} alt="introInterpreter" />
        </div>
        </div>
    </div>
  )
}

export default Intro