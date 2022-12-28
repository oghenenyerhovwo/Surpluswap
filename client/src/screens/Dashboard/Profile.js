import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import styles from './profile.module.css'

// import { Card, Button, Tab } from "../../components"
import { Button, ErrorBox, LoadingBoxTwo, MessageBox, Modal, Avatar } from "../../components"
import { Link } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

// objects and functions
import { getUser, deleteUser, resendEmail } from "../../actions"
import { DELETE_USER_RESET } from "../../constants/userConstants"
import { isAdmin, isSuperAdmin, isAuthor } from '../../utils/'

// import { ProfileArticles, activitiesTab, activitiesContent, homeFaq } from "../../utils"


const modalVariant = {
    hidden: {y: "-100vh", opacity: 0},
    visible: {y: "200px", opacity: 1, transition: {delay: 0.5}},
}
const Profile = () => {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  // global state
  const { 
    currentUser,
    errorGetUser,
    successGetUser,
    // loadingDeleteUser,
    errorDeleteUser,
    successDeleteUser,
    user,
  } =  useSelector(state => state.userStore)

  const { 
    lightMode,
  }=  useSelector(state => state.generalStore)

  useEffect(() => {
    if(!user._id){
        dispatch(getUser(params.id))
    }
  }, [dispatch, params.id,user._id])

  useEffect(() => {
    if(successGetUser || errorGetUser){
        setLoading(false)
    }
  }, [dispatch, successGetUser, errorGetUser])

  useEffect(() => {
    if(successDeleteUser){
      dispatch({type: DELETE_USER_RESET})
      toggleModal(false)
      navigate("/")
    }
  }, [dispatch, successDeleteUser, navigate])


  const toggleModal = () => {
    setShowModal(prevToggle => !prevToggle)
  }

  const handleDeleteAccount = () => {
    dispatch(deleteUser(params.id))
  }

   const resendVerificationEmail = () => {
    dispatch(resendEmail({email: currentUser.email, type: "email_verify"}))
  }
  
  return (
    <AnimatePresence mode="wait">
        <LoadingBoxTwo isLoading={loading} />
        <ErrorBox 
            activateRef={"unique"} 
            inputError={errorGetUser} 
            errorMessage={errorGetUser}
        />
      { 
      user._id &&
        <section className={`${styles.profile} ${!lightMode && styles.profile_dark} container`}>
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

            {
                !currentUser.isVerified && (
                    <div className="spacing-lg">
                        <MessageBox variant="success">
                            <p className={styles.verification_alert}>Your account is yet be verified, please check your email inbox or spam for verification message or click on <span onClick={resendVerificationEmail}>resend</span> </p>
                        </MessageBox>
                    </div>
                )
            }
                
            <div className={`${styles.about_buttons} spacing-lg`}>
                {(currentUser && user && isAuthor(currentUser, user)) && <Link to={`/profile/${currentUser._id}/edit/`}><Button variant="primary">Edit Account</Button></Link>}
                {(currentUser && user && (isAuthor(currentUser, user) || isAdmin(currentUser) || isSuperAdmin(currentUser))) && <Button onClick={toggleModal} variant="danger">Delete Account</Button>}
            </div>
            
            <Modal 
                variants={modalVariant} 
                className="modal container"
                showModal={showModal}
                setShowModal={setShowModal}
            >
                <p className="spacing-md">Are you sure you want to delete this account?</p>
                
                <div className="spacing-md">
                    <ErrorBox 
                        activateRef={"unique"} 
                        inputError={errorDeleteUser} 
                        errorMessage={errorDeleteUser}
                    />
                </div>
                <Link to="#">
                    <button onClick={handleDeleteAccount}>Delete</button>
                </Link>
            </Modal>
        </section>
      }
    </AnimatePresence>
  )
}

export default Profile
