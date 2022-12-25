import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

// importing components
import { GiHamburgerMenu } from 'react-icons/gi';
// import { BsSearch } from 'react-icons/bs';
// import { FaMoon } from 'react-icons/fa';
// import { BsFillSunFill } from 'react-icons/bs';
// import { FaTimes } from 'react-icons/fa';
// import Avatar from "../Avatar"
import { Link } from 'react-router-dom'

import { AnimatePresence, motion, useAnimation } from "framer-motion"


// actions
import { signOut, resendEmail } from "../../actions"

// importing css
import styles from "./sidebar.module.css"

// assets
// import { impexLogo } from "../../assets"
import { slideAnimations } from "../../utils"

const rotateInOut = {
  hidden: {
    rotate: -180,
    x: "-1000"
  },
  visible: {
    rotate: 0,
    x: "0",
    transition: {duration: 0.1, ease: "easeInOut"},
  },
  exit: {
    rotate: 180,
    x: "-1000",
    transition: {duration: 0.1, ease: "easeInOut"},
  },
  
}

const SidebarLinks = () => {
  const dispatch = useDispatch()

  const { 
    currentUser, 
  }=  useSelector(state => state.userStore)

  const signUserOut = () => {
    dispatch(signOut())
  }

  const resendVerificationEmail = () => {
    dispatch(resendEmail({email: currentUser.email, type: "email_verify"}))
  }

  return (
    <ul>
      <li><Link className={`${styles.nav_links}`} to="/">Home</Link></li>
      <li>
        {
          currentUser._id ? (
            <Link onClick={signUserOut} className={`${styles.nav_links}`} to="#">Logout</Link>
          ) : <Link className={`${styles.nav_links}`} to="/user/signin">Login</Link>
        }
      </li>
      <li><Link className={`${styles.nav_links}`} to="/story">Password Reset</Link></li>
      <li><Link className={`${styles.nav_links}`} to="/user/signup">Register</Link></li>
      {!currentUser.isVerified && <li onClick={resendVerificationEmail}><Link className={`${styles.nav_links}`} to="#">Resend Email</Link></li>}
    </ul>
  )
}

const Sidebar = ({stickBarToTop}) => {
  
  // const menuRef = useRef(null)
  const dispatch = useDispatch()
  const animation = useAnimation()

  // global state
  // const { 
  //   lightMode,
  // }=  useSelector(state => state.generalStore)
  // const { currentUser } =  useSelector(state => state.userStore)
  const [toggleMenu, setToggleMenu] = useState(false)

  const closeMenu = e => {
    setToggleMenu(false)
  }

  const openMenu = e => {
    setToggleMenu(true)
  }

  useEffect(() => {
    if(stickBarToTop){
      animation.start({
        position: "sticky",
        top: 0,
        padding: "1em 0",
        fontSize: "0.8rem",
        transition: { duration: 1, },
      })
    } else {
      animation.start({
        position: "static",
        padding: "2em 0",
        fontSize: "0.9rem",
        transition: { duration: 1, },
      })
    }
  }, [stickBarToTop, animation])

  useEffect(() => {
    document.addEventListener('mousedown', closeMenu)
    return () => {
      document.removeEventListener('mousedown', closeMenu)
    };
  })


  // const handleLightMode = () => dispatch(changeLightMode())

  const { 
    currentUser, 
  }=  useSelector(state => state.userStore)

  const resendVerificationEmail = () => {
    dispatch(resendEmail({email: currentUser.email, type: "email_verify"}))
  }

  return (
        <AnimatePresence mode="wait">
            {
              toggleMenu ? (
                <motion.div
                  className={`${styles.sidebar_head} grid`}
                  variants={slideAnimations.slideUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="sidebar"
                >
                  <SidebarLinks />
                </motion.div>
              ):(
                <ul className={`${styles.sidebar_head_smallscreen}`}>
                  <motion.li
                      className={`${styles}`} 
                      variants={rotateInOut}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      key="hamburger_sidebar"
                      onClick={openMenu} 
                    >
                      <GiHamburgerMenu />
                    </motion.li>
                </ul>
              )
            }
            {!currentUser.isVerified && <p onClick={resendVerificationEmail}><Link className={`${styles.nav_links}`} to="#">Resend Email</Link></p>}
        </AnimatePresence>
  )
}

export default Sidebar