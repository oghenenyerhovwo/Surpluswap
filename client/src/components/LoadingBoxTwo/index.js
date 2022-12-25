import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"

// importing css
import "./index.css"

const fadeInOut = {
    hidden: {opacity: 0,  duration: 1},
    visible: {opacity: 1, duration: 1},
    exit: {opacity: 0, duration: 1},
}

const LoadingBoxTwo = props => {
    const { isLoading } = props

    const [display, setDisplay] = useState(false)

    useEffect(() => {
        if(isLoading){
            setDisplay(true)
        }
    }, [isLoading])    
    
    return (
            <AnimatePresence mode="wait">
                {
                    display  && (
                        <div 
                            className={`loading_box_two_container`}
                        >
                            <motion.div 
                                variants={fadeInOut}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                key="modal"
                                className={`loading_box_two`} 
                            >
                                <div className="dot-pulse"></div>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence>
    )
}

export default LoadingBoxTwo