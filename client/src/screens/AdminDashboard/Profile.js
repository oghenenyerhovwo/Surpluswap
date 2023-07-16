import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './profile.module.css'

// import { Card, Button, Tab } from "../../components"
import { ErrorBox, Modal, Avatar } from "../../components"
import { Link, useParams } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

// objects and functions
import { deleteUser, getUser } from "../../actions"
import { DELETE_USER_RESET } from "../../constants/userConstants"

const Profile = props => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const [showModal, setShowModal] = useState(false)

  // global state
  const { 
    user,
    // loadingDeleteUser,
    errorDeleteUser,
    successUpdateUser,
    successDeleteUser,
  } =  useSelector(state => state.userStore)

  const { 
    darkMode,
  }=  useSelector(state => state.generalStore)

  useEffect(() => {
    dispatch(getUser(params.id))
  }, [dispatch, successUpdateUser, successDeleteUser, params.id])

  useEffect(() => {
    if(successDeleteUser){
      dispatch({type: DELETE_USER_RESET})
      setShowModal(false)
      navigate("/")
    }
  }, [dispatch, successDeleteUser, navigate])


  const toggleModal = (e) => {
    e.preventDefault()
    setShowModal(prevToggle => !prevToggle)
  }

  const handleBlockAccount = () => {
    dispatch(deleteUser(user._id))
  }
  
  return (
    <AnimatePresence mode="wait">
        <section className={`${styles.profile} ${darkMode && styles.profile_dark} container`}>
            <div className={`${styles.head} spacing-lg`}>
                <div className={`${styles.profile_pic} spacing-xs`}>
                    <Avatar />
                </div>
                <h4 className={`${styles.name} spacing-xs`}>{user.userName}</h4>
            </div>
            <div className={`spacing-md ${styles.about}`}>
                <div className={`grid ${styles.about_section} spacing-sm`}>
                    <h3 className={styles.about_section_label}>First Name:</h3>
                    <h3 className={styles.about_section_label_text}>{user.firstName}</h3>
                </div>
                {
                    user.lastName && (
                        <div className={`grid ${styles.about_section} spacing-sm`}>
                            <h3 className={styles.about_section_label}>Last Name:</h3>
                            <h3 className={`soft_blue ${styles.about_section_label_text}`}>{user.lastName}</h3>
                        </div>
                    )
                }
                <div className={`grid ${styles.about_section} spacing-sm`}>
                    <h3 className={styles.about_section_label}>Email:</h3>
                    <h3 className={styles.about_section_label_text}>{user.email}</h3>
                </div>
                <div className={`grid ${styles.about_section} spacing-sm`}>
                    <h3 className={styles.about_section_label}>Phone Number:</h3>
                    <h3 className={styles.about_section_label_text}>{user.phoneNumberTextWithCode}</h3>
                </div>
                <div className={`grid ${styles.about_section} spacing-sm`}>
                    <h3 className={styles.about_section_label}>Total Amount of yuan bought:</h3>
                    <h3 className={styles.about_section_label_text}>{0}</h3>
                </div>
                <div className={`grid ${styles.about_section} spacing-sm`}>
                    <h3 className={styles.about_section_label}>Total Number of yuan sold</h3>
                    <h3 className={styles.about_section_label_text}>{0}</h3>
                </div>
            </div>
                
            <div className={`${styles.about_buttons} spacing-lg`}>
                <Link 
                    className={`spacing-sm`} 
                    to={`#`}
                >
                    <button
                        onClick={toggleModal} 
                        variant="danger"
                        className={`${styles.about_button_delete}`} 
                    >
                        Block Account
                    </button>
                </Link>
            </div>
            
            <Modal  
                className="modal container"
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <p className="spacing-md">Are you sure you want to block this account?</p>
                
                <div className="spacing-md">
                    <ErrorBox 
                        activateRef={"unique"} 
                        inputError={errorDeleteUser} 
                        errorMessage={errorDeleteUser}
                    />
                </div>
                <Link to="#">
                    <button onClick={handleBlockAccount}>Block</button>
                </Link>
            </Modal>
        </section>
    </AnimatePresence>
  )
}

export default Profile
