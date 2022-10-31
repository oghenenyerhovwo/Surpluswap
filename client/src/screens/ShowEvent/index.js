import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
// import htmlToText from "html-to-formatted-text"

// components
import { ButtonGroup } from 'react-rainbow-components';
import { Spinner, MessageBox, Button, CommentSection, Header, Footer, BackLink, Countdown } from "../../components"
import { BsFacebook } from "react-icons/bs"
import { BsTwitter } from "react-icons/bs"
import { BsInstagram } from "react-icons/bs"

// css
import styles from "./showevent.module.css"

// functions
import { getEvent, deleteEvent, navigateHistory } from "../../actions"
import { poorChildrenPic } from "../../assets"
import { setTagArray, isSuperAdmin, isAdmin } from "../../utils"

// type
import { GET_EVENT_RESET, DELETE_EVENT_RESET } from "../../constants/eventConstants"



const ShowEvent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const location = useLocation()
  

  // state
  const {
    event,
    successGetEvent,
    errorGetEvent,
    loadingGetEvent,
    errorDeleteEvent,
    loadingDeleteEvent,
    successDeleteEvent,
  } =  useSelector(state => state.eventStore)

  const { 
    currentUser,
  } =  useSelector(state => state.userStore)

  const {
    successCreateComment,
    successDeleteComment,
} =  useSelector(state => state.commentStore)

  const [toggleDeleteOverlay, setToggleDeleteOverlay] = useState(false)

  useEffect(() => {
    if(successDeleteEvent){
      dispatch({type: DELETE_EVENT_RESET})
      navigate("/event")
    }
  }, [dispatch,navigate, successDeleteEvent])

  useEffect(() => {
    if(successGetEvent){
      dispatch({type: GET_EVENT_RESET})
    }
  }, [dispatch, event, successGetEvent])

  useEffect(() => {
    dispatch(getEvent(params.id))
  }, [dispatch, params.id, successCreateComment, successDeleteComment ])

  const handleToggleDeleteOverlay = () => {
    setToggleDeleteOverlay(prevToggle => !prevToggle)
  }

  const navigateToEditScreen= () => {
    dispatch(navigateHistory(location.pathname,navigate(`/event/${event._id}/edit`))   )
  }

  const handleDeleteAccount = () => {
    dispatch(deleteEvent(event._id))
  }

  return (
    <div className={`${styles.event_container}`}>
      <section className={`${styles.header}`}>
          <Header />
      </section>
        {loadingGetEvent && <Spinner />}
        {errorGetEvent && <MessageBox variant="danger">{errorGetEvent} </MessageBox>}

        {
          event._id ?
          <section className={`${styles.event} ${styles.main} spacing-sm`}>
            <div 
              className={`${styles.banner_img} spacing-lg`}
              style={{backgroundImage: `linear-gradient(rgba(37, 43, 70, 0.3), rgba(37, 43, 70, 0.3)), url(${poorChildrenPic})`}}
            >
              <div className={`${styles.banner_img_date} flex`}>
                <h1> {String(new Date(event.date)).slice(0, 4)}</h1>
                <h2>
                    <span>{String(new Date(event.date)).slice(8, 11)}</span>
                    <span>{String(new Date(event.date)).slice(4, 8)}</span>
                </h2>
                <p className={styles.event_date_year}>{String(new Date(event.date)).slice(11, 15)}</p>
             </div>
            </div>
            <div className={`${styles.event_countdown} spacing-lg container`}>
              <Countdown timeTillDate={event.date} />
            </div>
            
            <div className={`${styles.event_about} spacing-md`}>
              <div className={`${styles.event_about_title} spacing-md`}>
                <h1 className="spacing-md"><span>About</span> the <span>{event.title}</span></h1>
                <div className={`spacing-md`} dangerouslySetInnerHTML={{ __html: event.text }} />
                <div className={`${styles.event_about_tags} flex spacing-md`}>
                  <h3>Tags: </h3> 
                  <div>
                    {setTagArray(event.tags).map(tagObj => (
                      <p to="#" key={tagObj._id}  type="link">#{tagObj.tag}</p>
                    ))}
                  </div>
                </div>
                <div className={`${styles.event_about_icons}`}>
                  <div className={`spacing-sm `}>
                    <BsFacebook />
                  </div>
                  <div className={`spacing-sm `}>
                    <BsTwitter />
                  </div>
                  <div className={`spacing-sm `}>
                    <BsInstagram />
                  </div>
              </div>
              </div>              
            </div>
            <div className="spacing-lg"></div>
            <div className="container">
              <CommentSection eventId={event._id} comments={event.comments} currentUser={currentUser} />
            </div>
            <div className="spacing-lg"></div>
            {
              (currentUser.role === "admin" || currentUser.role === "superAdmin" ) &&
              <> 
                <div className={`${styles.event_buttons} container spacing-md`}>
                  <ButtonGroup className="rainbow-m-around_medium">
                    {(currentUser._id && (isAdmin(currentUser) || isSuperAdmin(currentUser))) && <Button onClick={navigateToEditScreen} label="Edit" variant="primary">Update</Button>}
                    {(currentUser._id && (isAdmin(currentUser) || isSuperAdmin(currentUser))) && <Button onClick={handleToggleDeleteOverlay} label="Delete" variant="secondary">Delete</Button>}
                  </ButtonGroup>
                </div>
                {
                  toggleDeleteOverlay && <div className={`flex flex__center ${styles.delete_overlay}`}>
                      <div className={styles.delete_overlay_container}>
                        <h2 className="spacing-md">Are you sure you want to delete this post?</h2>
                        {errorDeleteEvent && <MessageBox variant="danger">{errorDeleteEvent} </MessageBox> }
                        {loadingDeleteEvent && <Spinner /> }
                        {(errorDeleteEvent || loadingDeleteEvent) && <><br /><br /></>}
                        <div className={`${styles.delete_overlay_container_button} spacing-md`}>
                          <Button variant="secondary" onClick={handleDeleteAccount}>Delete</Button>
                          <Button onClick={handleToggleDeleteOverlay}>Cancel</Button>
                        </div>
                      </div>
                  </div>
                }
              </>
            }
          </section> : <></>
        }

        <section className={`${styles.backlink} container spacing-lg`}>
          <BackLink />
        </section>
        
        <section className={`${styles.footer}`}>
            <Footer />
        </section>
    </div>
   
  )
}

export default ShowEvent