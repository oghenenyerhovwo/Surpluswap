import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { useSelector } from 'react-redux'

// importing css
import "./index.css"

const fadeInOut = {
    hidden: {opacity: 0,  duration: 1},
    visible: {opacity: 1, duration: 1},
    exit: {opacity: 0, duration: 1},
}

const LoadingBoxTwo = props => {
    const { isLoading } = props

    const { 
        darkMode,
      }=  useSelector(state => state.generalStore)

    const [display, setDisplay] = useState(false)
    

    useEffect(() => {
        if(isLoading){
            setDisplay(true)
        } else {
            setDisplay(false)
        }
    }, [isLoading])    
    
    return (
            <AnimatePresence mode="wait">
                {
                    display  && (
                        <div 
                            className={`loading_box_two_container ${darkMode && "loading_box_two_container_dark"}`}
                        >
                            <motion.div 
                                variants={fadeInOut}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                key="modal"
                                className={`loading_box_two`} 
                            >
                                <div className={darkMode ? "dot-pulse" : "dot-pulse_dark"}></div>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence>
    )
}

export default LoadingBoxTwo