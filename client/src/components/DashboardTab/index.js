import React from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { BsArrowRight } from 'react-icons/bs';

import { pageAnimations } from '../../utils/'


import styles from "./dashboardtab.module.css"


const DashboardTab = props => {
    const {
        displayTab,
        tabItemsType,
        tabItems,
        numberOfRejectedTransactions,
        numberOfApprovedTransactions,
        activeKey,
        setActiveKey,
        setTransactionTime,
        setTransactionStatus,
        handleTabItemsType,
      } = props

    return (
      <div className={`${styles.dashboard_tabs}`}>
          <AnimatePresence mode="wait">
            {
              displayTab && (
                <motion.div 
                  className={`${styles.dashboard_tab}`}
                  variants={pageAnimations.swipeLeft}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className={`${styles.dashboard_tab_icon}`}>
                    <div onClick={handleTabItemsType}  className={`${styles.dashboard_tab_icon_arrow}`}><BsArrowRight /></div>
                    {
                      tabItemsType === "time" && (
                        <div className={`${styles.dashboard_tab_icon_notification}`}>
                          {numberOfRejectedTransactions > 0 && <div className={`${styles.dashboard_tab_icon_notification_rejected}`}>{numberOfRejectedTransactions} </div>}
                          {numberOfApprovedTransactions > 0 && <div className={`${styles.dashboard_tab_icon_notification_approved}`}>{numberOfApprovedTransactions} </div>}
                        </div>        
                      )
                    }
                  </div> 
                  <ul>
                    {
                      tabItems.map(item => {
                        const handleActiveLink = () => {
                          setActiveKey(item.itemKey)
                          if(tabItemsType === "time"){
                            setTransactionTime(item.itemKey)
                          } else {
                            setTransactionStatus(item.itemKey)
                          }
                        }
  
                        const activeClassName= item.itemKey === activeKey && styles.dashboard_tab_active_link
                        return (
                          <React.Fragment key={item._id}>
                            <li className={`${activeClassName}`} onClick={handleActiveLink}>
                              {item.label} 
                              <div className={`${styles.dashboard_tab_icon_notification}`}>
                                {item.itemKey === "rejected" && numberOfRejectedTransactions > 0 && <div className={`${styles.dashboard_tab_icon_notification_rejected}`}>{numberOfRejectedTransactions} </div>}
                                {item.itemKey === "approved" && numberOfApprovedTransactions > 0 && <div className={`${styles.dashboard_tab_icon_notification_approved}`}>{numberOfApprovedTransactions} </div>}
                              </div>
                            </li>
                          </React.Fragment>
                        )
                      })
                    }
                  </ul>
                </motion.div>
              )
            }
          </AnimatePresence>
          
        </div>
    )
  }

export default DashboardTab