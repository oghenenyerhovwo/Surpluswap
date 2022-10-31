import { useEffect, useState } from "react"
import { useLocation } from '../../../node_modules/react-router-dom/index'
import { useSelector, useDispatch } from "react-redux"

import MessageBox from "../MessageBox"


const AdminRoute = props => {
    const location = useLocation()
    const dispatch = useDispatch()

    const { currentUser } = useSelector(state => state.userStore)

    const [message, setMessage] = useState("")

    useEffect(() => {
      if(( currentUser.role !== "admin" && currentUser.role !== "superAdmin") ){
        setMessage("You need to be logged in as an admin. Log out and log back in with an admin account")
      }
    }, [currentUser.email,dispatch, currentUser.role, location.pathname ])

    return (
        <>
            {message && <MessageBox>{message}  </MessageBox>}
            {(currentUser.role === "admin" || currentUser.role === "superAdmin") && props.children}
        </>
    )
}

export default AdminRoute