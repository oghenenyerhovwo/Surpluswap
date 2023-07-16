import React, { useEffect, useState } from 'react'
import moment from "moment"
import styles from "./transaction.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from "framer-motion"

// components
import { ErrorBox, LoadingBoxTwo, Naira, ImageGallery, Form, ProofOfPaymentPage } from "../../components"
import { FaClipboard } from "react-icons/fa"
import { BsArrowRight } from "react-icons/bs"

// functions
import { getTransactionAdmin, updateTransactionAdmin } from "../../actions"
import { onSubmitError, onChangeError, pageAnimations,objectToArrayWithKeys, capitalizeFirstLetter } from '../../utils'
import { gallery } from '../../assets'

const copiedMessageVariant = {
    hidden: {
      y: "100%",
      opacity: 0,
      transition: { ease: "easeInOut"},
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {duration: 1, ease: "easeInOut"},
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: {duration: 1, ease: "easeInOut"},
    }
  }


const Transaction = props => {
    const dispatch = useDispatch()
    const params = useParams()

    const {
        transaction,
        successGetTransaction,
        errorGetTransaction,
        successUpdateTransaction,
        successDeleteTransaction,
    } =  useSelector(state => state.transactionStore)

    const {
        darkMode,
    } =  useSelector(state => state.generalStore)

    const [displayLoadingBox, setDisplayLoadingBox] = useState(true)
    const [adminStatus, setAdminStatus] = useState("")
    const [form, setForm] = useState({})
    const [error, setError] = useState({})
    const [activateRef, setActivateRef] = useState("")
    const [showCopiedMessage, setShowCopiedMessage] = useState({
        transactionId: false,
    })

    useEffect(() => {
        dispatch(getTransactionAdmin(params.transactionId))
    }, [dispatch, params.transactionId, successUpdateTransaction, successDeleteTransaction])

    useEffect(() => {
        if(successGetTransaction){
            setDisplayLoadingBox(false)
        }
      }, [dispatch, successGetTransaction])
    
    useEffect(() => {
        if(adminStatus === "approve"){
            setForm({popAdmin: (transaction.popAdmin && transaction.popAdmin.length > 1) || [{_id: 1, url: "www.freepik.com/bulaba"}], status: "approved-by-admin"})
            setError({popAdmin: {min: 1, text: ""}})
        } 
        if(adminStatus === "rejected"){
            setForm({messageToClient: "", status: "rejected-by-admin"})
            setError({messageToClient: ""})
        }
      }, [adminStatus, transaction.popAdmin])

    const copyToClipboard = (name,data) => {
        navigator.clipboard.writeText(data)

        setShowCopiedMessage({[name]: true})

        setTimeout(() => {
            setShowCopiedMessage({[name]: false})
        }, 1500);
    }

    const copyTransactionId = () => copyToClipboard("transactionId",transaction._id)
    const approveTransaction = () => setAdminStatus("approve")
    const rejectTransaction = () => setAdminStatus("rejected")
    const handleSubmit = e => {
        e.preventDefault()
        const {isError, errorObject} = onSubmitError(form, error, objectToArrayWithKeys(error), setActivateRef)
        setError(errorObject)
        if(!isError){
            setActivateRef("")
            dispatch(updateTransactionAdmin(form,params.transactionId))
        }
      }
    const handleChange = e => {
        const {name,value} = e.target
        setForm({...form, [name]: typeof(value) === "object" ? value : value.trim()})
        setError(onChangeError(name, value, form, error))
    }

    return (
        <motion.div 
            className={`${styles.transaction} ${darkMode && styles.transaction_dark}`}
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
            {
                !displayLoadingBox && (
                    <>
                        {
                            transaction._id && (
                                <div className={`${styles.transaction_container}`}>
                                    <div className="spacing-lg">
                                        <div className={`${styles.transaction_detail}`}>
                                            <p>Transaction ID </p>
                                            <h3>
                                                <span>{transaction._id}</span>
                                                <FaClipboard onClick={copyTransactionId} />
                                                <AnimatePresence mode="wait">
                                                    {
                                                        showCopiedMessage.transactionId && (
                                                            <motion.span
                                                                variants={copiedMessageVariant}
                                                                initial="hidden"
                                                                animate="visible"
                                                                exit="exit"
                                                                className={`${styles.copied_message}`}
                                                            >
                                                                Copied
                                                            </motion.span>
                                                        )
                                                    }
                                                </AnimatePresence>
                                            </h3>
                                        </div>
                                        <div className={`${styles.transaction_detail}`}>
                                            <p className="spacing-xs">Transaction Type </p>
                                            <h3>
                                                <span>{capitalizeFirstLetter(transaction.type) + "ing"}</span>
                                            </h3>
                                        </div>
                                        <div className={`${styles.transaction_detail}`}>
                                            <p className="spacing-xs">Amount in RMB </p>
                                            <h3>
                                                <span>{transaction.rmbAmount} RMB</span>
                                            </h3>
                                        </div>
                                        <div className={`${styles.transaction_detail}`}>
                                            <p className="spacing-xs">Amount in Naira </p>
                                            <h3>
                                                <span><Naira />{transaction.nairaAmount}</span>
                                            </h3>
                                        </div>
                                        <div className={`${styles.transaction_detail}`}>
                                            <p className="spacing-xs">Rate </p>
                                            <h3>
                                                <span>
                                                    <span>1 RMB</span>
                                                    <span className={`${styles.transaction_rate_arrow}`}><BsArrowRight /></span>
                                                    <span><Naira />{transaction.nairaAmount/transaction.rmbAmount}</span>
                                                </span>
                                            </h3>
                                        </div> 
                                        <div className={`${styles.transaction_detail}`}>
                                            <p className="spacing-xs">Status </p>
                                            <h3>
                                                <span>{capitalizeFirstLetter(transaction.status)} </span>
                                            </h3>
                                        </div>
                                        <div className={`${styles.transaction_detail}`}>
                                            <p className="spacing-xs">Date Created </p>
                                            <h3>
                                                <span>{transaction.createdAt ? moment(transaction.createdAt).format("L"): "------"}</span>
                                            </h3>
                                        </div>
                                        <div className={`${styles.transaction_detail}`}>
                                            <p className="spacing-xs">Date Last Sent for Approval </p>
                                            <h3>
                                                <span>{transaction.dateClient ? moment(transaction.dateClient).format("L"): "------"}</span>
                                            </h3>
                                        </div>
                                        <div className={`${styles.transaction_detail}`}>
                                            <p className="spacing-xs">Date of Last Reply by Admin </p>
                                            <h3>
                                                <span>{transaction.dateAdmin ? moment(transaction.dateAdmin).format("L"): "------"}</span>
                                            </h3>
                                        </div>
                                        <div className={`${styles.transaction_detail}`}>
                                            <p className="spacing-xs">Date Completed </p>
                                            <h3>
                                                <span>{transaction.dateCompleted ? moment(transaction.dateCompleted).format("L"): "------"}</span>
                                            </h3>
                                        </div>
                                        {
                                            transaction.popClient.length > 0 && (
                                                <div className={`${styles.transaction_detail}`}>
                                                    <p className="spacing-xs">Proof of Payment Client </p>
                                                    <ImageGallery darkMode={darkMode} images={gallery} />
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className={`${styles.form_buttons}`}>
                                        <button className={`${styles.reject_button}`} onClick={rejectTransaction}>Reject</button>
                                        <button  className={`${styles.accept_button}`} onClick={approveTransaction}>Approve</button>
                                    </div>
                                    <AnimatePresence mode="wait">
                                        {
                                            adminStatus && (
                                                <motion.div 
                                                    variants={pageAnimations.swipeRight}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    key="admin_form"
                                                    className={`${styles.form_container}`}
                                                >
                                                    <form onSubmit={handleSubmit}>
                                                        <AnimatePresence mode="wait">
                                                            {
                                                                adminStatus === "approve" && (
                                                                    <motion.div
                                                                        variants={pageAnimations.swipeRight}
                                                                        initial="hidden"
                                                                        animate="visible"
                                                                        exit="exit"
                                                                        className="spacing-sm"
                                                                        key="admin_approve_form"
                                                                    >
                                                                        <ProofOfPaymentPage 
                                                                            setForm={setForm}
                                                                            setError={setError}
                                                                            form={form}
                                                                            error={error}
                                                                            activateRef={activateRef}
                                                                            name={"popAdmin"}
                                                                        />
                                                                    </motion.div>
                                                                )
                                                            }
                                                        </AnimatePresence>
                                                        <AnimatePresence mode="wait">
                                                            {
                                                                adminStatus === "rejected" && (
                                                                    <motion.div
                                                                        variants={pageAnimations.swipeRight}
                                                                        initial="hidden"
                                                                        animate="visible"
                                                                        exit="exit"
                                                                        className="spacing-sm"
                                                                        key="admin_reject_form"
                                                                    >
                                                                        <Form.Textarea 
                                                                            label="Enter message"
                                                                            onChange={handleChange}
                                                                            value={form.messageToClient}
                                                                            type="text"
                                                                            name="messageToClient"
                                                                            error={error.messageToClient}
                                                                            placeholder="Describe why transaction was not approved"
                                                                            errorMessage="Describe why transaction was not approved"
                                                                            activateRef={activateRef}
                                                                            required={true}
                                                                            setError={setError}
                                                                        /> 
                                                                    </motion.div>
                                                                )
                                                            }
                                                        </AnimatePresence>                                         
                                                       <div className={`${styles.form_buttons}`}>
                                                         <button type="submit" className={`${styles.submit_button}`}>Done</button>
                                                       </div>
                                                    </form>
                                                </motion.div>
                                            )
                                        }
                                    </AnimatePresence>
                                    <div className={`${styles.return_link}`}>
                                        <Link to={`/admin/dashboard/`}>
                                            Return
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </>
                )
            }
        </motion.div>
    )
}

export default Transaction