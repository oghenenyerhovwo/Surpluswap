import React from 'react'

import { motion } from "framer-motion"
import { pathAnimations } from "../../utils/"

const pathVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 2, ease: "easeInOut" },
  },
}

const Circle = props => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
            fill="#000000" stroke="none">
            <motion.path 
                variants={pathVariants}
                initial="hidden"
                animate="visible"
                d="M240 537 c-49 -16 -123 -93 -138 -143 -27 -91 -8 -169 58 -234 93
                    -94 227 -94 320 0 94 93 94 227 0 320 -65 65 -150 85 -240 57z m176 -67 c108
                    -67 106 -234 -4 -302 -51 -31 -133 -31 -184 0 -98 61 -114 196 -33 277 20 19
                    50 39 68 44 44 14 113 5 153 -19z"
            />
        </g>
    </svg>
  )
}

export default Circle