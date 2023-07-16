import { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { LoadingBoxTwo, ErrorBox } from "../../components"

import { getTransactionsMine } from "../../actions"

const Container = props => {
    const dispatch = useDispatch()

      // global state
    const { 
        currentUser,
    } =  useSelector(state => state.userStore)
    const { 
        successGetTransactionsMine,
        errorGetTransactionsMine,
        successUpdateTransaction,
        successCreateTransaction,
      }=  useSelector(state => state.transactionStore)

    const [displayLoadingBox, setDisplayLoadingBox] = useState(true)

    useEffect(() => {
        dispatch(getTransactionsMine())
      }, [dispatch,successUpdateTransaction, successCreateTransaction])

    useEffect(() => {
        if(successGetTransactionsMine || errorGetTransactionsMine){
            setDisplayLoadingBox(false)
        }
        if(errorGetTransactionsMine){
            setDisplayLoadingBox(false)
        }
      }, [dispatch, successGetTransactionsMine, errorGetTransactionsMine])


    return (
        <div>
            <div className="container">
                <LoadingBoxTwo isLoading={displayLoadingBox} />
                <ErrorBox 
                    activateRef={"unique"} 
                    inputError={errorGetTransactionsMine} 
                    errorMessage={errorGetTransactionsMine}
                />
            </div>
            {(currentUser._id && !errorGetTransactionsMine) && props.children}
        </div>
    )
}

export default Container