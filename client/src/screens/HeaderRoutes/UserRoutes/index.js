import { Routes, Route, useLocation  } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

// screens
import Signup from "./Signup"
import Signin from "./Signin"
import ForgotPassword from "./ForgotPassword"
import TokenConfirmation from "./TokenConfirmation"
import ResetPassword from "./ResetPassword"

//  components
import { PublicRoute } from "../../../components"

const UserRoutes = () => {
  const location = useLocation()

    return (
      <AnimatePresence mode="wait" onExitComplete={() => {} }>
        <Routes location={location} key={location.key}>
          <Route path="/user/"> ResetPassword
            <Route path="signup" element={<PublicRoute.NoUser> <Signup /> </PublicRoute.NoUser>} exact></Route>
            <Route path="signin" element={<PublicRoute.NoUser> <Signin /> </PublicRoute.NoUser>} exact></Route>
            <Route path="password/reset" element={<PublicRoute.NoUser> <ResetPassword /> </PublicRoute.NoUser>} exact></Route>
            <Route path="password/recovery" element={<PublicRoute.NoUser> <ForgotPassword /> </PublicRoute.NoUser>} exact></Route>
            <Route path="confirm/token/:id" element={<PublicRoute.NoUser> <TokenConfirmation /> </PublicRoute.NoUser>} exact></Route>
          </Route>
        </Routes>
      </AnimatePresence>
    )
}

export default UserRoutes