import React from 'react';

import { MaleAvatar, FemaleAvatar } from "../../assets"

import styles from "./avatar.module.css"


const AvatarComponent = props => {
    const { gender } = props
    return (
        gender === "female" ? <img className={styles.avatar} src={FemaleAvatar} alt="FemaleAvatar" />: <img className={styles.avatar} src={MaleAvatar} alt="MaleAvatar" />
    )
}

export default AvatarComponent