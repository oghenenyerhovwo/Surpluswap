import React from 'react';
import { motion } from "framer-motion"
import { useSelector } from 'react-redux'

// functions
// import { getUser } from "../../actions"

const containerVariants = {
  hidden: {
    opacity: 0.98,
  },
  visible: {
    opacity: 1,
  },
}

const AppContainer =props => {
    // const dispatch = useDispatch()

  // const { 
  //   currentUser, 
  //   token ,
  //   successDeleteUser,
  //   successSignOut,
  //   successUpdateUser,
  // }=  useSelector(state => state.userStore)

  const { 
    lightMode,
  }=  useSelector(state => state.generalStore)

  // useEffect(() => {
  //   if(token && !currentUser.email){
  //     dispatch(getUser())
  //   }
  // }, [currentUser, token, dispatch])

  // useEffect(() => {
  //   if(successDeleteUser || successSignOut || successUpdateUser){
  //     dispatch(getUser())
  //   }
  // }, [dispatch, successDeleteUser, successSignOut, successUpdateUser])

  return (
    <motion.div 
      className="app_container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileInView="scrollVisible"
      whileHover="hoverVisible"
    >
      <div className={`${"app_container_light"} ${!lightMode && "app_container_dark"}`}>{props.children}</div> 
    </motion.div>
  )
}

export default AppContainer