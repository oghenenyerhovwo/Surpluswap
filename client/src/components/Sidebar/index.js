import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'

// importing components
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrTransaction } from 'react-icons/gr';
import { AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';
import { FaTimes, FaAngleRight, FaAngleDown } from 'react-icons/fa';
import { GrPowerShutdown } from 'react-icons/gr';
import Avatar from "../Avatar"
import { Link, useLocation } from 'react-router-dom'
import Form from "../Form"

import { AnimatePresence, motion } from "framer-motion"

// actions
import { signOut, changeDarkMode } from "../../actions"

// importing css
import styles from "./sidebar.module.css"

// assets
// import { impexLogo } from "../../assets"

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

const rollSideways = {
    hidden: {
      opacity: 0,
      width: "0%",
      transition: {ease: "easeInOut", type: "spring", bounce: 0.3},
    },
    visible: {
      opacity: 1,
      width: "100%",
      transition: {ease: "easeInOut", type: "spring", bounce: 0.3},
    },
}

const DropDownLink = props => {
  const [isDropdown, setIsDropdown] = useState(false)

  const activeClassName= isDropdown && styles.sidebar_active_link

  const toggleDropdown = () => {
    setIsDropdown(prevToggle => !prevToggle)
  }

  return (
    <ul className={`${styles.dropdown_link} ${activeClassName}`}>
      <li className={styles.dropdown_head}>
        {props.icon}
        {props.link}
        
        <span className={styles.dropdown_icon}>
          {
            !isDropdown ? (
              <FaAngleRight onClick={toggleDropdown} className={styles.dropdownlink_angle_icon} />
            ): (
              <FaAngleDown onClick={toggleDropdown} className={styles.dropdownlink_angle_icon} />
            )
          }
        </span>
      </li>
      <ul className={`${styles.dropdown_content} `}>
        {isDropdown && props.children}
      </ul>
    </ul>
  )
}

const ActiveLink = props => {
  const{icon, link, eventKey,activeLink, setActiveLink}  = props

  const handleActiveLink = () => {
    setActiveLink(eventKey)
  }

  const activeClassName= eventKey === activeLink && styles.sidebar_active_link

  return (
    <li onClick={handleActiveLink} className={`${activeClassName}`}>
      {icon}
      {link}
    </li>
  )
}


const SidebarLinks = () => {
  const dispatch = useDispatch()
  const [activeLink, setActiveLink] = useState("dashboard")

  const { 
    currentUser, 
  }=  useSelector(state => state.userStore)

  const { 
    darkMode,
  }=  useSelector(state => state.generalStore)

  const signUserOut = () => {
    dispatch(signOut())
  }

  const handleDarkMode = () => dispatch(changeDarkMode())

  return (
    <>
      <div className={`${styles.sidebar_head} spacing-md`}>
        <Avatar />
        <h3>{currentUser.firstName} </h3> 
      </div>
      <ul className={`${styles.sidebar_links}`}>
        <ActiveLink 
          icon={<GrTransaction />}
          link={<Link className={`${styles.nav_links}`} to="#">Dashboard</Link>}
          eventKey="dashboard"
          setActiveLink={setActiveLink}
          activeLink={activeLink}
        />
        <ActiveLink 
          icon={<GrPowerShutdown />}
          link={<Link onClick={signUserOut} className={`${styles.nav_links}`} to="#">Logout</Link>}
          eventKey="logout"
          setActiveLink={setActiveLink}
          activeLink={activeLink}
        />
        <ActiveLink 
          icon={<AiOutlineUser />}
          link={<Link className={`${styles.nav_links}`} to={`/dashboard/profile/${currentUser._id}`}>Profile</Link>}
          eventKey="profile"
          setActiveLink={setActiveLink}
          activeLink={activeLink}
        />
        <DropDownLink
          icon={<AiOutlineSetting />}
          link={<Link className={`${styles.nav_links}`} to="#">Setting</Link>}
        >
          <li>
              <Form.CheckBoxTwo
                value={darkMode}
                onChange={handleDarkMode}
                label="Dark mode"
              />
          </li>
        </DropDownLink>
      </ul>
    </>
  )
}

const Sidebar = () => {
  const location = useLocation()
  const slideMenuRef = useRef(null)

  // global state
  const { 
    darkMode,
  }=  useSelector(state => state.generalStore)
  const [toggleMenu, setToggleMenu] = useState(false)

  const closeMenu = e => {
    setToggleMenu(false)
  }

  const closeMenuWhnClickOutside = e => {
    if(slideMenuRef.current && toggleMenu && !slideMenuRef.current.contains(e.target)){
      setToggleMenu(false)
    }
  }

  const openMenu = e => {
    setToggleMenu(true)
  }

  useEffect(() => {
    setToggleMenu(false)
  }, [location.pathname])

  useEffect(() => {
    document.addEventListener('mousedown', closeMenuWhnClickOutside)
    return () => {
      document.removeEventListener('mousedown', closeMenuWhnClickOutside)
    };
  })

  return (
        <AnimatePresence mode="wait">
          <div className={`${styles.sidebar} ${darkMode && styles.sidebar_dark}`}>
            <div className={`${styles.sidebar_largescreen}`}>
              <SidebarLinks />
            </div>
              {
                toggleMenu && (
                  <motion.div
                    className={`${styles.sidebar_smallscreen}`}
                    variants={rollSideways}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    key="sidebar"
                    ref={slideMenuRef}
                  >
                    <SidebarLinks />
                    <div onClick={closeMenu} className={`${styles.cancel_icon}`}>
                      <FaTimes/>
                    </div>
                  </motion.div>
                )
              }
          </div>
          {
            !toggleMenu && (
              <motion.div
                className={`${styles.menu_icon}`} 
                variants={rotateInOut}
                initial="hidden"
                animate="visible"
                exit="exit"
                key="hamburger_sidebar"
                onClick={openMenu} 
              >
                <GiHamburgerMenu />
              </motion.div>
            ) 
          }
        </AnimatePresence>
  )
}

export default Sidebar