import { Routes, Route, useLocation } from "react-router-dom"

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

    return (
      <>
        <section className="header spacing-lg">
          <div className="home_container">
            <Header />
          </div>
        </section>
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