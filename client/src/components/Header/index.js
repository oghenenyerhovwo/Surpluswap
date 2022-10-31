import { useRef } from "react"
// import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

// importing components
import { GiHamburgerMenu } from 'react-icons/gi';
// import Avatar from "../Avatar"
import { Link } from 'react-router-dom'

// actions
import { changeLightMode } from "../../actions"

// importing css
import styles from "./header.module.css"

// assets
// import { impexLogo } from "../../assets"

const Header = () => {
  
  const menuRef = useRef(null)
  const dispatch = useDispatch()

  // global state
  // const { currentUser } =  useSelector(state => state.userStore)
  // const [toggleMenu, setToggleMenu] = useState(false)

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

  // const handleToggleMenu = e => {
  //   const navItemElement = document.querySelector(`.${styles.nav_items}`)
  //   if(toggleMenu){
  //     navItemElement.style.top = "-1000%"
  //   } else {
  //     navItemElement.style.top = "100%"
  //   }
  //   setToggleMenu(prevToggle => !prevToggle)
  // }

  const handleLightMode = () => dispatch(changeLightMode())

  return (
    <header className={`container ${styles.app_header_container}`}>
      <div className={`flex ${styles.navbar}`}>
        <div className={`${styles.nav_brand}`}>
          <Link to="/">Surpluswap</Link>
        </div>
        <nav ref={menuRef} className={`flex ${styles.nav_items}`}>
          <ul className="flex">
            <li><Link className={`${styles.nav_links}`} to="/">Home</Link></li>
            <li><Link className={`${styles.nav_links}`} to="/about">About</Link></li>
            <li><Link className={`${styles.nav_links}`} to="/story">Blog</Link></li>
            <li><Link className={`${styles.nav_links}`} to="/event">Event</Link></li>
            <li><Link className={`${styles.nav_links}`} to="/faq">Faq</Link></li>
          </ul>            
        </nav>
        <nav>
          <button onClick={handleLightMode}>Switch mode</button>
        </nav>
        {/* {
          currentUser._id ? <Link  className="flex flex__center" to={`/profile/${currentUser._id}`}><span className={styles.name}>{currentUser.fullName.split(" ")[0]}</span> {currentUser.profilePic ? <img className={styles.profile_pic} src={currentUser.profilePic} alt="profile_pic" /> : <span className={styles.profile_pic}><Avatar gender={currentUser.gender} /></span>  } </Link>:
          <div className={styles.nav_button_container}><Link className={styles.nav_button}  to="/signin"><span>Join</span> <span className={styles.nav_button_overlay}></span> </Link></div>
        } */}
        <div className={`${styles.menu_icon}`}><GiHamburgerMenu /></div>
      </div>
    </header>
  )
}

export default Header