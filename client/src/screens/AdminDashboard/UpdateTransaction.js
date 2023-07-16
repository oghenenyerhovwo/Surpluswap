import React, { useEffect, useState } from 'react'
import styles from "./updatetransaction.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"

// components
import { 
    ErrorBox, 
    LoadingBoxTwo,  
    AccountDetailsPage,
    ProofOfPaymentPage,
    SelectPaymentTypePage,
} from "../../components"
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi"

// functions
import { getTransaction, updateTransaction } from "../../actions"
import { UPDATE_TRANSACTION_RESET } from "../../constants/transactionConstants.js"
import { onSubmitError, pageAnimations, objectToArrayWithKeys } from '../../utils'

const UpdateTransaction = props => {
    const dispatch = useDispatch()
    const params = useParams()

    const {
        transaction,
        successGetTransaction,
        errorGetTransaction,
        errorUpdateTransaction,
        successUpdateTransaction,
        successDeleteTransaction,
    } =  useSelector(state => state.transactionStore)

    const {
        accountDetailsNaira,
        darkMode,
    } =  useSelector(state => state.generalStore)

    const initialFormState = {
        paymentMethod: "paypal",
        paymentAccountNumber :  "",
        popClient: [{_id: 1, url: "www.freepik.com/bulaba"}],
    }

    const initialErrorState = {
        paymentAccountNumber: "",
        popClient: {min: 1, text: ""},
    }

    const initialTransactionDataState = {
        form: initialFormState,
        error: initialErrorState,
        page: 1,
    }

    const localStorageName = `surpluswap_non_active_transactions_${params.transactionId}`
    const numberOfPages = 3

    const [form, setForm] = useState(initialFormState)
    const [error, setError] = useState(initialErrorState)
    const [displayLoadingBox, setDisplayLoadingBox] = useState(false)
    const [activateRef, setActivateRef] = useState("")
    const [transactionData, setTransactionData] = useState(initialTransactionDataState)

    useEffect(() => {
            dispatch(getTransaction(params.transactionId))
    }, [dispatch, params.transactionId, successUpdateTransaction, successDeleteTransaction])

    useEffect(() => {
        if(successGetTransaction){
            setDisplayLoadingBox(false)
        }
      }, [dispatch, successGetTransaction])

    useEffect(() => {
        if(successUpdateTransaction){
            dispatch({type: UPDATE_TRANSACTION_RESET})
        }
    }, [dispatch, successUpdateTransaction])

    useEffect(() => {
        if(transaction._id){
            setTransactionData(JSON.parse(localStorage.getItem(`surpluswap_non_active_transactions_${params.transactionId}`)) || {
                form: {paymentMethod: "paypal", paymentAccountNumber :  "",popClient: [{_id: 1, url: "www.freepik.com/bulaba"}],},
                error: {paymentAccountNumber: "", popClient: {min: 1, text: ""},},
                page: 1,
            })
        }
    }, [dispatch, transaction._id, params.transactionId])

    useEffect(() => {
        if(transactionData.page === 1){
            setForm({
                paymentMethod: "paypal",
                paymentAccountNumber :  "",
                popClient: [{_id: 1, url: "www.freepik.com/bulaba"}],
            })
            setError({}) 
        }
        if(transactionData.page === 2){
            setForm({popClient: (transactionData.form && transactionData.form.popClient) || [{_id: 1, url: "www.freepik.com/bulaba"}],})
            setError({popClient: (transactionData.error && transactionData.error.popClient) || {min: 1, text: ""},})
        }
        if(transactionData.page === 3){
            setForm({
                paymentMethod: (transactionData.form && transactionData.form.paymentMethod) || "paypal",
                paymentAccountNumber : (transactionData.form && transactionData.form.paymentAccountNumber) || "",
            })
            setError({paymentAccountNumber : (transactionData.error && transactionData.error.paymentAccountNumber) || "",})
        }
    }, [dispatch, transactionData])

    const nextPage =e => {
        const {isError, errorObject} = onSubmitError(form, error)
        setError(errorObject)
        if(!isError){
                setActivateRef("")
                if(transactionData.page >= numberOfPages){
                    dispatch(updateTransaction(transactionData.form,transaction._id))
                    setTransactionData({})
                } else {
                    const newTransactionData = {
                        ...transactionData,
                        page: transactionData.page + 1,
                        form:  {
                            ...transactionData.form,
                            ...form,
                        },
                        error:  {
                            ...transactionData.error,
                            ...errorObject,
                        },
                    }
                    localStorage.setItem(localStorageName, JSON.stringify(newTransactionData))
                    setTransactionData(newTransactionData)
                }
            }else {
                const {keys} = objectToArrayWithKeys(error)
                setActivateRef(keys[0])
                const newTransactionData = {
                    ...transactionData,
                    form:  {
                        ...transactionData.form,
                        ...form,
                    },
                    error:  {
                        ...transactionData.error,
                        ...errorObject,
                    },
                }
                setTransactionData(newTransactionData)
                localStorage.setItem(localStorageName, JSON.stringify(newTransactionData))
            }
    }

    const prevPage =() => {
        const newTransactionData = {
            page: transactionData.page <= 1 ? 1: transactionData.page - 1,
            form:  {
                ...transactionData.form,
                ...form,
            },
            error:  {
                ...transactionData.error,
                ...error,
            },
        }
        setTransactionData(newTransactionData)
        localStorage.setItem(localStorageName, JSON.stringify(newTransactionData))
    }
    
    return (
        <motion.div 
            className={` ${styles.updatetransaction} ${darkMode && styles.updatetransaction_dark}`}
            variants={pageAnimations.swipeRight}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <>
                <LoadingBoxTwo isLoading={displayLoadingBox} />
                <ErrorBox 
                    activateRef={"unique"} 
                    inputError={errorGetTransaction} 
                    errorMessage={errorGetTransaction}
                />
            </>
           <>
            {
                (!displayLoadingBox && transaction._id) && (
                    <div className={` grid ${styles.updatetransaction_container}`}>
                        <div className={`${styles.updatetransaction_head} spacing-md`}>
                            <div className={`${styles.updatetransaction_progressbar} spacing-lg`}>
                                <div className={`${styles.updatetransaction_progressbar__item} ${transactionData.page >= 1 && styles.updatetransaction_progressbar__item_active} spacing-lg`}></div>
                                <div className={`${styles.updatetransaction_progressbar__item} ${transactionData.page >= 2 && styles.updatetransaction_progressbar__item_active} spacing-lg`}></div>
                                <div className={`${styles.updatetransaction_progressbar__item} ${transactionData.page >= 3 && styles.updatetransaction_progressbar__item_active} spacing-lg`}></div>
                            </div>
                            <ErrorBox 
                                activateRef={"unique"} 
                                inputError={errorUpdateTransaction} 
                                errorMessage={errorUpdateTransaction}
                            />
                        </div>
                        <div className={`${styles.updatetransaction_main} spacing-md`}>
                            <AnimatePresence>
                                {
                                    transactionData.page === 1 && (
                                        <motion.div
                                            variants={pageAnimations.swipeRight}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <AccountDetailsPage 
                                                transaction={transaction}
                                                accountDetailsNaira={accountDetailsNaira}
                                            />
                                        </motion.div>
                                    )
                                }
                            </AnimatePresence>
                            <AnimatePresence>
                                {
                                    transactionData.page === 2 && (
                                        <motion.div
                                            variants={pageAnimations.swipeRight}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <ProofOfPaymentPage 
                                                setForm={setForm}
                                                setError={setError}
                                                form={form}
                                                error={error}
                                                activateRef={activateRef}
                                            />
                                        </motion.div>
                                    )
                                }
                            </AnimatePresence>
                            <AnimatePresence>
                                {
                                    transactionData.page === 3 && (
                                        <motion.div
                                            variants={pageAnimations.swipeRight}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                        >
                                            <SelectPaymentTypePage 
                                                setForm={setForm}
                                                setError={setError}
                                                form={form}
                                                error={error}
                                                activateRef={activateRef}
                                                darkMode={darkMode}
                                            />
                                        </motion.div>
                                    )
                                }
                            </AnimatePresence>
                        </div>
        
                        <div className={`${styles.updatetransaction_buttons}`}>
                            {
                                transactionData.page > 1 && (
                                    <div className={`${styles.updatetransaction_previous}`}>
                                        <Link to="#">
                                            <button type="button" onClick={prevPage}>
                                                <BiArrowToLeft />
                                                <span>Prev</span>
                                            </button>
                                        </Link>
                                    </div>
                                )
                            }
                            <div className={`${styles.updatetransaction_next}`}>
                                <Link to="#">
                                    <button type="button" onClick={nextPage}>
                                        <span>{transactionData.page >= numberOfPages ? "Finish" : "Next"} </span>
                                        <BiArrowToRight />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
           </>
        </motion.div>
    )
}

export default UpdateTransaction