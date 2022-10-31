import React from 'react';
import { RadioGroup } from 'react-rainbow-components';

import styles from "./radiooptions.module.css"

const RadioOptions = props => {

    const { options, value, onChange, label, orientation } = props

    return (
        <div className={styles.radiooptions}> 
            <RadioGroup
                id="radio-group-component-1"
                options={options}
                value={value}
                onChange={onChange}
                label={label}
                orientation={orientation}
            />
        </div>
    );
}


export default RadioOptions