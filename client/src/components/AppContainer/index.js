import React from 'react';
import { useSelector } from 'react-redux'

// functions
// import { getUser } from "../../actions"

// style
import styles from "./appcontainer.module.css"

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
    <div className={`${styles.app_container} ${lightMode ? styles.app_container_light : styles.app_container_dark}`}>{props.children}</div> 
  )
}

export default AppContainer