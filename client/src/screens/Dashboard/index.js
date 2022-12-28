import { Routes, Route, useLocation } from "react-router-dom"

// screens
import HomeScreen from "./Home"
import Profile from "./Profile"

// components
import { 
  Sidebar,
  PrivateRoute,
} from "../../components"


// css
import "./index.css"

const Dashboard = () => {
    const location = useLocation()

    return (
      <>
        <Sidebar />
        <section className="main">
          <>
            <Routes location={location} key={location.key}>
                <Route path="/">
                  <Route path="profile/:id" element={<PrivateRoute.User>  <Profile /> </PrivateRoute.User>} exact></Route>
                  <Route path="profile/:id/edit" element={<PrivateRoute.User>  <Profile /> </PrivateRoute.User>} exact></Route>
                  <Route path="" element={<PrivateRoute.User>  <HomeScreen /> </PrivateRoute.User>} exact></Route>
                </Route>
            </Routes>
            
          </>
        </section>
      </>
    )
}

export default Dashboard