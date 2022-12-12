import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'


import { LOADING_RESET } from "../../constants/generalConstants"

// importing css
import "./index.css"

const fadeInOut = {
    hidden: {opacity: 0,  duration: 1},
    visible: {opacity: 1, duration: 1},
    exit: {opacity: 0, duration: 1},
}

const LoadingBox = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { 
        loadingData,
    }=  useSelector(state => state.generalStore)

    const [display, setDisplay] = useState(false)
    const [count, setCount] = useState(7)

    useEffect(() => {
        if(loadingData.title){
            setDisplay(true)
        }
    }, [loadingData])

    useEffect(() => {
        if(loadingData.state === "success" || loadingData.state === "error"){
            const timeOutTime = loadingData.state === "success" ? 7000 : 6000
            setInterval(() => {
                setCount(prevCount => prevCount-1)
            }, 1000);
            setTimeout(() => {
                setDisplay(false)
                dispatch({type: LOADING_RESET})
            }, timeOutTime);

            if(loadingData.state === "success" && loadingData.redirectLink){
                setTimeout(() => {
                    navigate(loadingData.redirectLink)
                }, timeOutTime);
            }
        }
        return () => {
            clearTimeout()
            clearInterval()
          };
    }, [dispatch, loadingData.state, loadingData.redirectLink, navigate])
    
    
    return (
            <AnimatePresence mode="wait">
                {
                    display  && (
                        <div 
                            className={`loading_box_container`}
                        >
                            <motion.div 
                                variants={fadeInOut}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                key="modal"
                                className={`loading_box loading_box_${loadingData.state}`} 
                            >
                                <div className="circle_container">
                                        {/* <Circle animate={true} /> */}
                                        <div className="circle">
                                        </div>
                                </div>
                                <div className="circle_text">
                                    <div className="loading_text">
                                        
                                        { loadingData.title && (
                                            <motion.h3
                                                variants={fadeInOut}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                key="loading_heading"
                                                className={`loading_title_${loadingData.state}`}
                                            >{loadingData.title}</motion.h3>
                                        )}  
                                        {
                                            (!loadingData.state === "success" && !loadingData.state === "error") && (
                                                <div className="dot-pulse"></div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="loader_body">
                                    <p className="spacing-xs">{loadingData.body}</p>
                                    <button className="spacing-xs" onClick={loadingData.btnAction}>{loadingData.btnText}</button>
                                    {
                                        (loadingData.state === "success" && loadingData.redirectText) && (
                                            <p>{loadingData.redirectText} in {count} </p>
                                        )
                                    }
                                </div>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence>
    )
}

export default LoadingBox