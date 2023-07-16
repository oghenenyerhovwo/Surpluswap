import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'

// styles
import styles from "./transactionboard.module.css"

// component
import Form from "../Form"
import Naira from "../Naira"
import RadioOptions from "../RadioOptions"
import { FaPlus, FaMinus } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';

// functions
import { createTransaction } from "../../actions"
import { CREATE_TRANSACTION_RESET } from "../../constants/transactionConstants.js"
import { pageAnimations, capitalizeFirstLetter } from '../../utils/'

import Button from "../Button"

const TransactionBoard = props => {
    const dispatch = useDispatch()

    const {
        darkMode,
        sellRate,
        buyRate,
    } = props

    const { 
        successCreateTransaction,
      }=  useSelector(state => state.transactionStore)

    const initialFormState = {
        type: "buy",
        rmbAmount: "1",
        nairaAmount : 1 * buyRate,
    }

    const options = [
        { value: 'buy', label: 'Buy' },
        { value: 'sell', label: 'Sell' },
    ];

    const [form, setForm] = useState(initialFormState)
    const [conversionRate, setConversionRate] = useState(buyRate)

    useEffect(() => {
      if(successCreateTransaction){
        dispatch({type: CREATE_TRANSACTION_RESET})
      }
    }, [dispatch, successCreateTransaction])

    useEffect(() => {
        setForm(prevForm => {
            return {
                ...prevForm,
                nairaAmount : Number(form.rmbAmount) * conversionRate,
            }
        })
    }, [conversionRate, form.rmbAmount])
    

    const handleOptionChange = event => {
        const { value } = event.target
        setForm({
            ...form,
            type: value,
        });
        if(value === "sell"){
            setConversionRate(sellRate)
        } else {
            setConversionRate(buyRate)
        }
    }

    const handleAmountChange = value => {
        const numValue= Number(value)

        if(numValue >= 0 && numValue < 5000){    
            setForm({
                ...form,
                rmbAmount: value,
            })          
        }
    }

    const increaseAmount = () => handleAmountChange((String(Number(form.rmbAmount) + 1)))
    const decreaseAmount = () => handleAmountChange((String(Number(form.rmbAmount) - 1)))
    const changeAmount = (e) => {
        const { value } = e.target
        handleAmountChange(value)
    }

    const handleSubmit = () => {
        dispatch(createTransaction({...form, nairaAmount: form.nairaAmount, rmbAmount: form.rmbAmount}))
    }

    return (
        <AnimatePresence mode="wait">
            <div className={`${styles.transaction_board} ${darkMode && styles.transaction_board_dark}`}>
                <div className={`${styles.transaction_board_calculator} spacing-md`}>
                    <div className="spacing-xs">
                        <RadioOptions 
                            orientation="horizontal" 
                            onChange={handleOptionChange} 
                            value={form.type}  
                            options={options}
                            darkMode={darkMode}
                        />
                    </div>
                        <Form.Input 
                            type="number"
                            value={form.rmbAmount}
                            onChange={changeAmount}
                            min={0}
                            step="0.01"
                        />
                    
                    <div className={styles.transaction_board_calculator_base}>
                        <div className={styles.transaction_board_calculator_buttons}>
                            <FaMinus onClick={decreaseAmount} />
                            <FaPlus onClick={increaseAmount} />
                        </div>
                        <label>RMB</label>
                    </div>
                </div>
                <div className={`spacing-md ${styles.transaction_body}`}>
                    <h1> <Naira />{form.nairaAmount.toFixed(2)}</h1>
                    <AnimatePresence mode="wait">
                        {
                            Number(form.rmbAmount) > 0 && (
                                <motion.div 
                                    variants={pageAnimations.swipeRight}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className={`${styles.transaction_body_buttons}`}
                                >
                                    <Button onClick={handleSubmit} disabled={Number(form.rmbAmount) === 0} size="sm">Proceed to {capitalizeFirstLetter(form.type)}</Button>
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                </div>
                <div className={`${styles.transaction_base}`}>
                    <p>Max: 5000</p>
                    <div className="flex flex_center">
                        <p>1 RMB</p>
                        <p className={`${styles.transaction_base_arrow}`}><BsArrowRight /></p>
                        <p><Naira />{conversionRate}</p>
                    </div> 
                </div>
            </div>
        </AnimatePresence>
    )
}

export default TransactionBoard