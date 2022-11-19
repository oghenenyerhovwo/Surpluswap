import { Routes, Route, useLocation  } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

// screens
import Signup from "./Signup"
import Signin from "./Signin"

const UserRoutes = () => {
  const location = useLocation()

    return (
      <AnimatePresence mode="wait" onExitComplete={() => {} }>
        <Routes location={location} key={location.key}>
          <Route path="/user/">
            <Route path="signup" element={<Signup />} exact></Route>
            <Route path="signin" element={<Signin />} exact></Route>
          </Route>
        </Routes>
      </AnimatePresence>
    )
}

export default UserRoutes