import { useEffect } from "react"
import { useNavigate, useLocation } from '../../../node_modules/react-router-dom/index'
import { useSelector, useDispatch } from "react-redux"

import {SIGNOUT_USER_RESET} from "../../constants/userConstants"


const PrivateRoute = props => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const { currentUser, errorSignUser, successSignOut, token } = useSelector(state => state.userStore)

    useEffect(() => {
      if((!currentUser.email && errorSignUser) || !token  ){
        navigate(`/signin/?redirect=${location.pathname}`)
        dispatch({type: SIGNOUT_USER_RESET})
      }
    }, [currentUser.email,dispatch, token,  errorSignUser, navigate, location.pathname ])

    useEffect(() => {
      if( successSignOut){
        dispatch({type: SIGNOUT_USER_RESET})
      }
    }, [dispatch, successSignOut])

    return (
        <>
            {currentUser.email && props.children}
        </>
    )
}

export default PrivateRoute