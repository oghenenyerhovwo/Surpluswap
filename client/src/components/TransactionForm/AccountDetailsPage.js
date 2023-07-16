import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"

import Naira from "../Naira"
import { FaClipboard } from "react-icons/fa"

import styles from "./accountDetails.module.css"

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

const AccountDetailsPage = props => {
  const {
    transaction,
    accountDetails,
  } = props

  const [showCopiedMessage, setShowCopiedMessage] = useState(false)

  const copyAccountNumberToClipboard = () => {
    navigator.clipboard.writeText(accountDetails.accountNumber)

    setShowCopiedMessage(true)

    setTimeout(() => {
        setShowCopiedMessage(false)
    }, 1500);
}

  return (
    <>
        {
          accountDetails.accountNumber && (
            <div>
              <p className="spacing-md">Send {<Naira />}{transaction.nairaAmount} {transaction.type === "sell" && "RMB"} to the account below  </p>
              <div>
                  <div className={`spacing-sm ${styles.account_details}`}>
                      <h3>Account Name</h3>
                      <h3>{accountDetails.accountName} </h3>
                  </div>
                  <div className={`spacing-sm ${styles.account_details}`}>
                      <h3>Account Number</h3>
                      <h3>
                          <span>{accountDetails.accountNumber}</span>
                          <span className={`${styles.copy_icon}`}><FaClipboard onClick={copyAccountNumberToClipboard} /></span>
                          <AnimatePresence>
                              {
                                  showCopiedMessage && (
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
                  <div className={`spacing-sm ${styles.account_details}`}>
                      <h3>Bank Name</h3>
                      <h3>{accountDetails.bankName} </h3>
                  </div>
                  <div className={`spacing-sm ${styles.account_details}`}>
                      <h3>Account Type</h3>
                      <h3>{accountDetails.accountType} </h3>
                  </div>
              </div>
          </div>
          )
        }
    </>
  )
}
















export default AccountDetailsPage