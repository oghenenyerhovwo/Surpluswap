import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AnimatePresence } from "framer-motion"

// components
import { ProfileCard, SearchBar, RadioOptions } from "../../components"

// css
import styles from "./profiles.module.css"

const Profiles = () => {

  // state
  const {
    users,
  } =  useSelector(state => state.userStore)

  const {  
    darkMode,
  }=  useSelector(state => state.generalStore)

  const initialSearchState = { options: null };
  const options = [
    { value: 'name', label: 'By Name' },
    { value: 'email', label: 'By email' },
];

  const [searchState, setSearchState] = useState(initialSearchState)
  const [searchOption, setSearchOption] = useState('name');

  const handleSearchOptionChange = event => {
    const { value } = event.target
    setSearchOption(value);
  }


  return (
    <AnimatePresence mode="wait">
      <div className={`${styles.profiles} ${darkMode && styles.profiles_dark} container`}>
        <div className={`${styles.search} flex flex__column spacing-lg`}>
          <SearchBar 
            data={users.map(user => {
              return {...user, name: `${user.firstName} ${user.lastName}`} 
            }).map(user => {
              return {...user, label: user[searchOption]} 
            })} 
            searchState={searchState} 
            setSearchState={setSearchState}
            darkMode={darkMode}
            turnOffDisplaySearchList={false}
            placeholder={`Search by ${searchOption} `}
          />
          <div className={styles.radiooptions}>
              <RadioOptions 
                  orientation="horizontal" 
                  onChange={handleSearchOptionChange}
                  value={searchOption}  
                  options={options}
                  darkMode={darkMode}
              />
          </div>
        </div>
        <div className={styles.users}>
          {
            users.length > 0 ?
            <>
                {
                  (searchState.options && searchState.options.length) ? searchState.options.map(user => (
                    <React.Fragment key={user._id}>
                        <ProfileCard user={user} darkMode={darkMode} />
                    </React.Fragment>
                  )): users.length ? users.map(user => (
                    <React.Fragment key={user._id}>
                        <ProfileCard user={user} darkMode={darkMode} />
                    </React.Fragment>
                  )): <> </>
                }
            </>: <></>
          } 
        </div>  
      </div>
      
    </AnimatePresence>
  )
}

export default Profiles