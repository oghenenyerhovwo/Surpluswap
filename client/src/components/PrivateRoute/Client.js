import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

import ErrorBox from "../ErrorBox"


const Client = props => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { currentUser, token, completeTokenSignIn } = useSelector(state => state.userStore)

    const [message, setMessage] = useState("")

    useEffect(() => {
      let timer;
      if(!token || (completeTokenSignIn && currentUser._id && currentUser.role !== "client")){
        setMessage("You need to be logged in a client's account")
        timer = setTimeout(() => {
          navigate("/")
        }, 3000);
      }
      
      return () => {
        clearTimeout(timer)
      };
    }, [currentUser.email,dispatch, navigate, token, completeTokenSignIn, currentUser._id , currentUser.role ])

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
            {(currentUser.role === "client") && props.children}
        </>
    )
}

export default Client