import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { AnimatePresence, motion } from "framer-motion"
import moment from "moment"
import { 
  TransactionTimePicker,
  TransactionCard,
  Button,
  RadioOptions,
  SearchBar,
} from "../../components"

import styles from "./home.module.css"

import { resendEmail } from '../../actions/'

const transactionStatusOptions = [
  {label:"Awaiting Approval", value: "pending-admin-approval"},
  {label:"Completed", value: "completed"},
  {label:"Rejected", value: "rejected-by-client"},
  {label:"All", value: "all"},
]

const rolUp = {
  hidden: {
    y: "-100%",
    transition: {ease: "linear"},
  },
  visible: {
    y: "0%",
    transition: {ease: "linear"},
  },
}


const AdminDashboard = props => {
  const dispatch = useDispatch()

  const {  
    darkMode,
    sellRate,
    buyRate,
  }=  useSelector(state => state.generalStore)

  const { 
    currentUser,
  }=  useSelector(state => state.userStore)

  const { 
    transactions,
  }=  useSelector(state => state.transactionStore)

  const initialSearchState = { options: null };

  const [transactionStatus, setTransactionStatus] = useState("pending")
  const [transactionArrayByDate, setTransactionArrayByDate] = useState(transactions)
  const [transactionArray, setTransactionArray] = useState(transactions)
  const [date, setDate] = useState(new Date())
  const [pickerOption, setPickerOption] = useState("all")
  const [searchState, setSearchState] = useState(initialSearchState)

  useEffect(() => {
    if(searchState.options && searchState.options.length > 0){
      setPickerOption("all")
      setTransactionStatus("all")
      setTransactionArray(searchState.options)
    }
  }, [searchState.options])

  useEffect(() => {
    if(pickerOption === "all"){
      setTransactionArrayByDate(transactions)
    } else {
      setTransactionArrayByDate(transactions.filter(transaction => {
        const dateSelected =  moment(date).format("L")
        const dateTransactionWasCreated = moment(transaction.createdAt).format("L")
        return moment(dateSelected).isSame(moment(dateTransactionWasCreated))
      }))
    }
  }, [pickerOption,transactions,date])

  useEffect(() => {
    if(transactionStatus === "all"){
      setTransactionArray(transactionArrayByDate)
    } else if(transactionStatus === "completed") {
      setTransactionArray(transactionArrayByDate.filter(transaction => transaction.status === "completed"))
    } else if(transactionStatus === "pending") {
      setTransactionArray(transactionArrayByDate.filter(transaction => transaction.editRole === "admin"))
    } else if(transactionStatus === "rejected") {
      setTransactionArray(transactionArrayByDate.filter(transaction => transaction.status === "rejected"))
    }
  }, [transactionArrayByDate, transactionStatus])


  const resendVerificationLink = () => {
    dispatch(resendEmail({ email: currentUser.email, type:"email_verify", }))
  }

  const handleOptionChange = event => {
    const { value } = event.target
    setTransactionStatus(value)
  } 
  
  return (
    <AnimatePresence mode="wait">
          {
            currentUser.isVerified ? (
              <div 
                className={`${styles.dashboard_home} ${darkMode && styles.dashboard_home_dark}`}
              >
                <div className={`${styles.dashboard_transaction} spacing-md`}>
                  <AnimatePresence mode="wait">
                      <motion.div 
                        variants={rolUp}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        key="date_picker_container_home"
                        className={`${styles.dashboard_transaction_container}`}
                      >
                        <TransactionTimePicker
                              darkMode={darkMode}
                              sellRate={Number(sellRate)}
                              buyRate={Number(buyRate)}
                              currentUser={currentUser}
                              date={date}
                              setDate={setDate}
                              pickerOption={pickerOption}
                              setPickerOption={setPickerOption}
                          />
                      </motion.div>
                    </AnimatePresence>
                </div>
                <motion.div 
                  className={`${styles.transactions}`}
                >
                  <div className={`${styles.dashboard_status_options} spacing-md`}>
                    <RadioOptions 
                        orientation="horizontal" 
                        onChange={handleOptionChange} 
                        value={transactionStatus}  
                        options={transactionStatusOptions}
                        darkMode={darkMode}
                    /> 
                  </div>
                  <div className="spacing-md">
                    <SearchBar 
                      data={transactions.map(transaction => {
                        return {...transaction, label: transaction._id}
                      })} 
                      searchState={searchState} 
                      setSearchState={setSearchState}
                      darkMode={darkMode}
                      turnOffDisplaySearchList={true}
                      placeholder="Search by Id"
                    />
                  </div>
                  {
                    transactionArray.length > 0 ? transactionArray.map(transaction => (
                      <div className="spacing-sm" key={transaction._id}>
                          <TransactionCard currentUser={currentUser} darkMode={darkMode} transaction={transaction} />
                      </div>
                    )): (
                      <div>
                          Make a New Transaction Today
                      </div>
                    )
                  }
                </motion.div>
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

export default AdminDashboard
