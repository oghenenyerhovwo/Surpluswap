import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Link } from '../../../node_modules/react-router-dom/index'


import { removeHistory } from "../../actions"

import styles from "./backlink.module.css"

const BackLink = () => {
    const {
        appHistory
      } =  useSelector(state => state.appHistoryStore)
    const dispatch = useDispatch()

    const backLink = appHistory[appHistory.length - 1] || "#"

    const handleRemoveHistory = () => {
        appHistory.length > 0 && dispatch(removeHistory(appHistory[appHistory.length - 1]))
    }

    return (
        <div className={styles.backlink} onClick={handleRemoveHistory}><Link to={backLink}>Back</Link></div>
    )
}

export default BackLink