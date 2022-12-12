import React, { useEffect } from 'react';
import { motion } from "framer-motion"
import { useSelector, useDispatch } from 'react-redux'

// functions
import { getUser } from "../../actions"
import LoadingBox from "../LoadingBox"

const containerVariants = {
  hidden: {
    opacity: 0.98,
  },
  visible: {
    opacity: 1,
  },
}

const AppContainer =props => {
    const dispatch = useDispatch()

  const { 
    currentUser, 
    token ,
    // successDeleteUser,
    // successSignOut,
    // successUpdateUser,
  }=  useSelector(state => state.userStore)

  const { 
    lightMode,
  }=  useSelector(state => state.generalStore)

  useEffect(() => {
    if(token && !currentUser.email){
      dispatch(getUser())
    }
  }, [currentUser, token, dispatch])

  // useEffect(() => {
  //   if(successDeleteUser || successSignOut || successUpdateUser){
  //     dispatch(getUser())
  //   }
  // }, [dispatch, successDeleteUser, successSignOut, successUpdateUser])

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileInView="scrollVisible"
      whileHover="hoverVisible"
      className={` app_container ${lightMode && "app_container_light"} ${!lightMode && "app_container_dark"}`}
    >
      {props.children}
      <LoadingBox />
    </motion.div>
  )
}

export default AppContainer