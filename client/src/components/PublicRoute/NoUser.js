import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"

const NoUser = props => {
    const navigate = useNavigate()

    const { currentUser, token, completeTokenSignIn } = useSelector(state => state.userStore)

    useEffect(() => {
      if(token && (completeTokenSignIn && currentUser.email)){
        navigate(`/dashboard`)
      }
    }, [navigate, currentUser.email, token, completeTokenSignIn])

    return (
        <>
            {!currentUser.email && props.children}
        </>
    )
}

export default NoUser