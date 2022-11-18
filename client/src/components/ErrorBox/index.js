import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {BsFillTriangleFill} from "react-icons/bs"

// importing css
import "./index.css"

const ErrorBox = props => {
    const elErrorBox = useRef();

    useEffect(() => {
        window.scrollTo(0, elErrorBox.current.offsetTop)
    }, [props.children])
    
    return (
        <div ref={elErrorBox}  className="error_box" >
            <BsFillTriangleFill className="error_box-triangle" />
            {props.children}
            {props.ownerError && <span>Go to <Link to="/">Home Page</Link> </span>}
        </div>
    )
}

export default ErrorBox