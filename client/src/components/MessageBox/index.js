import { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from '../../../node_modules/react-router-dom/index'


// importing css
import "./index.css"

const MessageBox = props => {
    const elMessageBox = useRef();

    const {
        href
      } =  useSelector(state => state.appHistoryStore)

    useEffect(() => {
        window.scrollTo(0, elMessageBox.current.offsetTop)
    }, [props.children])
    
    return (
        <div ref={elMessageBox}  className={`container alert alert-${props.variant || "info"}`} >
            {props.children}
            {props.ownerError && <span>Go <Link to={href}>Back</Link> </span>}
        </div>
    )
}

export default MessageBox