import React from 'react';
import { CheckboxToggle } from 'react-rainbow-components';

import styles from "./checkboxtwo.module.css"

const CheckBoxTwo = props => {

    const { value, onChange, label } = props

    return (
        <div className={`${styles.checkboxtwo} rainbow-p-vertical_large rainbow-p-left_x-large`}> 
            <CheckboxToggle
                id="radio-group-component-1"
                value={value}
                onChange={onChange}
                label={label}
            />
        </div>
    );
}


export default CheckBoxTwo