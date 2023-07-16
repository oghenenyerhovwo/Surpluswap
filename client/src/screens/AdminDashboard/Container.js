import { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LoadingBoxTwo, ErrorBox } from "../../components"

import { getUsers, getTransactionsMine, getTransactions } from "../../actions"

const Container = props => {
    const dispatch = useDispatch()

      // global state
    const { 
        errorGetUsers,
        currentUser,
        successUpdateUser,
        successDeleteUser,
        successGetUsers,
    } =  useSelector(state => state.userStore)
    const { 
        successGetTransactionsMine,
        errorGetTransactionsMine,
        successGetTransactions,
        errorGetTransactions,
        successUpdateTransaction,
        successCreateTransaction,
      }=  useSelector(state => state.transactionStore)

    const [displayLoadingBox, setDisplayLoadingBox] = useState(true)

    useEffect(() => {
        dispatch(getTransactionsMine())
        dispatch(getTransactions())
      }, [dispatch, successUpdateTransaction, successCreateTransaction])
   
   useEffect(() => {
      dispatch(getUsers())
    }, [dispatch, successUpdateUser, successDeleteUser])
    
    useEffect(() => {
        if(successGetTransactionsMine && successGetUsers && successGetTransactions){
            setDisplayLoadingBox(false)
        }
        if(errorGetUsers || errorGetTransactionsMine || errorGetTransactions){
            setDisplayLoadingBox(false)
        }
      }, [dispatch,errorGetUsers, errorGetTransactionsMine, errorGetTransactions, successGetTransactionsMine, successGetUsers, successGetTransactions])


    return (
        <div>
            <div className="container">
                <LoadingBoxTwo isLoading={displayLoadingBox} />
                <ErrorBox 
                    activateRef={"unique"} 
                    inputError={errorGetUsers || errorGetTransactionsMine || errorGetTransactions } 
                    errorMessage={errorGetUsers || errorGetTransactionsMine || errorGetTransactions}
                />
            </div>
            {(currentUser._id && !errorGetTransactionsMine && !errorGetUsers && !errorGetTransactions) && props.children}
        </div>
    )
}

export default Container