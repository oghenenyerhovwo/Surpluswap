import { useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'

// importing components
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsSearch } from 'react-icons/bs';
import { FaMoon } from 'react-icons/fa';
import { BsFillSunFill } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
// import Avatar from "../Avatar"
import { Link } from 'react-router-dom'

// actions
import { changeLightMode } from "../../actions"

// importing css
import styles from "./header.module.css"

// assets
// import { impexLogo } from "../../assets"

const NavLinks = () => {
  return (
    <ul>
      <li><Link className={`${styles.nav_links}`} to="/">Home</Link></li>
      <li><Link className={`${styles.nav_links}`} to="/about">Logout</Link></li>
      <li><Link className={`${styles.nav_links}`} to="/story">Password Reset</Link></li>
      <li><Link className={`${styles.nav_links}`} to="/event">Register</Link></li>
      <li><Link className={`${styles.nav_links}`} to="/faq">Uncategorised</Link></li>
    </ul>
  )
}

const Header = () => {
  
  const menuRef = useRef(null)
  const dispatch = useDispatch()

  // global state
  const { 
    lightMode,
  }=  useSelector(state => state.generalStore)
  // const { currentUser } =  useSelector(state => state.userStore)
  const [toggleMenu, setToggleMenu] = useState(false)
  const [toggleSearch, setToggleSearch] = useState(false)

  // const closeMenu = e => {
  //   const navItemElement = document.querySelector(`.${styles.nav_items}`)
  //   if(menuRef.current && toggleMenu && !menuRef.current.contains(e.target)){
  //     navItemElement.style.top = "-1000%"
  //     setToggleMenu(false)
  //   } 
  // }

  // useEffect(() => {
  //   document.addEventListener('mousedown', closeMenu)
  //   return () => {
  //     document.removeEventListener('mousedown', closeMenu)
  //   };
  // })
 
  // const closeMenuLinks = e => {
  //   const navItemElement = document.querySelector(`.${styles.nav_items}`)
  //   navItemElement.style.top = "-1000%"
  //   setToggleMenu(false)
  // }

  const handleToggleMenu = e => {
    setToggleMenu(prevToggle => !prevToggle)
    const navItemElement = document.querySelector(`.${styles.nav_collapse}`)
    if(toggleMenu){
      navItemElement.style.height = "0rem"
      navItemElement.style.opacity = "0"
      navItemElement.style.padding = "0 3em"
    } else {
      navItemElement.style.opacity = "1"
      navItemElement.style.height = "21.3rem"
      navItemElement.style.padding = "3em 3em"
    }
  }

  const handleToggleSearch = e => {
    setToggleSearch(prevToggle => !prevToggle)
    const navItemElement = document.querySelector(`.${styles.nav_items}`)
    const searchElement = document.querySelector(`.${styles.search_items}`)
    if(toggleSearch){
      searchElement.style.top = "-4rem"
      searchElement.style.opacity = "0"
      navItemElement.style.top = "0"
      navItemElement.style.opacity = "1"
    } else {
      navItemElement.style.top = "2rem"
      navItemElement.style.opacity = "0"
      searchElement.style.top = "0"
      searchElement.style.opacity = "1"
    }
  }

  const handleLightMode = () => dispatch(changeLightMode())

  return (
    <header className={`${styles.app_header_container}`}>
      <div className={`${styles.navbar}`}>
        <div className={`${styles.nav_brand}`}>
          <Link to="/">Surpluswap</Link>
        </div>
        <nav className={`${styles.search_items} grid`}>
            <input placeholder="Search ..." />
            <FaTimes onClick={handleToggleSearch} />
        </nav> 
        <nav ref={menuRef} className={`${styles.nav_items}`}>
            <ul>
                <NavLinks />
            </ul>
            <ul>
              <li>{lightMode ? <FaMoon className={styles.moon_icon} onClick={handleLightMode} /> : <BsFillSunFill onClick={handleLightMode} />}</li>  
              <li><BsSearch className={styles.search_icon} onClick={handleToggleSearch} /></li>  
            </ul>  
            <ul>
              <li className={`${styles.menu_icon}`} ><GiHamburgerMenu onClick={handleToggleMenu} /></li> 
            </ul>          
        </nav>
      </div>
      <ul className={styles.nav_collapse}>
          <NavLinks />
      </ul>
    </header>
  )
}

export default Header