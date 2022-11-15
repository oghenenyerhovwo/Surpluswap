import { Routes, Route } from "react-router-dom"

// screens
import Signup from "./Signup"
import Signin from "./Signin"

const UserRoutes = () => {
    return (
      <Routes>
        <Route path="/user/">
          <Route path="signup" element={<Signup />} exact></Route>
          <Route path="signin" element={<Signin />} exact></Route>
        </Route>
      </Routes>
    )
}

export default UserRoutes