import React from 'react'
import { useDispatch } from 'react-redux'
import { Lookup } from 'react-rainbow-components';

import { switchListBoxReactRainbow } from "../../actions"
import styles from "./searchbar.module.css"

const SearchBar = props => {
    const dispatch = useDispatch()

    const { data, searchState, setSearchState, label, placeholder, darkMode, turnOffDisplaySearchList } = props

    const openMenu = () => {
        dispatch(switchListBoxReactRainbow(!turnOffDisplaySearchList))
    }

    function filter(query, options) {
        if (query) {
            return options.filter(item => {
                const regex = new RegExp(query, 'i');
                return regex.test(item.label);
            });
        }
        return [];
    }


    function search(value) {
        if (searchState.options && searchState.value && value.length > searchState.value.length) {
            setSearchState(prevState => {
                return {
                    ...prevState,
                    options: filter(value, searchState.options),
                    value,
                }
            });
        } else if (value) {
            setSearchState(prevState => {
                return {
                    ...prevState,
                    options: filter(value, data),
                    value,
                }
            });
        } else {
            setSearchState(prevState => {
                return {
                    ...prevState,
                    value: '',
                    options: data,
                }
            });
        }
    }
    
    const handleChange = option => {
        setSearchState(prevState => {
            return {
                ...prevState,
                option,
                options: (prevState.options.length > 0 && option ) ? [option, ...prevState.options.filter(opt => opt._id !== option._id)] : prevState.options
            }
        });
    }

    return (
        <div onClick={openMenu} className={`${styles.searchbar} ${darkMode && styles.searchbar_dark}`}>
            <Lookup
                id="lookup-1"
                label={label}
                placeholder={placeholder || "Find"}
                options={searchState.options}
                value={searchState.option}
                onChange={handleChange}
                onSearch={search}
                className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
            />
        </div>
    )
}

export default SearchBar