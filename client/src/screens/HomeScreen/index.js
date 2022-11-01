import React from "react"
// import { useSelector, useDispatch } from 'react-redux'
// import moment from "moment"

// components
// import { Card, Button, Tab, StoryCard, Spinner, EventCard, Header } from "../../components"
import { Header, Button } from "../../components"

// functions
// import { changeLightMode } from "../../actions"
import { introInterpreter, aboutInterpreter } from "../../assets"
import { aboutSectionArray} from "../../utils"

// type
// import { GET_STORIES_WITH_LIMIT_RESET } from "../../constants/storyConstants"
// import { GET_EVENTS_WITH_LIMIT_RESET } from "../../constants/eventConstants"

// style
import styles from './home.module.css'


const Home = () => {
  
  return (
    <div>
        <section className={`${styles.header} spacing-lg`}>
            <div className={styles.container}>
              <Header />
            </div>
        </section>
        <section className={`${styles.intro} spacing-lg`}>
          <div className={`${styles.container} ${styles.intro_container}`}>
            <div className={styles.intro_col1}>
              <h1 className="spacing-sm">Impex Funds</h1>
              <p className="spacing-md">Enjoy seamless, unlimited and swift payments for all of your RMB, Gift Cards and Crypto transactions.</p>
              <Button type="link" variant="primary">TRADE WITH US TODAY</Button>
            </div>
            <div className={styles.intro_col2}>
              <img src={introInterpreter} alt="introInterpreter" />
            </div>
          </div>
        </section>
        <section className={`${styles.about} spacing-lg`}>
          <div className={`${styles.container} ${styles.about_container}`}>
            <div className={styles.about_col1}>
                {
                  aboutSectionArray.length > 0 && aboutSectionArray.map(about => (
                    <div key={about._id} className="spacing-md">
                      <img className="spacing-sm" src={about.icon} alt={about.title} />
                      <h4 className="spacing-sm">{about.title} </h4>
                      <p className="spacing-xs">{about.description} </p>
                      <ul>{about.list} </ul>
                    </div>
                  ))
                }
            </div>
            <div className={styles.about_col2}>
              <div className={`${styles.heading_line} spacing-lg`}></div>
              <h2 className="spacing-md">Nigeria’s No 1 RMB Exchange company</h2>
              <img src={aboutInterpreter} alt="aboutInterpreter" />
            </div>
          </div>
        </section>
    </div>
  )
}

export default Home
