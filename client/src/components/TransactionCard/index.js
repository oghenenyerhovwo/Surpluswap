import React from 'react'
import moment from "moment"

import { DotMenu } from "../../components"
import { GrTransaction } from 'react-icons/gr';
import { MenuItem } from 'react-rainbow-components';
import { useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import { truncate } from "../../utils"

const TransactionCard = (props) => {
    const navigate = useNavigate()
    const { transaction,  currentUser, darkMode } = props

    const continueTransaction = () => {
        navigate(`/dashboard/transaction/${transaction._id}/update`)
    }

    const fullTransactionDetails = () => {
        const url = currentUser.role === "admin" ? `/admin/dashboard/transaction/${transaction._id}` : `/dashboard/transaction/${transaction._id}`
        navigate(url)
    }

    return (
        <div className={`${styles.transaction_card} ${darkMode && styles.transaction_card_dark}`}>
            <div className={`${styles.transaction_client_details}`}>
                <div className={`${styles.icon} ${styles[`icon_span-${transaction.type}`]}`}>
                    <span> {transaction.type === "sell" ? "sale" : "buy"} </span>
                    <span> <GrTransaction /></span>
                </div>
                <p>
                    {`${truncate(`${transaction._id}`, 13)}...`}
                </p>
            </div>

            <div className={`${styles.transaction__details}`}>
                <div className={`${styles.transaction__date}`}>
                    <p>
                        {moment(transaction.updatedAt).format("L").replace("/", "-").replace("/", "-")}
                    </p>
                </div>
               <div  className={`${styles.transaction__status} ${styles[`transaction__status-${transaction.status}`]} flex flex__center`}>
                    <p>
                        {transaction.status}
                    </p>
               </div>
                <div className={`${styles.transaction__amount}`}>
                    <p>
                        {transaction.rmbAmount} 
                        <span>RMB</span>
                    </p>
                </div>
                <div className={`${styles.transaction__menu}`}>
                    <DotMenu darkMode={darkMode}>
                        {
                            currentUser.role === "client" && (
                                <>
                                    <MenuItem label="Full Details" onClick={fullTransactionDetails} />
                                    {transaction.status === "non-active" && <MenuItem label="Continue Transaction" onClick={continueTransaction} />}
                                    {transaction.status === "rejected-by-admin" && <MenuItem label="Resend Payment Proof" onClick={continueTransaction} />}
                                    {transaction.status === "non-active" && <MenuItem label="Delete Transaction" onClick={continueTransaction} />}
                                </>
                            ) 
                        }
                        {
                            currentUser.role === "admin" && (
                                <>
                                    {transaction.status === "pending-admin-approval" &&  <MenuItem label="Full Request" onClick={fullTransactionDetails} />}
                                </>
                            ) 
                        }
                    </DotMenu>
                </div>
            </div>
        </div>
    )
}

export default TransactionCard