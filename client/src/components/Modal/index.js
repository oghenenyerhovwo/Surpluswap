import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

import styles from "./modal.module.css"

const backdropVariant = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
}

const modalVariant = {
    hidden: {y: "-100vh", opacity: 0},
    visible: {y: "200px", opacity: 1, transition: {delay: 0.5}},
}


const Modal = props => {
    const {showModal, setShowModal} = props
    const modalRef = useRef(null)

    const closeMenuWhnClickOutside = e => {
        if(modalRef.current && showModal && !modalRef.current.contains(e.target)){
            setShowModal(false)
        }
      }

      useEffect(() => {
        document.addEventListener('mousedown', closeMenuWhnClickOutside)
        return () => {
          document.removeEventListener('mousedown', closeMenuWhnClickOutside)
        };
      })

    
    return (
        <AnimatePresence mode="wait">
            {
                showModal && (
                    <motion.div
                        className={`${styles.backdrop}`}
                        initial="hidden" 
                        exit="hidden" 
                        animate="visible" 
                        variants={backdropVariant}
                    >
                        <motion.div ref={modalRef} variants={modalVariant} className={`${styles.modal} container`}>
                            {props.children}
                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default Modal