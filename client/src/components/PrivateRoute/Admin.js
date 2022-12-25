import { useEffect, useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

import ErrorBox from "../ErrorBox"


const Admin = props => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { currentUser, token, completeTokenSignIn } = useSelector(state => state.userStore)

    const [message, setMessage] = useState("")

    useEffect(() => {
      if(!token || (completeTokenSignIn && currentUser._id && currentUser.role !== "admin")){
        setMessage("You need to be logged in an admin's account")
      }

      const timer = setTimeout(() => {
        navigate("/")
      }, 3000);

      return () => {
        clearTimeout(timer)
      };
    }, [currentUser.email,dispatch, navigate, token, completeTokenSignIn, currentUser._id , currentUser.role, location.pathname ])

    return (
        <>
            {
              message && (
                <ErrorBox 
                    activateRef={"unique"} 
                    inputError={message} 
                    errorMessage={message}
                />
              )
            }
            {(currentUser.role === "admin") && props.children}
        </>
    )
}

export default Admin