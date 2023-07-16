import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from "framer-motion"

import {BsFillTriangleFill} from "react-icons/bs"
import {FaTimes} from "react-icons/fa"
import { pageAnimations } from '../../utils/index'

// importing css
import "./index.css"

const ErrorBox = props => {
    const {
        activateRef,
        inputError,
        errorMessage,
        ownerError,
        name,
        clearError,
    } = props

    const elErrorBox = useRef();

    const [showError, setShowError] = useState(false)

    const clearErrorBox = () => {
        clearError()
        setShowError(false)
    }

    useEffect(() => {
        if(inputError){
            if(activateRef === "unique" || (activateRef && name && activateRef === name)){
                window.scrollTo(15, elErrorBox.current.offsetTop)
            }
            setShowError(true)
        } else{
            setShowError(false)
        }
    }, [inputError, activateRef, name])
    
    return (
        <div ref={elErrorBox} >
            <AnimatePresence mode="wait">
                {
                    showError  && (
                        <motion.div 
                            variants={pageAnimations.swipeLeftRight}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            key="modal"
                            className="error_box" 
                        >
                            <BsFillTriangleFill className="error_box-triangle" />
                            {errorMessage}
                            <div className="cancel_button">
                                {activateRef !== "unique"  && <FaTimes onClick={clearErrorBox} />}
                            </div>
                            {ownerError && <span>Go to <Link to="/">Home Page</Link> </span>}
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}

export default ErrorBox