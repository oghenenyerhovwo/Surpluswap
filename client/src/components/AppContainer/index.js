import React, { useEffect } from 'react';
import { motion } from "framer-motion"
import { useSelector, useDispatch } from 'react-redux'

// functions
import { signInToken } from "../../actions"
import { SIGNIN_TOKEN_RESET, SIGNOUT_USER_RESET } from "../../constants/userConstants"

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
    successSignOut,
    successSignInToken,
    loadingSignInToken,
    // successDeleteUser,

    // successSignOut,
    // successUpdateUser,
  }=  useSelector(state => state.userStore)

  const { 
    lightMode,
  }=  useSelector(state => state.generalStore)

  useEffect(() => {
    if(token && !currentUser.email && !loadingSignInToken){
      dispatch(signInToken())
    }
  }, [currentUser.email, token, dispatch, loadingSignInToken])

  useEffect(() => {
    if( successSignInToken ){
      dispatch({type: SIGNIN_TOKEN_RESET})
    }
  }, [dispatch, successSignInToken])

  useEffect(() => {
    if( successSignOut){
      dispatch({type: SIGNOUT_USER_RESET})
    }
  }, [dispatch, successSignOut])

  // useEffect(() => {
  //   if(successDeleteUser || successSignOut || successUpdateUser){
  //     dispatch(signInToken())
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