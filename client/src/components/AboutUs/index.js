import React from 'react'
import { motion } from "framer-motion"
import { useSelector } from 'react-redux'

import { 
    yellowCurve,
    blueBlob,
} from "../../assets"

import { 
  scrollAnimations
} from "../../utils"

import styles from "./aboutus.module.css"

const AboutUs = () => {
  const { 
    darkMode,
  }=  useSelector(state => state.generalStore)

  return (
    <div className={`${styles.about_us} ${darkMode && styles.about_us_dark}`}>
        <div className={`${styles.container} ${styles.about_us_container}`}>
            <div className={`${styles.about_us_heading} spacing-xs`}>
                <motion.img 
                  className={styles.yellow_curve} 
                  src={yellowCurve} 
                  alt="yellowCurve" 
                  variants={scrollAnimations.rotateImgVariant}
                  viewport={scrollAnimations.rotateImgVariant.viewport}
                  whileInView="scrollVisible"
                />
                <div>
                <div className={`${styles.heading_line} spacing-md`}></div>
                <h2>About Us</h2>
                </div>
                <motion.img 
                  className={styles.blue_bob} 
                  src={blueBlob} 
                  alt="blueBlob" 
                  variants={scrollAnimations.translateImgVariant}
                  viewport={scrollAnimations.translateImgVariant.viewport}
                  whileInView="scrollVisible"
                  // whileInView="visible"
                  margin="100px 0 0 0"
                />
            </div>
            <div className={styles.about_us_body}>
              <p>We are changing the narrative of payment remittance for seamless international trades, exchange of crypto, gift cards, data and cable subscriptions.</p>
            </div>
        </div>
    </div>
  )
}

export default AboutUs