import React, { useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"

import Avatar from "../Avatar"
import { MenuItem } from 'react-rainbow-components';
import DotMenu from '../DotMenu';
import { CgDanger } from 'react-icons/cg';
import SpinnerTwo from "../SpinnerTwo"
import ErrorBox from "../ErrorBox"
import Modal from "../Modal"
import MessageBox from "../MessageBox"

import styles from "./profile.module.css"

// functions
import { updateUser, deleteUser } from "../../actions" 
import { isSuperAdmin } from "../../utils"  

// type
import { UPDATE_USER_RESET, DELETE_USER_RESET } from '../../constants/userConstants'

const cardVariant = {
    hidden: {x: "0", opacity: 0},
    visible: {x: "0", opacity: 1},
    exit: {x: "-100vw", opacity: 0, transition: {delay: 0.5}},
}

const ProfileCard = props => {

    const { user, darkMode } = props

    const dispatch = useDispatch()

    const {
        errorUpdateUser,
        successUpdateUser,
        currentUser,
        errorDeleteUser,
        successDeleteUser,
        idDeleteUser,
      } =  useSelector(state => state.userStore)

    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [display, setDisplay] = useState(true)

    useEffect(() => {
        if(successUpdateUser){
            dispatch({type: UPDATE_USER_RESET})
            setLoading(false)
        }
    }, [dispatch, successUpdateUser])

    useEffect(() => {
        if(successDeleteUser){
          dispatch({type: DELETE_USER_RESET})
          setShowModal(false)
          setLoading(false)
          idDeleteUser === user._id && setDisplay(true)
        }
      }, [dispatch, successDeleteUser, idDeleteUser, user._id])

    const changeRole = e => {
        if(user.role === "client"){
            dispatch(updateUser({role: "admin", adminRole: "regular"}, user._id))
            setLoading(true)
        }
        else if(user.role === "admin"){
            dispatch(updateUser({role: "client"}, user._id))
            setLoading(true)
        } 
    }


    const handleBlockAccountOverlay = () => {
        setShowModal(prevToggle => !prevToggle)
      }

    const handleBlockAccount = () => {
        dispatch(deleteUser(user._id))
    }

    return (
        <AnimatePresence mode="wait">
            {
                display && (
                    <div 
                        className={`spacing-xs ${styles.profile}`}
                        initial="hidden" 
                        exit="exit"
                        animate="visible" 
                        variants={cardVariant}
                    >
                        <div className={`${styles.col1}`}>
                            <div className={`${styles.col1_img}`}>
                                {
                                    user.profilePic ? 
                                    <img src={user.profilePic} alt="profile_pic" /> 
                                    : <Avatar  gender={user.gender} />
                                }
                            </div>
                            <div className={`${styles.col1_text}`}>
                                <h3 className="text_overflow_ellipsis" >{user.firstName} {" "} {user.lastName}</h3>
                                <h4 className="text_overflow_ellipsis" >{user.email}</h4>
                            </div>
                        </div>
                        <div className={`${styles.col2} grid`}>
                            <div className={`${styles.role_button_container}`}>
                                {
                                    (isSuperAdmin(currentUser) && !isSuperAdmin(user)) ? (
                                        <button className={`${styles.role_button}`} onClick={changeRole}>
                                            <span className={styles.btn_text}>{user.role === "regular" ? "Make Admin" : "Remove as Admin"}</span>
                                            <span className={styles.btn_top_text}>role</span>
                                        </button>
                                    ) : (
                                        <button className={`${styles.role_button} ${styles.role_button_superadmin}`}>
                                             <span className={styles.btn_text}>{user.role === "admin" && "Admin"}</span>
                                        </button>
                                    )
                                }
                            </div>
                            <div className={styles.menu}>
                                <> 
                                    <div className={styles.response_box}>
                                        {loading && <SpinnerTwo />}
                                        {(errorUpdateUser || errorDeleteUser) && <MessageBox variant="danger" ><CgDanger /></MessageBox>}
                                    </div>
                                </>
                                {
                                    !(isSuperAdmin(currentUser) && !isSuperAdmin(user)) && (
                                        <DotMenu darkMode={darkMode}>
                                            <MenuItem onClick={handleBlockAccountOverlay}  label="Block"/>
                                            <MenuItem onClick={changeRole}  label={user.role == "client" ? "Make Admin" : "Remove as Admin"} />
                                        </DotMenu>
                                    )
                                }
                                
                            </div>
                        </div>
                        <div className={`${styles.admin_role}`}>
                            <h3 className={styles.admin_role_text}>{user.role === "admin" && "Admin"}</h3>
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
                    </div>
                )
            }
        </AnimatePresence>
    )
}

export default ProfileCard