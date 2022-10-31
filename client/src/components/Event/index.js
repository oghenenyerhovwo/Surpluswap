import React from 'react' 
import htmlToText from "html-to-formatted-text"
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'

import styles from "./event.module.css"

// import { AiOutlineDoubleRight } from "react-icons/ai"
// import Card from "../Card"
// import Button from "../Button"

import { FaArrowRight } from "react-icons/fa"
import { truncate } from "../../utils"
import { amenPicture } from "../../assets"

import { BsFacebook } from "react-icons/bs"
import { BsTwitter } from "react-icons/bs"
import { BsInstagram } from "react-icons/bs"

import { navigateHistory } from "../../actions"


const EventCard = props => {

    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const { event } = props


    const directToShowEventDetail = () => {
        dispatch(navigateHistory(location.pathname, navigate(`/event/${event._id}`)))
    }


    return (
        <div className={`spacing-md ${styles.event}`}>
            <div className={`${styles.event_date} flex`}>
                <h1> {String(new Date(event.date)).slice(0, 4)}</h1>
                <h2>
                    <span>{String(new Date(event.date)).slice(8, 11)}</span>
                    <span>{String(new Date(event.date)).slice(4, 8)}</span>
                </h2>
                <p className={styles.event_date_year}>{String(new Date(event.date)).slice(11, 15)}</p>
            </div>
            <div className={`image ${styles.event_image}`}>
                <img src={amenPicture}  alt="eventImg" />
                {/* <img src={event.images && event.images[0] && event.images[0].url}  alt="eventImg" /> */}
            </div>
            <div className={`${styles.event_details} flex`}>
                <div className={`${styles.event_details_text}`}>
                    <h2 className="spacing-xs">{event.title} </h2>
                    <p className="">{truncate(htmlToText(event.text), 50)}&hellip;</p>
                </div>
                <div className={`${styles.event_details_icons} flex flex__column`}>
                    <Link to="#">
                        <BsFacebook />
                    </Link>
                    <Link to="#" >
                        <BsTwitter />
                    </Link>
                    <Link to="#" >
                        <BsInstagram />
                    </Link>
                </div>
            </div>
            <div onClick={directToShowEventDetail} className={`${styles.event_overlay}`}></div>
            <div onClick={directToShowEventDetail} className={`${styles.event_overlay_icon}`}>
                <span>Click to see full detail </span>
                <FaArrowRight /> {" "}
            </div>
        </div>
    )
}

export default EventCard