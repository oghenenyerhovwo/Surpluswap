import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// components
import { ErrorBox } from '../../../components'

// functions
import { confirmToken } from '../../../actions'

// types
import { CONFIRM_TOKEN_RESET } from '../../../constants/userConstants'

const TokenConfirmation = () => {
    const location = useLocation()
    const params = useParams()
    const dispatch = useDispatch()
    
    const { successConfirmToken, errorConfirmToken } =  useSelector(state => state.userStore)
    
    const confirmationType = location.search.split("=")[1]

    // handle page entry effect
    useEffect(() => {
      dispatch(confirmToken(params.id, confirmationType))
      
    }, [dispatch, params, confirmationType])
  
    // handle page exit effect
    useEffect(() => {
      if(successConfirmToken){
        dispatch({type: CONFIRM_TOKEN_RESET})
      }
    }, [dispatch, successConfirmToken])
  
    return (
    <div className="container">
        <ErrorBox 
            activateRef={"unique"} 
            inputError={errorConfirmToken} 
            errorMessage={errorConfirmToken}
        />
    </div>
  )
}

export default TokenConfirmation