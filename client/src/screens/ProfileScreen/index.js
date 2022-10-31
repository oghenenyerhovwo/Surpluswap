import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage"
import moment from "moment"

import styles from './style.module.css'

import {MdArticle} from "react-icons/md"
import { FaUser, FaPlus, FaPen } from "react-icons/fa"

// import { Card, Button, Tab } from "../../components"
import { Tab, Button, MessageBox, Spinner, StoryCard } from "../../components"

// objects and functions
import { getUserById, signOut, deleteUser, updateUser, getStoriesMine, navigateHistory } from "../../actions"
import { GET_USER_BY_ID_RESET, DELETE_USER_RESET, UPDATE_USER_RESET } from "../../constants/userConstants"
import { GET_STORIES_MINE_RESET } from "../../constants/storyConstants"
import { firebaseStorage, isAdmin, isSuperAdmin, isAuthor } from '../../utils/'
import { blankProfilePic } from '../../assets/'

// import { ProfileArticles, activitiesTab, activitiesContent, homeFaq } from "../../utils"



const Profile = () => {
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()
  const dispatch = useDispatch()

  const [tab, setTab] = useState("about")
  const [toggleDeleteOverlay, setToggleDeleteOverlay] = useState(false)
  const [percent, setPercent] = useState(0);

  // global state
  const { 
    currentUser,
    errorGetUserById,
    successGetUserById,
    loadingGetUserById,
    errorUpdateUser,
    successUpdateUser,
    // loadingUpdateUser,
    loadingDeleteUser,
    errorDeleteUser,
    successDeleteUser,
    userByID,
  } =  useSelector(state => state.userStore)

  const {
    errorGetStoriesMine,
    successGetStoriesMine,
    loadingGetStoriesMine,
    storiesMine,
  } =  useSelector(state => state.storyStore)

  useEffect(() => {
    dispatch(getUserById(params.id))
    dispatch(getStoriesMine(params.id))
  }, [dispatch, params.id])

  useEffect(() => {
    if(successGetUserById){
      dispatch({type: GET_USER_BY_ID_RESET})
    }
  }, [dispatch, successGetUserById])

  useEffect(() => {
    if(successUpdateUser){
      dispatch(getUserById(params.id))
      dispatch({type: UPDATE_USER_RESET})
    }
  }, [dispatch, successUpdateUser, params.id])

  useEffect(() => {
    if(successDeleteUser){
      dispatch({type: DELETE_USER_RESET})
      setToggleDeleteOverlay(false)
      navigate("/")
    }
  }, [dispatch, successDeleteUser, navigate])

  useEffect(() => {
    if(successGetStoriesMine){
      dispatch({type: GET_STORIES_MINE_RESET})
    }
  }, [dispatch, successGetStoriesMine])

  const navigateToCreateArticle = () => {
    dispatch(navigateHistory(location.pathname, navigate("/story/create") ))
  }

  const handleToggleDeleteOverlay = () => {
    setToggleDeleteOverlay(prevToggle => !prevToggle)
  }

  const handleSignOut = () => {
    dispatch(signOut(params.id))
  }

  const handleDeleteAccount = () => {
    dispatch(deleteUser(params.id))
  }

  const handleImageChange = e => {
    if(e.target.files && e.target.files[0]){
      const file = e.target.files[0]
      const storageRef = ref(firebaseStorage, `/files/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const currentPercent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(currentPercent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setPercent(0)
            dispatch(updateUser({profilePic: url}, params.id))
            
          });
        }
      )
    }
  }
  
  return (
    <>
      { loadingGetUserById && <Spinner />}
      { errorGetUserById && <MessageBox variant="danger">{errorGetUserById} </MessageBox>}
      { 
      userByID.fullName &&
       <section className="grid container">
          <section className={styles.col1}>
              <div className={`${styles.title} spacing-lg`}>
                  <h2 className={`${styles.name} spacing-xs`}>{userByID.fullName}</h2>
                  <h4 className={styles.membership}>{userByID.membership} Member</h4>
              </div>
              <div className={`spacing-md`}>
                <Tab.ContainerOutline tab={tab}>
                   <Tab.ItemOutline eventKey="timeline" tab={tab} setTab={setTab} ><MdArticle /> Timeline</Tab.ItemOutline>
                  <Tab.ItemOutline eventKey="about" tab={tab} setTab={setTab} ><FaUser /> About</Tab.ItemOutline>
                </Tab.ContainerOutline>
              </div>
              <div className={`spacing-lg`}>
                {
                  tab === "about" && (
                    <div className={`spacing-md ${styles.about}`}>
                      <div className={`${styles.about_section} spacing-md`}>
                        <h4 className="spacing-xs">Basic Information</h4>
                        <div className={`grid ${styles.about_section} spacing-sm`}>
                          <h3 className={styles.about_section_label}>Gender:</h3>
                          <h3 className={styles.about_section_label_text}>{(userByID.gender && userByID.gender.toUpperCase()) || "Not set"}</h3>
                        </div>
                        <div className={`grid ${styles.about_section} spacing-sm`}>
                          <h3 className={styles.about_section_label}>Birthday:</h3>
                          <h3 className={`soft_blue ${styles.about_section_label_text}`}>{(userByID.birthday && moment(userByID.birthday).format("MMMM Do")) || "Not set"}</h3>
                        </div>
                      </div>
                      <div className={`${styles.about_section} spacing-md`}>
                        <h4 className="spacing-xs">Spirituality</h4>
                        <div className={`grid ${styles.about_section} spacing-sm`}>
                          <h3 className={styles.about_section_label}>Catholic:</h3>
                          <h3 className={styles.about_section_label_text}>{userByID.isCatholic ? "Yes": "No"}</h3>
                        </div>
                        <div className={`grid ${styles.about_section} spacing-sm`}>
                          <h3 className={styles.about_section_label}>Communicant:</h3>
                          <h3 className={styles.about_section_label_text}>{userByID.isCommunicant ? "Yes": "No"}</h3>
                        </div>
                        <div className={`grid ${styles.about_section} spacing-sm`}>
                          <h3 className={styles.about_section_label}>Confirmed:</h3>
                          <h3 className={styles.about_section_label_text}>{userByID.isConfirmed ? "Yes": "No"}</h3>
                        </div>
                        <div className={`grid ${styles.about_section} spacing-sm`}>
                          <h3 className={styles.about_section_label}>Parish:</h3>
                          <h3 className={styles.about_section_label_text}>{userByID.parish || "Not set"}</h3>
                        </div>
                        
                      </div>
                      <div className={`${styles.about_section} spacing-lg`}>
                        <h4 className="spacing-xs">Contact Information</h4>
                        <div className={`grid ${styles.about_section} spacing-sm`}>
                          <h3 className={styles.about_section_label}>Phone:</h3>
                          <h3 className={`soft_blue ${styles.about_section_label_text} word_break`}>{userByID.phoneNumber && (userByID.phoneNumber.phone ? `${userByID.phoneNumber.countryCode} ${Number(userByID.phoneNumber.phone)}` : "Not set")}</h3>
                        </div>
                        <div className={`grid ${styles.about_section} spacing-sm`}>
                          <h3 className={styles.about_section_label}>Email:</h3>
                          <h3 className={`soft_blue ${styles.about_section_label_text} word_break`}>{userByID.email}</h3>
                        </div>
                      </div>
                      <div className={`${styles.about_buttons} spacing-lg`}>
                        {(currentUser && userByID && isAuthor(currentUser, userByID)) && <Button type="link" href={`/profile/${currentUser._id}/edit/?redirect=${location.pathname}`} variant="primary">Edit Account</Button>}
                        {(currentUser && userByID && isAuthor(currentUser, userByID)) && <Button onClick={handleSignOut}>Sign Out</Button>}
                        {(currentUser && userByID && (isAuthor(currentUser, userByID) || isAdmin(currentUser) || isSuperAdmin(currentUser))) && <Button onClick={handleToggleDeleteOverlay} variant="secondary">Delete Account</Button>}
                      </div>
                      {
                        toggleDeleteOverlay && <div className={`flex flex__center ${styles.delete_overlay}`}>
                            <div className={styles.delete_overlay_container}>
                              <h2 className="spacing-md">Are you sure you want to delete this account?</h2>
                              {errorDeleteUser && <MessageBox variant="danger">{errorDeleteUser} </MessageBox> }
                              {loadingDeleteUser && <Spinner /> }
                              {(errorDeleteUser || loadingDeleteUser) && <><br /><br /></>}
                              <div className={styles.delete_overlay_container_button}>
                                <Button variant="secondary" onClick={handleDeleteAccount}>Delete</Button>
                                <Button onClick={handleToggleDeleteOverlay}>Cancel</Button>
                              </div>
                            </div>
                        </div>
                      }
                    </div>
                  )
                }

                {
                  tab === "timeline" && (
                    <div className={styles.timeline}>
                        {
                            loadingGetStoriesMine ? <Spinner /> :
                            errorGetStoriesMine ? <MessageBox variant="danger">{errorGetStoriesMine} </MessageBox> :
                            storiesMine.length > 0 ? (
                              <>
                                  {
                                    storiesMine.map(story => (
                                      <React.Fragment key={story._id}>
                                          <StoryCard story={story} />
                                      </React.Fragment>
                                    ))
                                  }
                            </>
                          ): (
                            <div>
                                <br />
                                <br />
                                <div onClick={navigateToCreateArticle} className={`flex flex__center flex__column ${styles.no_timeline}`}>
                                  <div className={`flex flex__center spacing-sm ${styles.no_timeline_icon}`}>
                                      <FaPlus />
                                  </div>
                                  <h1 className="spacing-sm">Share your Knowledge</h1>
                                  <p>Post edifying contents on personal spirituality, the church, facts, personal struggles, etc....This is a community</p>
                                  
                                </div>
                                <br />
                                <br />
                            </div>
                          )
                        }
                    </div>
                  )
                }
              </div>
          </section>

          <section className={`${styles.col2} spacing-md`}>
            
              {
                userByID.profilePic ?
                <img className={`spacing-md ${styles.profile_pic}`} src={userByID.profilePic} alt="userPic" /> :  
                <div className={`spacing-md ${styles.profile_pic}`} > <img src={blankProfilePic} alt="blankProfilePic" /> </div>
              }   
              {(currentUser && userByID && isAuthor(currentUser, userByID)) && (
                <> 
                  <div className={`grid spacing-sm ${styles.edit_pic}`}>
                    <div className={`btn btn-block btn-secondary ${styles.input_file_designed}`}>Edit <FaPen className={styles.editIcon} /></div>
                    <input onChange={handleImageChange} className={styles.input_file_original} type="file" accept="image/*" />
                  </div>
                  {percent > 0 && <div className={styles.edit_pic_loader}>
                      <div style={{width: `${percent}%`}} className={styles.edit_pic_loader_inner}></div>
                  </div>
                  }
                  {errorUpdateUser && <MessageBox variant="danger">{errorUpdateUser} </MessageBox>}
                </>
              )}
          </section>
              
        </section>
      }
    </>
  )
}

export default Profile
