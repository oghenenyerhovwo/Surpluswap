import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './profile.module.css'

// import { Card, Button, Tab } from "../../components"
import { ErrorBox, MessageBox, Modal, Avatar } from "../../components"
import { Link } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

// objects and functions
import { deleteUser, resendEmail } from "../../actions"
import { DELETE_USER_RESET } from "../../constants/userConstants"

// import { ProfileArticles, activitiesTab, activitiesContent, homeFaq } from "../../utils"


const Profile = props => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)

  // global state
  const { 
    currentUser,
    // loadingDeleteUser,
    errorDeleteUser,
    successDeleteUser,
  } =  useSelector(state => state.userStore)

  const { 
    transactionsMine,
  }=  useSelector(state => state.transactionStore)

  const { 
    darkMode,
  }=  useSelector(state => state.generalStore)

    const transactionsCompleted = transactionsMine
        .filter(transaction => transaction.status === "completed")
    const numberOfTransactionsCompleted = transactionsCompleted.length
    const transactionPending = transactionsMine
        .filter(transaction => transaction.status === "pending")
    const transactionRejected = transactionsMine
        .filter(transaction => transaction.status === "rejected")
    const numberOfTransactionsPending = [...transactionPending, ...transactionRejected].length
    const numberOfTransactionNonActive = transactionsMine
        .filter(transaction => transaction.status === "non-active")
        .length
    const RMBBought = transactionsCompleted
        .filter(transaction => transaction.type === "buy")
    const amountOfRMBBought = RMBBought.length < 1 ? 0: RMBBought.length < 2 ? RMBBought[0].rmbAmount : RMBBought
        .map(transaction => transaction.rmbAmount)
        .reduce((a,b) => a + b)
    const RMBSold = transactionsCompleted
        .filter(transaction => transaction.type === "sell")
    const amountOfRMBSold = RMBSold.length < 1 ? 0: RMBSold.length < 2 ? RMBSold[0].rmbAmount : RMBSold
        .map(transaction => transaction.rmbAmount)
        .reduce((a,b) => a + b)

  useEffect(() => {
    if(successDeleteUser){
      dispatch({type: DELETE_USER_RESET})
      setShowModal(false)
      navigate("/")
    }
  }, [dispatch, successDeleteUser, navigate])


  const toggleModal = (e) => {
    e.preventDefault()
    setShowModal(prevToggle => !prevToggle)
  }

  const handleDeleteAccount = () => {
    dispatch(deleteUser(currentUser._id))
  }

  const resendVerificationEmail = () => {
    dispatch(resendEmail({email: currentUser.email, type: "email_verify"}))
  }
  
  return (
    <AnimatePresence mode="wait">
        <section className={`${styles.profile} ${darkMode && styles.profile_dark} container`}>
            <div className={`${styles.head} spacing-lg`}>
                <div className={`${styles.profile_pic} spacing-xs`}>
                    <Avatar />
                </div>
                <h4 className={`${styles.name} spacing-xs`}>{currentUser.userName}</h4>
            </div>
            <div className={`spacing-md ${styles.about}`}>
                <div className={`grid ${styles.about_section} spacing-sm`}>
                    <h3 className={styles.about_section_label}>First Name:</h3>
                    <h3 className={`${styles.about_section_label_text}`}>{currentUser.firstName}</h3>
                </div>
                {
                    currentUser.lastName && (
                        <div className={`grid ${styles.about_section} spacing-sm`}>
                            <h3 className={styles.about_section_label}>Last Name:</h3>
                            <h3 className={`soft_blue text_overflow_ellipsis ${styles.about_section_label_text}`}>{currentUser.lastName}</h3>
                        </div>
                    )
                }
                <div className={`grid ${styles.about_section} spacing-sm`}>
                    <h3 className={styles.about_section_label}>Email:</h3>
                    <h3 className={`${styles.about_section_label_text} word_break`}>{currentUser.email}</h3>
                </div>
                <div className={`grid ${styles.about_section} spacing-sm`}>
                    <h3 className={styles.about_section_label}>Phone Number:</h3>
                    <h3 className={`${styles.about_section_label_text} text_overflow_ellipsis`}>{currentUser.phoneNumberTextWithCode}</h3>
                </div>
                <div className={`grid ${styles.about_section} spacing-sm`}>
                    <h3 className={styles.about_section_label}>Total Number of transactions completed:</h3>
                    <h3 className={`${styles.about_section_label_text} text_overflow_ellipsis`}>{numberOfTransactionsCompleted}</h3>
                </div>
                <div className={`grid ${styles.about_section} spacing-sm`}>
                    <h3 className={styles.about_section_label}>Total Number of transactions pending:</h3>
                    <h3 className={`${styles.about_section_label_text} text_overflow_ellipsis`}>{numberOfTransactionsPending}</h3>
                </div>
                <div className={`grid ${styles.about_section} spacing-sm`}>
                    <h3 className={styles.about_section_label}>Total Number of transactions unsubmitted:</h3>
                    <h3 className={`${styles.about_section_label_text} text_overflow_ellipsis`}>{numberOfTransactionNonActive}</h3>
                </div>
                <div className={`grid ${styles.about_section} spacing-sm`}>
                    <h3 className={styles.about_section_label}>Total Amount of RMB bought:</h3>
                    <h3 className={`${styles.about_section_label_text} text_overflow_ellipsis`}>{amountOfRMBBought}</h3>
                </div>
                <div className={`grid ${styles.about_section} spacing-sm`}>
                    <h3 className={styles.about_section_label}>Total Number of RMB sold</h3>
                    <h3 className={`${styles.about_section_label_text} text_overflow_ellipsis`}>{amountOfRMBSold}</h3>
                </div>
            </div>

            {
                !currentUser.isVerified && (
                    <div className="spacing-lg">
                        <MessageBox variant="success">
                            <p className={styles.verification_alert}>Your account is yet be verified, please check your email inbox or spam for verification message or click on <span onClick={resendVerificationEmail}>resend</span> </p>
                        </MessageBox>
                    </div>
                )
            }
                
            <div className={`${styles.about_buttons} spacing-lg`}>
                <Link 
                    className={`spacing-sm`} 
                    to={`/profile/${currentUser._id}/edit/`}
                >
                    <button 
                        className={`${styles.about_button_edit}`}
                    >
                        Edit Account
                    </button>
                </Link>
                <Link 
                    className={`spacing-sm`} 
                    to={`#`}
                >
                    <button
                        onClick={toggleModal} 
                        variant="danger"
                        className={`${styles.about_button_delete}`} 
                    >
                        Delete Account
                    </button>
                </Link>
            </div>
            
            <Modal 
                className="modal container"
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <p className="spacing-md">Are you sure you want to delete this account?</p>
                
                <div className="spacing-md">
                    <ErrorBox 
                        activateRef={"unique"} 
                        inputError={errorDeleteUser} 
                        errorMessage={errorDeleteUser}
                    />
                </div>
                <Link to="#">
                    <button onClick={handleDeleteAccount}>Delete</button>
                </Link>
            </Modal>
        </section>
    </AnimatePresence>
  )
}

export default Profile
