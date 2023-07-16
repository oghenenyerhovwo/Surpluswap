import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { AnimatePresence, motion } from "framer-motion"
import moment from "moment"
import { 
  TransactionBoard,
  TransactionCard,
  Button,
  DashboardTab,
} from "../../components"
import { FiNavigation } from 'react-icons/fi';

import styles from "./home.module.css"
import { resendEmail } from '../../actions/'

const transactionTimeArray = [
  {_id: 1, label:"All", itemKey: "all"},
  {_id: 2, label:"Today", itemKey: "today"},
  {_id: 3, label:"Last 7 days", itemKey: "last7Days"},
  {_id: 4, label:"Last 4 weeks", itemKey: "last4Weeks"},
  {_id: 5, label:"Last 12 months", itemKey: "last12Months"},
]
const transactionStatusArray = [
  {_id: 1, label:"All", itemKey: "all"},
  {_id: 2, label:"Completed", itemKey: "completed"},
  {_id: 3, label:"Approved", itemKey: "approved"},
  {_id: 4, label:"Rejected", itemKey: "rejected"},
  {_id: 5, label:"Pending", itemKey: "pending"},
  {_id: 6, label:"Non-active", itemKey: "non-active"},
]

const backdropVariant = {
  hidden: {opacity: 0},
  visible: {opacity: 1},
  exit: {opacity: 1},
}

