import { useRef, useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

// importing components
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsSearch } from 'react-icons/bs';
import { FaMoon } from 'react-icons/fa';
import { BsFillSunFill } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
// import Avatar from "../Avatar"
import { Link } from 'react-router-dom'

import { AnimatePresence, motion, useAnimation } from "framer-motion"


// actions
import { changeLightMode, signOut } from "../../actions"

// importing css
import styles from "./header.module.css"

// assets
// import { impexLogo } from "../../assets"
import { slideAnimations, rotateAnimations } from "../../utils"

const NavLinks = () => {
  const dispatch = useDispatch()

  const { 
    currentUser, 
  }=  useSelector(state => state.userStore)

  const signUserOut = () => {
    dispatch(signOut())
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
      <li><Link className={`${styles.nav_links}`} to="/event">Register</Link></li>
      <li><Link className={`${styles.nav_links}`} to="/faq">Uncategorised</Link></li>
    </ul>
  )
}

const Header = ({stickBarToTop}) => {
  
  const menuRef = useRef(null)
  const dispatch = useDispatch()
  const animation = useAnimation()

  // global state
  const { 
    lightMode,
  }=  useSelector(state => state.generalStore)
  // const { currentUser } =  useSelector(state => state.userStore)
  const [toggleMenu, setToggleMenu] = useState(false)
  const [toggleSearch, setToggleSearch] = useState(false)

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
        padding: "0.4em 0",
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

  const handleToggleSearch = e => {
    setToggleSearch(prevToggle => !prevToggle)
  }

  const handleLightMode = () => dispatch(changeLightMode())

  return (
    <motion.header 
      className={`${styles.app_header_container} ${!lightMode && styles.app_header_container_light}`}
      animate={animation}
    >
      <div className={`${styles.navbar}`}>
        <div className={`${styles.nav_brand}`}>
          <Link to="/">Surpluswap</Link>
        </div>
        <AnimatePresence mode="wait">
            {
              toggleSearch ? (
                <motion.nav 
                  className={`${styles.search_items} grid`}
                  variants={slideAnimations.slideUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="search_items"
                >
                    <input placeholder="Search ..." />
                    <FaTimes onClick={handleToggleSearch} />
                </motion.nav> 
              ): (
                <motion.nav 
                  ref={menuRef} 
                  className={`${styles.nav_items}`}
                  variants={slideAnimations.slideDown}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key="nav_items"
                >
                    <ul>
                        <NavLinks />
                    </ul>
                    <ul>
                      <li>{lightMode ? <FaMoon className={styles.moon_icon} onClick={handleLightMode} /> : <BsFillSunFill onClick={handleLightMode} />}</li>  
                      <li><BsSearch className={styles.search_icon} onClick={handleToggleSearch} /></li>  
                    </ul>  
                    <ul>
                      <AnimatePresence mode="wait">
                          {
                            !toggleMenu ? (
                              <motion.li
                                className={`${styles.menu_icon}`} 
                                variants={rotateAnimations.fullTurn}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                key="hamburger"
                                onClick={openMenu} 
                              >
                                <GiHamburgerMenu />
                              </motion.li>
                            ) : (
                              <motion.li
                                variants={rotateAnimations.fullTurn}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                key="times"
                                className={`${styles.menu_icon}`} 
                                onClick={closeMenu} 
                              >
                                <FaTimes />
                              </motion.li>
                            )
                          }
                      </AnimatePresence>
                    </ul>          
                </motion.nav>
              )
            }
        </AnimatePresence>
        
      </div>
      <AnimatePresence mode="wait">
          {
            toggleMenu && (
              <motion.ul 
                className={styles.nav_collapse}
                variants={slideAnimations.rollDown}
                initial="hidden"
                animate="visible"
                exit="exit"
                key="nav_collapse"
              >
                <NavLinks />
            </motion.ul>
            )
          }
      </AnimatePresence>
    </motion.header>
  )
}

export default Header