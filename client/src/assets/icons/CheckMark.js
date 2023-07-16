import React from 'react'

import { motion } from "framer-motion"

const pathVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 10, ease: "easeInOut" },
  },
}

const CheckMark = props => {
  return (
    <svg
      id="svg1871"
      viewBox="0 0 159.33 151.82"
      version="1.0"
    >
      <g
          id="layer1"
          transform="translate(-103.19 -530.74)"
        >
      <motion.path
          d="m256.76 532.51c-30.93 26.36-62.8 54.25-79.01 92.45-2.95 6.4-5.39 13.45-7.62 19.93-14.72-19.23-39.04-26.77-60.53-35.72-10.08-4.26-6.53 6.57-1.17 9.48 26.87 13.36 51.68 39.12 67.34 63.91 11.65-55.62 49.6-101.6 85.24-144.45 3.01-3.56 1.51-10.7-4.25-5.6z"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
      />
    </g>
  </svg>
  )
}

export default CheckMark