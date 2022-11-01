import React from 'react'
import { Link } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa';
import "./button.css"

const Button = props => {
    const {
        href,
        block,
        variant,
        children,
        type,
        disabled,
        onClick,
        error,
        size,
    } = props
  return (
    <>
      {
        type === "link" ?
        <Link 
          className={`btn btn-${variant } btn-${size || "lg" } spacing-sm  ${block && `flex flex__center btn-block` }`} 
          to={href}
          disabled={disabled}
          onClick={onClick}
        >
            <span>{children}</span>
            <FaAngleRight />
        </Link>:
        <button 
          className={`btn btn-${variant } btn-${size || "lg" } spacing-sm   ${block && `flex flex__center btn-block` }`} 
          to={href || "#"}
          disabled={disabled}
          onClick={onClick}
          type={type}
        >
          <span>{children}</span>
          <FaAngleRight />
        </button>
      }
      {error && <p className="btn-error"><em>{"/* Make sure all required fields are filled */"}</em> </p>}

    </>
  )
}

export default Button