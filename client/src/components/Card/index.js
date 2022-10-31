import React, { useState } from 'react'
import Image from "./Image"
import Heading from "./Heading"
import SubHeading from "./SubHeading"
import Paragraph from "./Paragraph"

import { Arrow } from "../../assets"

import styles from "./card.module.css"

const Head = props => {
    return (
      <div className={styles.card_head}>{props.children} </div>
    )
}

const Body = props => {
    return (
      <div className={styles.card_body}>{props.children} </div>
    )
}

const Container = props => {
    return (
      <div className={`${styles.card_container}  ${props.className}`}>{props.children} </div>
    )
}

const ContainerFaq = props => {
  const {
    faq,
  } = props
  const [showDetail, setShowDetail] = useState(false)

  const toggleDetail = () => {
    setShowDetail(prevDetail => !prevDetail)
  }

  return (
      <div className={`${styles.card_container_faq} ${props.className}`}>
          {props.children}
          <Head>
              <div className={`${styles.card_container_faq_heading}`} onClick={toggleDetail} >
                  <div className={`${styles.card_container_faq_text}`}>{faq.question}</div>
                  <div className={`${styles.card_container_faq_icon} ${showDetail && styles.card_container_faq_icon_active}`}><Arrow /></div>
              </div>
          </Head>
          {showDetail && <Body>
            <Paragraph>{faq.answer}</Paragraph>
          </Body>} 
      </div>
  )
}

const Card = {
    Image,
    Heading,
    SubHeading,
    Paragraph,
    Head,
    Body,
    Container,
    ContainerFaq,
}


export default Card