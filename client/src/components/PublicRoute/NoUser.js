import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"

const NoUser = props => {
    const navigate = useNavigate()

    const { currentUser, token, completeTokenSignIn } = useSelector(state => state.userStore)

    useEffect(() => {
      if(token && (completeTokenSignIn && currentUser.email)){
        const redirectLink = currentUser.role === "admin" ?  `/admin/dashboard/` : `/dashboard/`
        navigate(redirectLink)
      }
    }, [navigate, currentUser.email, token, completeTokenSignIn, currentUser.role])

    return (
        <>
            {!currentUser.email && props.children}
        </>
    )
}

export default NoUser