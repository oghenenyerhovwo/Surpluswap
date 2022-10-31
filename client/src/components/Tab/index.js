import React from 'react'

import styles from "./tab.module.css"

const Container = props => {
    return (
        <div className={`flex ${styles.tab} ${props.className}`}>
            {props.children}
        </div>
    )
}

const Item = props => {
    const {
        eventKey,
        tab,
        setTab,
    } = props

    const handleTab = () => {
        setTab(eventKey)
    }

    return (
        <div onClick={handleTab} className={`${styles.tab_item}  ${tab === eventKey && styles.tab_active}`}>{props.children} </div>
    )
}

const ContainerOutline = props => {
    return (
        <div className={`${styles.tab_outline} ${props.className}`}>
            {props.children}
        </div>
    )
}

const ItemOutline = props => {
    const {
        eventKey,
        tab,
        setTab,
    } = props

    const handleTab = () => {
        setTab(eventKey)
    }

    return (
        <div onClick={handleTab} className={`${styles.tab_item_outline}  ${tab === eventKey && styles.tab_active_outline}`}>{props.children} </div>
    )
}


const Tab = {
    Item,
    Container,
    ContainerOutline,
    ItemOutline,
}

export default Tab