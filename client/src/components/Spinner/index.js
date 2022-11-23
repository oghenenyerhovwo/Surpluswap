import React from 'react'
import { AnimatePresence, motion } from "framer-motion"

import "./style.css"

const fade = {
    hidden: {
      opacity: 0,
      transition: { ease: "easeInOut"},
    },
    visible: {
      opacity: 1,
      transition: { ease: "easeInOut"},
    }
  }

const Ball = ({duration, delay}) => {
    const ballVariant = {
        hidden: {
            transition: { ease: "easeInOut"},
        },
        visible: { 
            left: ["20%", "80%", "20%"],
            transition: { repeat: Infinity, ease: "easeInOut", duration: duration, delay: delay},
        }
      }

    return (
        <motion.div 
            variants={ballVariant}
            initial="hidden"
            animate="visible"
            className="ball"
        ></motion.div>
    )
}

const Spinner = () => {

    const balls = [
        {_id: 1, delay: 2, duration: 5},
        {_id: 2, delay: 1.8, duration: 5},
        {_id: 3, delay: 1.6, duration: 5},
        {_id: 4, delay: 1.4, duration: 5},
        {_id: 5, delay: 1.2, duration: 5},
        {_id: 6, delay: 1, duration: 5},
    ]

    return (
        <AnimatePresence mode="wait">
            <motion.div 
                variants={fade}
                initial="hidden"
                animate="visible"
                exit="hidden"
                key="spinner"
                className="app__spinner">
                    <div className="ball_container">
                        <div className="balls spacing-md">
                            {
                                balls.map(ball => (
                                    <React.Fragment key={ball._id}>
                                        <Ball duration={ball.duration} delay={ball.delay} />
                                    </React.Fragment>
                                ))
                            }
                        </div>
                        <div className="loading_text">
                            <h1>Please wait</h1>
                            <div className="dot-pulse"></div>
                        </div>
                        
                    </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Spinner