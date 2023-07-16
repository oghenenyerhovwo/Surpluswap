import React from 'react'
import { ButtonMenu } from 'react-rainbow-components';
import { useDispatch } from 'react-redux'

import { switchListBoxReactRainbow } from "../../actions"
import styles from "./dotmenu.module.css"

import { FaEllipsisV } from 'react-icons/fa';

const DotMenu = props => {
    const dispatch = useDispatch()

    const { darkMode } = props

    const openMenu = () => {
        dispatch(switchListBoxReactRainbow(true))
    }

    return (
        <div onClick={openMenu} className={`${styles.dot_menu} ${darkMode && styles.dot_menu_dark} flex flex__center`}>
            <ButtonMenu icon={<FaEllipsisV />} >
                {props.children}
            </ButtonMenu>
        </div>
    )
}

export default DotMenu