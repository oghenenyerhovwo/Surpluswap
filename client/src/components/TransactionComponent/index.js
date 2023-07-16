import React from 'react'

import styles from "./styles.module.css"

const TransactionComponent = (props) => {
    const { transaction, darkMode } = props

    return (
        <div className={`${styles.transaction} ${darkMode && styles.transaction_dark}`}>{transaction._id}</div>
    )
}

export default TransactionComponent