const Dashboard = props => {
  const dispatch = useDispatch()
  const smallScreenTabRef = useRef(null)

  const { 
    darkMode,
    sellRate,
    buyRate,
  }=  useSelector(state => state.generalStore)

  const { 
    currentUser,
  }=  useSelector(state => state.userStore)

  const { 
    transactionsMine,
  }=  useSelector(state => state.transactionStore)

  const [activeKey, setActiveKey] = useState("all")
  const [transactionStatus, setTransactionStatus] = useState("all")
  const [transactionTime, setTransactionTime] = useState("all")
  const [tabItemsType, setTabItemsType] = useState("time")
  const [prevActiveKey, setPrevActiveKey] = useState(null)
  const [displayTab , setDisplayTab ] = useState(true)
  const [tabItems, setTabItems] = useState(transactionTimeArray)
  const [transactions, setTransactions] = useState(transactionsMine)
  const [displaySmallScreenTab, setDisplaySmallScreenTab] = useState(false)

  useEffect(() => {
    const filterByTransactionStatus = transactionStatus === "all" ? transactionsMine : transactionsMine.filter(transaction => transaction.status && transaction.status.includes(transactionStatus))
    
    const acceptableDateDifference = transactionTime === "last7Days" ? 7 : transactionTime === "last4Weeks" ? 28 : transactionTime === "last12Months" ? 336 : 0 
    const dateEndBoundary =  moment().subtract(acceptableDateDifference, "days").format("L")
    const filterByTransactionTime = transactionTime === "all"? filterByTransactionStatus :  filterByTransactionStatus.filter(transaction => {
        const dateTransactionWasCreated = moment(transaction.createdAt).format("L")
        return moment(dateTransactionWasCreated).isSameOrAfter(moment(dateEndBoundary))
    })
    setTransactions(filterByTransactionTime)
  }, [transactionStatus,transactionTime,transactionsMine])

  const closeMenuWhnClickOutside = e => {
    console.log(smallScreenTabRef)
    if(smallScreenTabRef.current && displaySmallScreenTab && !smallScreenTabRef.current.contains(e.target)){
      setDisplaySmallScreenTab(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', closeMenuWhnClickOutside)
    return () => {
      document.removeEventListener('mousedown', closeMenuWhnClickOutside)
    };
  })

  const handleTabItemsType = () => {
    setDisplayTab(false)
    if(tabItemsType === "time"){
      setTabItemsType("status")
      setTabItems(transactionStatusArray)
      setActiveKey(prevActiveKey || "all")
      setPrevActiveKey(activeKey)
    } else {
      setTabItemsType("time")
      setTabItems(transactionTimeArray)
      setActiveKey(prevActiveKey || "all")
      setPrevActiveKey(activeKey)
    }
    setTimeout(() => {
      setDisplayTab(true)
    }, 500);
  }

  const resendVerificationLink = () => {
    dispatch(resendEmail({ email: currentUser.email, type:"email_verify", }))
  }

  const calculateTransaction = (requiredStatus) => {
    return transactionsMine.filter(transaction => transaction.status === requiredStatus).length
  }

  const openSmallScreenTabDisplay = () => setDisplaySmallScreenTab(true)

  const numberOfRejectedTransactions = calculateTransaction("rejected-by-admin")
  const numberOfApprovedTransactions = calculateTransaction("approved-by-admin")
  
  return (
    <AnimatePresence mode="wait">
          {
            currentUser.isVerified ? (
              <div 
                className={`${styles.dashboard_home} ${darkMode && styles.dashboard_home_dark}`}
              >
                <div className={`${styles.dashboard_tabs_container} ${styles.dashboard_tabs_container_largescreen}`}>
                  <DashboardTab 
                    displayTab={displayTab}
                    tabItemsType={tabItemsType}
                    tabItems={tabItems}
                    numberOfRejectedTransactions={numberOfRejectedTransactions}
                    numberOfApprovedTransactions={numberOfApprovedTransactions}
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                    setTransactionTime={setTransactionTime}
                    setTransactionStatus={setTransactionStatus}
                    handleTabItemsType={handleTabItemsType}
                  />
                </div>
                <AnimatePresence mode="wait">
                  {
                    displaySmallScreenTab && (
                      <motion.div 
                        initial="hidden" 
                        exit="hidden" 
                        animate="visible" 
                        variants={backdropVariant}
                        ref={smallScreenTabRef}
                        className={`${styles.dashboard_tabs_container} ${styles.dashboard_tabs_container_smallscreen}`}
                      >
                        <DashboardTab 
                          displayTab={displayTab}
                          tabItemsType={tabItemsType}
                          tabItems={tabItems}
                          numberOfRejectedTransactions={numberOfRejectedTransactions}
                          numberOfApprovedTransactions={numberOfApprovedTransactions}
                          activeKey={activeKey}
                          setActiveKey={setActiveKey}
                          setTransactionTime={setTransactionTime}
                          setTransactionStatus={setTransactionStatus}
                          handleTabItemsType={handleTabItemsType}
                        />
                      </motion.div>
                    )
                  }
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  {
                    !displaySmallScreenTab && (
                      <motion.div 
                        className={`${styles.dashboard_tabs_button}`}
                        initial="hidden" 
                        animate="visible" 
                        exit="exit"
                        variants={backdropVariant}
                      >
                        <button onClick={openSmallScreenTabDisplay}><FiNavigation /></button>
                        <div className={`${styles.dashboard_tab_icon_notification}`}>
                            {numberOfRejectedTransactions > 0 && <div className={`${styles.dashboard_tab_icon_notification_rejected}`}>{numberOfRejectedTransactions} </div>}
                            {numberOfApprovedTransactions > 0 && <div className={`${styles.dashboard_tab_icon_notification_approved}`}>{numberOfApprovedTransactions} </div>}
                          </div> 
                      </motion.div>
                    )
                  }
                </AnimatePresence>
                <div className={`${styles.dashboard_transaction} spacing-md`}>
                    <div className={`${styles.dashboard_transaction_container}`}>
                      <TransactionBoard
                            darkMode={darkMode}
                            sellRate={Number(sellRate)}
                            buyRate={Number(buyRate)}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className={`${styles.transactions}`}>
                  {
                    transactions.length > 0 ? transactions.map(transaction => (
                      <div className="spacing-sm" key={transaction._id}>
                          <TransactionCard currentUser={currentUser} darkMode={darkMode} transaction={transaction} />
                      </div>
                    )): (
                      <div>
                          Make a New Transaction Today
                      </div>
                    )
                  }
                </div>
            </div>
            ) : (
              <div className={`${styles.dashboard_unverified_user} flex flex__column flex__center`}>
                <p className="spacing-md">This account has not been verified, check your email for verification link</p>
                <Button onClick={resendVerificationLink} variant="primary" siz="sm" type="Button">RESEND VERIFICATION LINK</Button>
              </div>
            )
          }
    </AnimatePresence>
  )
}

export default Dashboard
