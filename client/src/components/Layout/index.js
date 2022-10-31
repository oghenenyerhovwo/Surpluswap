import React from 'react'

// importing components
import Header from "../Header"
import Footer from "../Footer"
import BackLink from "../BackLink"


import styles from "./layout.module.css"

const Layout = (props) => {
      
    return (
        <div className={`${styles.layout}`}>
            <header className={`${styles.header}`}>
                <Header />
            </header>
            <main className={`${styles.main} spacing-lg`}>
                {props.children}
            </main>
            <div className={`container ${styles.back} spacing-lg`}>
                <BackLink />
            </div>
            <footer className={`${styles.footer}`}>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout