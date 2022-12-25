import { useEffect } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux"

import LoadingBoxTwo from "../LoadingBoxTwo"

const User = props => {
    const navigate = useNavigate()
    const location = useLocation()

    const { currentUser, token, completeTokenSignIn } = useSelector(state => state.userStore)

    useEffect(() => {
      if(!token || (completeTokenSignIn && !currentUser.email)){
        navigate(`/user/signin/?redirect=${location.pathname}`)
      }
    }, [currentUser.email, token, navigate, location.pathname, completeTokenSignIn ])

    return (
        <>
            {
              currentUser.email ? (
                <>{props.children}</>
              ) : (
                <LoadingBoxTwo isLoading={true} />
              )
            }
        </>
    )
}

export default User