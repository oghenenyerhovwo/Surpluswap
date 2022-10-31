import React, { useEffect, useState } from 'react'
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux'

// components
import { Spinner, MessageBox, EventCard, Button, Tab } from "../../components"

// css
import styles from "./events.module.css"

// functions
import { getEvents } from "../../actions"

// type
import { GET_EVENTS_RESET } from "../../constants/eventConstants"

import { activitiesTab} from "../../utils"



const Events = () => {
  const dispatch = useDispatch()

  // state
  const {
    successGetEvents,
    loadingGetEvents,
    errorGetEvents,
    events,
  } =  useSelector(state => state.eventStore)

  const {
    currentUser,
  } =  useSelector(state => state.userStore)

  const [tabEvents, setTabEvents] = useState([])
  const [tab, setTab] = useState(activitiesTab[0].eventKey)

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  useEffect(() => {
    if(successGetEvents){
      dispatch({type: GET_EVENTS_RESET})
    }
  }, [dispatch, successGetEvents])  

  useEffect(() => {
    setTabEvents(
      events.filter(event => {
        const eventTime = moment(event.date)
        const nowTime = moment()
        if(tab === "past"){
          return eventTime.isBefore(nowTime)
        }
        else if(tab === "future"){
          return eventTime.isAfter(nowTime)
        }
        return false
      })
    )
  }, [ events, tab]) 

  return (
    <div className={`container`}>
      {loadingGetEvents && <Spinner />}
      {errorGetEvents && <MessageBox variant="danger">{errorGetEvents} </MessageBox>}

      {
        (currentUser.role === "admin" || currentUser.role === "superAdmin") &&
          (
            <div className={styles.events_button}>
                <Button type="link" href="/event/create" variant="primary">Add An Event</Button>
            </div>
          )
      }

      <div className={`${styles.events_container}`}>
          <Tab.Container tab={tab}>
            {
              activitiesTab.length > 0 && activitiesTab.map(activity => (
                <React.Fragment key={activity._id}>
                  <Tab.Item eventKey={activity.eventKey} tab={tab} setTab={setTab} >{activity.label}</Tab.Item>
                </React.Fragment>
              ))
            }
          </Tab.Container>
      

          <div className={`${styles.events}`}>
            {
              tabEvents.length > 0 && tabEvents.map(event => (
                  <div className={`spacing-md ${styles.event}`} key={event._id}>
                      <EventCard event={event} />
                  </div>
              ))
            }
          </div>  
      </div>
      
    </div>
  )
}

export default Events