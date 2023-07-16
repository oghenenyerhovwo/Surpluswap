import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"

const User = props => {
    const navigate = useNavigate()

    const { currentUser, token, completeTokenSignIn } = useSelector(state => state.userStore)

    useEffect(() => {
      if(!token || (completeTokenSignIn && !currentUser.email)){
        navigate(`/user/signin`)
      }
    }, [currentUser.email, token, navigate, completeTokenSignIn ])

    return (
        <>
            {
              currentUser.email && (
                <>{props.children}</>
              ) 
            }
        </>
    )
}

export default User