import { Routes, Route, useLocation } from "react-router-dom"

// screens
import HomeScreen from "./Home"
import Profile from "./Profile"
import Container from "./Container"
import Transaction from "./Transaction"
import UpdateTransaction from "./UpdateTransaction"


// components

import Sidebar from "./Sidebar"

// css
import "./index.css"

const Dashboard = () => {
    const location = useLocation()

    return (
      <Container>
        <Sidebar />
        <section className="dashboard_main">
            <Routes location={location} key={location.key}>
              <Route path="/">
                <Route path="profile" element={<Profile />}></Route>
                <Route path="transaction/:transactionId/update" element={<UpdateTransaction />}></Route>
                <Route path="transaction/:transactionId" element={<Transaction />}></Route>
                <Route path="" element={<HomeScreen />}></Route>
              </Route>
            </Routes>
        </section>
      </Container>
    )
}

export default Dashboard