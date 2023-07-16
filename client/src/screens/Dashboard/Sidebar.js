import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

// importing components
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrTransaction } from 'react-icons/gr';
import { AiOutlineUser, AiOutlineSetting } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { GrPowerShutdown } from 'react-icons/gr';
import { Avatar } from "../../components"

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
    transition: {delay: 1, duration: 1, ease: "easeInOut"},
  },
  exit: {
    rotate: 180,
    x: "-1000",
    transition: {duration: 1, ease: "easeInOut"},
  },
  
}

const rollSideways = {
    hidden: {
      opacity: 0,
      width: "0%",
      transition: {duration: 1, ease: "easeInOut", type: "spring", bounce: 0.3},
    },
    visible: {
      opacity: 1,
      width: "100%",
      transition: {delay: 1, ease: "easeInOut", type: "spring", bounce: 0.3},
    },
}

const hideBaSideBar = {
  hidden: {
    y: "-1000%",
    transition: { ease: "easeInOut"},
  },
  visible: {
    y: "0%",
    transition: {duration: 1, ease: "easeInOut"},
  },
  exit: {
    y: "-1000%",
    transition: {delay: 1, ease: "easeInOut"},
  }
}

// const DropDownLink = props => {
//   const [isDropdown, setIsDropdown] = useState(false)

//   const activeClassName= isDropdown && styles.sidebar_active_link

//   const toggleDropdown = () => {
//     setIsDropdown(prevToggle => !prevToggle)
//   }

//   return (
//     <ul className={`${styles.dropdown_link} ${activeClassName}`}>
//       <li className={styles.dropdown_head}>
//         {props.icon}
//         {props.label}
        
//         <span className={styles.dropdown_icon}>
//           {
//             !isDropdown ? (
//               <FaAngleRight onClick={toggleDropdown} className={styles.dropdownlink_angle_icon} />
//             ): (
//               <FaAngleDown onClick={toggleDropdown} className={styles.dropdownlink_angle_icon} />
//             )
//           }
//         </span>
//       </li>
//       <ul className={`${styles.dropdown_content} `}>
//         {isDropdown && props.children}
//       </ul>
//     </ul>
//   )
// }

const ActiveLink = props => {
  const{icon, label, eventKey,activeLink, setActiveLink, onClick, type}  = props

  const handleActiveLink = () => {
    eventKey && setActiveLink(eventKey)
    type === "button" && onClick()
  }

  const activeClassName= eventKey === activeLink && styles.sidebar_active_link

  return (
    <li onClick={handleActiveLink} className={`${activeClassName}`}>
      {icon}
      {label}
    </li>
  )
}


const SidebarLinks = props => {
  const dispatch = useDispatch()
  const {activeLink, setActiveLink} = props

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
      <ul className={`${styles.sidebar_tabs}`}>
        <ActiveLink 
          icon={<GrTransaction className={styles.sidebar_tab_icon} />}
          label={<Link to={`/dashboard/`} className={`${styles.sidebar_tab}`}>Dashboard</Link>}
          eventKey="dashboard"
          setActiveLink={setActiveLink}
          activeLink={activeLink}
        />
        <ActiveLink 
          icon={<AiOutlineUser className={styles.sidebar_tab_icon} />}
          label={<Link to={`/dashboard/profile`} className={`${styles.sidebar_tab}`}>Profile</Link>}
          eventKey="profile"
          setActiveLink={setActiveLink}
          activeLink={activeLink}
        />
        <ActiveLink 
          icon={<GrPowerShutdown className={styles.sidebar_tab_icon} />}
          label={<p className={`${styles.sidebar_tab}`}>Logout</p>}
          // eventKey="logout"
          setActiveLink={setActiveLink}
          activeLink={activeLink}
          onClick={signUserOut}
          type="button"
        />
        <ActiveLink 
          icon={<AiOutlineSetting className={styles.sidebar_tab_icon} />}
          label={<p className={`${styles.sidebar_tab}`}>Switch to {darkMode ? "Light": "Dark"} Mode</p>}
          // eventKey="logout"
          setActiveLink={setActiveLink}
          activeLink={activeLink}
          onClick={handleDarkMode}
          type="button"
        />
        {/* <DropDownLink
          icon={<AiOutlineSetting className={styles.sidebar_tab_icon} />}
          label={<p className={`${styles.sidebar_tab}`}>Setting</p>}
        >
          <li>
              <Form.CheckBoxTwo
                value={darkMode}
                onChange={handleDarkMode}
                label="Dark mode"
                darkMode={darkMode}
              />
          </li>
        </DropDownLink> */}
      </ul>
    </>
  )
}

const Sidebar = () => {
  const location = useLocation()
  const slideMenuRef = useRef(null)

  const [activeLink, setActiveLink] = useState("dashboard")

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
    if(location.pathname.includes("profile")){
      setActiveLink("profile")
    } else {
      setActiveLink("dashboard")
    }
  }, [location.pathname])

  useEffect(() => {
    document.addEventListener('mousedown', closeMenuWhnClickOutside)
    return () => {
      document.removeEventListener('mousedown', closeMenuWhnClickOutside)
    };
  })

  return (
        <>
          <>
              <div className={`${styles.sidebar} ${darkMode && styles.sidebar_dark} ${styles.sidebar_largescreen}`}>
                <SidebarLinks activeLink={activeLink} setActiveLink={setActiveLink} />
              </div>   
              <AnimatePresence mode="wait">
                  {
                    toggleMenu && (
                      <motion.div 
                          className={`${styles.sidebar} ${darkMode && styles.sidebar_dark}`}
                          variants={hideBaSideBar}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          key="sidebar_smallscrenn_roll_up"
                      >
                        <motion.div
                          className={`${styles.sidebar_smallscreen}`}
                          variants={rollSideways}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          key="sidebar_smallscrenn_rollright"
                          ref={slideMenuRef}
                        >
                          <SidebarLinks activeLink={activeLink} setActiveLink={setActiveLink} />
                          <div onClick={closeMenu} className={`${styles.cancel_icon}`}>
                            <FaTimes/>
                          </div>
                        </motion.div>
                      </motion.div>
                    )
                  }
              </AnimatePresence>
          </>
          <AnimatePresence mode="wait">
            {
              !toggleMenu && (
                <motion.div
                  className={`${styles.menu_icon}`} 
                  variants={rotateInOut}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="hamburger_sidebar_side"
                  onClick={openMenu} 
                >
                  <GiHamburgerMenu />
                </motion.div>
              ) 
            }
          </AnimatePresence>
        </>
  )
}

export default Sidebar