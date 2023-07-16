import React, { useEffect } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'

// styles
import styles from "./transactiontimepicker.module.css"

// component
import Calendar from "react-calendar"

// functions
import { CREATE_TRANSACTION_RESET } from "../../constants/transactionConstants.js"

import "react-calendar/dist/Calendar.css"

const rollDownOverlay = {
    hidden: {
        height: "100%",
        top: "0%",
        transition: {duration: 1, ease: "easeInOut", type: "spring", bounce: 0.3},
    },
    visible: {
        height: "0%",
        top: "100%",
        transition: {delay: 1, ease: "easeInOut", type: "spring", bounce: 0.3},
    },
}

const rollDownCalendar = {
    hidden: {
        height: "0rem",
        transition: {delay: 1, ease: "easeInOut", type: "spring", bounce: 0.3},
      },
    visible: {
        height: "20rem",
        transition: {duration: 1, ease: "easeInOut", type: "spring", bounce: 0.3},
    },
}

const pickerOptions = [
    { _id: 1, value: 'all', label: 'All' },
    { _id:2, value: 'calendar', label: 'Calendar' },
];

const TransactionTimePicker = props => {
    const dispatch = useDispatch()

    const {
        darkMode,
        date, 
        setDate,
        pickerOption, 
        setPickerOption,
    } = props

    const { 
        successCreateTransaction,
      }=  useSelector(state => state.transactionStore)

    useEffect(() => {
      if(successCreateTransaction){
        dispatch({type: CREATE_TRANSACTION_RESET})
      }
    }, [dispatch, successCreateTransaction])

    return (
        <AnimatePresence mode="wait">
            <div className={`${styles.transaction_date_picker} ${darkMode && styles.transaction_date_picker_dark}`}>
                <div className={`${styles.transaction_date_picker_options}`}>
                    {
                        pickerOptions.length > 0 && pickerOptions.map(option => {
                            const handleChange = () => {
                                setPickerOption(option.value)
                            }
                            return (
                                <div 
                                    key={option._id} 
                                    onClick={handleChange}
                                    className={`${option.value === pickerOption && styles.transaction_date_picker_option_active}`}
                                >
                                    {option.label}
                                </div>
                            )
                        })
                    }
                </div>
                <AnimatePresence mode="wait">
                    {
                        pickerOption === "calendar"  && (
                            <motion.div 
                                className={`${styles.transaction_date_picker_calendar}`}
                                variants={rollDownCalendar}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                key="date_picker"
                            >
                                <Calendar value={date} onChange={setDate} />
                                <motion.div 
                                    variants={rollDownOverlay}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    key="date_overlay"
                                    className={`spacing-md ${styles.transaction_date_picker_calendar_overlay_outer}`}
                                >
                                </motion.div>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
        </AnimatePresence>
    )
}

export default TransactionTimePicker