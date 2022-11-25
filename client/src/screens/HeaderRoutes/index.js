import { Routes, Route, useLocation } from "react-router-dom"
import { useInView } from "react-intersection-observer"

// screens
import HomeScreen from "./Home"
import UserRoutes from "./UserRoutes"

// components
import { 
  Header,
} from "../../components"

// css
import "./index.css"

const HeaderRoutes = () => {
    const location = useLocation()
    const { ref, inView } = useInView({threshold: 0.1})

    return (
      <>
       <>
        <section className="header spacing-lg">
            <div className="home_container">
              <Header stickBarToTop={!inView} />
            </div>
          </section>
          <div ref={ref} className="monitor_header"></div>
        </>
        <section className="body">
          <>
            <Routes location={location} key={location.key}>
                <Route path="/" element={<HomeScreen />}></Route>
            </Routes>
            <UserRoutes />
          </>
        </section>
      </>
    )
}

export default HeaderRoutes