import { Routes, Route } from "react-router-dom"

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
    return (
      <>
        <section className="header spacing-lg">
          <div className="home_container">
            <Header />
          </div>
        </section>
        <section className="body">
          <Routes>
              <Route path="/" element={<HomeScreen />}></Route>
          </Routes>
          <UserRoutes />
        </section>
      </>
    )
}

export default HeaderRoutes