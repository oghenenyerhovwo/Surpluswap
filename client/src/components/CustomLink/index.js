import React from 'react'

import { Link, useLocation } from '../../../node_modules/react-router-dom/index'

import { useDispatch } from 'react-redux'

// functions
import { setHistory } from "../../actions"

import "./customlink.css"

const CustomLink = props=> {
    const {
        href,
        children,
        disabled,
        onClick,
        className,
    } = props

    const dispatch = useDispatch()
    const location = useLocation()

    const handleHref = () => {
        if (href !== "#" && href !== " ") {
            dispatch(setHistory(location.pathname))
        }
    }

  return (
    <span className="app_custom-link" onClick={handleHref}>
        <Link 
            className={className} 
            to={href || "#"}
            disabled={disabled}
            onClick={onClick}
        >
            {children} 
        </Link>
    </span>
  )
}

export default CustomLink