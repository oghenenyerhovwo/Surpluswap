import { Routes, Route, useLocation } from "react-router-dom"
import { useInView } from "react-intersection-observer"

// screens
import HomeScreen from "./Home"

// components
import { 
  Header,
  Sidebar,
  PrivateRoute,
} from "../../components"


// css
import "./index.css"

const Dashboard = () => {
    const location = useLocation()
    const { ref, inView } = useInView({threshold: 0.1})

    return (
      <>
       <>
        <section className="header spacing-lg">
            <div className="home_container">
              {/* <Header stickBarToTop={!inView} /> */}
              <Sidebar />
            </div>
          </section>
          <div ref={ref} className="monitor_header"></div>
        </>
        <section className="body">
          <>
            <Routes location={location} key={location.key}>
                <Route path="/">
                  <Route path="" element={<PrivateRoute.User>  <HomeScreen /> </PrivateRoute.User>} exact></Route>
                </Route>
            </Routes>
            
          </>
        </section>
      </>
    )
}

export default Dashboard