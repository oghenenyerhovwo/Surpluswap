import React, { useState, useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import styles from "./texteditor.module.css"


const TextEditor = props => {
    const {
        onChange,
        placeholder,
        onBlur,
        onFocus,
        error,
        onReady,
    } = props
    const [inputError, setInputError] = useState()

    useEffect(() => {
        setInputError(error)
    }, [error])

    return (
      <div className="spacing-md"> 
        <div className={`${styles.texteditor} ${inputError && styles.texteditor_error}`}>
            <CKEditor
                editor={ ClassicEditor }
                // data={`<p >Place</p>`}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                config={{placeholder: placeholder}}
                onReady={ onReady }
                // onChange={ ( event, editor ) => {
                //     const data = editor.getData();
                //     console.log( { event, editor, data } );
                // } }
                // onBlur={ ( event, editor ) => {
                //     console.log( 'Blur.', editor );
                // } }
                // onFocus={ ( event, editor ) => {
                //     console.log( 'Focus.', editor );
                // } }
            />
        </div>
        <p className={styles.texteditor_paragraph_error}>{inputError} </p>
      </div>
  )
}

export default TextEditor