import { Routes, Route } from "react-router-dom"

// screens
import Signup from "./Signup"

const UserRoutes = () => {
    return (
      <Routes>
        <Route path="/user/signup" element={<Signup />} exact></Route>
      </Routes>
    )
}

export default UserRoutes