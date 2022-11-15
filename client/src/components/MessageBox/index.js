import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'


// importing css
import "./index.css"

const MessageBox = props => {
    const elMessageBox = useRef();

    useEffect(() => {
        window.scrollTo(0, elMessageBox.current.offsetTop)
    }, [props.children])
    
    return (
        <div ref={elMessageBox}  className={`container alert alert-${props.variant || "info"}`} >
            {props.children}
            {props.ownerError && <span>Go <Link to="/">Back</Link> </span>}
        </div>
    )
}

export default MessageBox