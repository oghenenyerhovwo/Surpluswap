import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// components
import { Spinner, MessageBox, ProfileCard, SearchBar, RadioOptions } from "../../components"

// css
import styles from "./profiles.module.css"

// functions
import { getUsers } from "../../actions"

// type
import { GET_USERS_RESET } from "../../constants/userConstants"



const Profiles = () => {
  const dispatch = useDispatch()

  // state
  const {
    successGetUsers,
    loadingGetUsers,
    errorGetUsers,
    users,
    successUpdateUser,
    successDeleteUser,
  } =  useSelector(state => state.userStore)

  const initialState = { options: null };
  const options = [
    { value: 'fullName', label: 'By Name' },
    { value: 'email', label: 'By email' },
];

  const [searchState, setSearchState] = useState(initialState)
  const [searchOption, setSearchOption] = useState('fullName');
  const [searchDate, setSearchDate] = useState([]);

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch, successUpdateUser, successDeleteUser])

  useEffect(() => {
    if(successGetUsers){
      dispatch({type: GET_USERS_RESET})
      setSearchDate(users.map(user => {
        return {...user, label: user[searchOption]} 
      }))
    }
  }, [dispatch, successGetUsers, searchOption, users])  

  const handleSearchOptionChange = event => {
    const { value } = event.target
    setSearchOption(value);
    setSearchDate(users.map(user => {
      return {...user, label: user[value]} 
    }))
  }

  return (
    <div className={`container`}>
      {loadingGetUsers && <Spinner />} 
      {errorGetUsers && <MessageBox variant="danger">{errorGetUsers} </MessageBox>}

      <div className={`${styles.profiles}`}>
        <div className={`${styles.search} flex flex__column spacing-lg`}>
          <SearchBar data={searchDate} searchState={searchState} setSearchState={setSearchState} />
          <div className={styles.radiooptions}><RadioOptions orientation="horizontal" onChange={handleSearchOptionChange} value={searchOption} options={options} /></div>
        </div>
        <div className={styles.users}>
          {
            users.length > 0 ?
            <>
                {
                  (searchState.options && searchState.options.length) ? searchState.options.map(user => (
                    <React.Fragment key={user._id}>
                        <ProfileCard user={user} />
                    </React.Fragment>
                  )): users.length ? users.map(user => (
                    <React.Fragment key={user._id}>
                        <ProfileCard user={user} />
                    </React.Fragment>
                  )): <> </>
                }
              
            </>: <></>
          } 
        </div>  
      </div>
      
    </div>
  )
}

export default Profiles