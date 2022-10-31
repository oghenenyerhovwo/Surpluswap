import React, { useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import Avatar from "../Avatar"
import { ButtonMenu, MenuItem } from 'react-rainbow-components';
import { FaEllipsisV } from 'react-icons/fa';
// import { AiOutlineDoubleRight } from "react-icons/ai"
import SpinnerTwo from "../SpinnerTwo"
import Button from "../Button"
import MessageBox from "../MessageBox"

import styles from "./profile.module.css"

// functions
import { navigateHistory, updateUser, deleteUser } from "../../actions"

// type
import { UPDATE_USER_RESET, DELETE_USER_RESET } from '../../constants/userConstants'




const ProfileCard = props => {

    const { user } = props

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const {
        errorUpdateUser,
        successUpdateUser,
        loadingUpdateUser,
        idUpdateUser,
        currentUser,
        loadingDeleteUser,
        errorDeleteUser,
        successDeleteUser,
        idDeleteUser,
      } =  useSelector(state => state.userStore)

    const [toggleDeleteOverlay, setToggleDeleteOverlay] = useState(false)

    useEffect(() => {
        if(successUpdateUser){
            dispatch({type: UPDATE_USER_RESET})
        }
    }, [dispatch, successUpdateUser])

    useEffect(() => {
        if(successDeleteUser){
          dispatch({type: DELETE_USER_RESET})
          setToggleDeleteOverlay(false)
        }
      }, [dispatch, successDeleteUser])

    const navigateToUserProfile = () => {
        dispatch(navigateHistory(location.pathname, navigate(`/profile/${user._id}`)))
    }

    const changeRole = e => {
        if(user.role === "regular"){
            dispatch(updateUser({role: "admin"}, user._id))
        }
        else if(user.role === "admin"){
            dispatch(updateUser({role: "regular"}, user._id))
        }        
    }

    const handleToggleDeleteOverlay = () => {
        setToggleDeleteOverlay(prevToggle => !prevToggle)
      }

    const handleDeleteAccount = () => {
        dispatch(deleteUser(user._id))
    }

    return (
        <div className={`spacing-xs ${styles.profile}`}>
            <div className={`${styles.col1}`}>
                <div className={`${styles.col1_img}`}>
                    {
                        user.profilePic ? 
                        <img onClick={navigateToUserProfile} src={user.profilePic} alt="profile_pic" /> 
                        : <Avatar onClick={navigateToUserProfile}  gender={user.gender} />
                    }
                </div>
                <div className={`${styles.col1_text}`}>
                    <h3 className="word_break" onClick={navigateToUserProfile} >{user.fullName}</h3>
                    <h4 className="word_break" onClick={navigateToUserProfile} >{user.email}</h4>
                </div>
            </div>
            <div className={`${styles.col2} grid`}>
                {
                    currentUser.role === "superAdmin" && (
                        <div className={`${styles.role_button_container}`}>
                            {
                                (user.role === "regular" || user.role === "admin") ? (
                                    <button className={`${styles.role_button}`} onClick={changeRole}>
                                        <span className={styles.btn_text}>{user.role === "regular" ? "Make Admin" : "Remove as Admin"}</span>
                                        <span className={styles.btn_top_text}>role</span>
                                    </button>
                                ) : (
                                    <button className={`${styles.role_button} ${styles.role_button_superadmin}`} onClick={changeRole}>
                                        <span className={`${styles.btn_text} `}>Admin</span>
                                    </button>
                                )
                            }
                        </div>
                    )
                }
                <div className={styles.menu}>
                    {
                        idUpdateUser === user._id && (
                            <> 
                                <div className={styles.response_box}>
                                    {(loadingUpdateUser || loadingDeleteUser) && <SpinnerTwo />}
                                    {(errorUpdateUser || errorDeleteUser) && <MessageBox variant="danger" >{errorUpdateUser} </MessageBox>}
                                </div>
                            </>
                        )
                    }
                    <ButtonMenu
                        menuSize="extra-small"
                        icon={<FaEllipsisV/>}
                    >
                        <MenuItem onClick={handleToggleDeleteOverlay}  label="Delete"/>
                    </ButtonMenu>
                    {
                        toggleDeleteOverlay && <div className={`flex flex__center ${styles.delete_overlay}`}>
                            <div className={styles.delete_overlay_container}>
                            <h2 className="spacing-md">Are you sure you want to delete this account?</h2>
                            
                            {
                                idDeleteUser === user._id && (
                                    <> 
                                        {errorDeleteUser && <MessageBox variant="danger">{errorDeleteUser} </MessageBox> }
                                        {loadingDeleteUser && <SpinnerTwo /> }
                                    </>
                                )
                            }

                            {(errorDeleteUser || loadingDeleteUser) && <><br /><br /></>}
                            <div className={styles.delete_overlay_container_button}>
                                <Button variant="secondary" onClick={handleDeleteAccount}>Delete</Button>
                                <Button onClick={handleToggleDeleteOverlay}>Cancel</Button>
                            </div>
                            </div>
                        </div>
                    }
                </div>
                
                
            </div>
        </div>
    )
}

export default ProfileCard