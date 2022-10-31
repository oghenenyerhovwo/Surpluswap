import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CustomLink from "../CustomLink"

import styles from "./footer.module.css"

import { GrFacebookOption } from "react-icons/gr"
import { BsTwitter } from "react-icons/bs"

import Feedback from "../Feedback"

const Footer = props => {
  const location = useLocation()

  const [displayFeedBack, setDisplayFeedBack] = useState(false)

  useEffect(() => {
    if(location.pathname === "/"){
      setDisplayFeedBack(true)
    } else {
      setDisplayFeedBack(false)
    }
  }, [location.pathname ])

  const facebookLink = "htps://m.facebook.com/LMCP-Lay-Missionaries-of-Christ-to-the-Poor-101140756065571"
  const twitterLink = "missiolmcp@gmai.com"

  return (
    <div className={styles.footer}>
      <div>{displayFeedBack && <Feedback />}  </div>
      <div className={`container ${styles.footer_container}`}> 

        <h4 className="spacing-md">LMCP TO THE WORLD</h4>
        
        <div className={`${styles.links} spacing-md`}>
          <CustomLink className={`spacing-sm ${styles.footer_link}`} href="/support">SUPPORT</CustomLink>
          <CustomLink className={`spacing-sm ${styles.footer_link}`} href="/membership">MEMBERSHIP</CustomLink>
          <CustomLink className={`spacing-sm ${styles.footer_link}`} href="/team">MEET THE TEAM</CustomLink>
        </div>

        <div className={`${styles.connect} flex flex__column`}>
          {/* <h5 className="spacing-md">Contact</h5> */}
          {/* <CustomLink className={`spacing-sm flex flex__center ${styles.footer_link}`} to={"#"}>Facebook <GrFacebookOption /></CustomLink> */}
          <div className={`flex ${styles.connect_mobile} spacing-md`}>
            <h4 className="spacing-sm">Mobile Number: </h4>
            <ul>
              <li className="spacing-xs"> <a href="tel: +2347035229504">+2347035229504</a> </li>
              <li className="spacing-xs"> <a href="tel: +2347018031835">+2347018031835</a> </li>
              <li> <a href="tel: +2349025568197">+2349025568197</a> </li>
            </ul>
          </div>
          <div className={`flex ${styles.connect_icons}`}>
            <CustomLink className={`spacing-sm flex flex__center ${styles.icon_link} ${styles.facebook}`} to={facebookLink}><GrFacebookOption /></CustomLink>
            <CustomLink className={`spacing-sm flex flex__center ${styles.icon_link} ${styles.twitter}`}  to={twitterLink}><BsTwitter /></CustomLink>
          </div>
        </div>

      </div>      
      
      </div>
  )
}

export default Footer