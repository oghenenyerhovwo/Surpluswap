import React from 'react'

import { 
    aboutInterpreter,
  } from "../../assets"
import { aboutSectionArray} from "../../utils"

import styles from "./companyprofile.module.css"

const CompanyProfile = () => {
  return (
    <section className={`${styles.companyprofile} spacing-lg`}>
        <div className={`${styles.container} ${styles.companyprofile_container}`}>
        <div className={styles.companyprofile_col1}>
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
        <div className={styles.companyprofile_col2}>
            <div className={`${styles.heading_line} spacing-md`}></div>
            <h2 className="spacing-md">Nigeria’s No 1 RMB Exchange company</h2>
            <img src={aboutInterpreter} alt="aboutInterpreter" />
        </div>
        </div>
    </section>
  )
}

export default CompanyProfile