import React from 'react'
import CustomLink from "../CustomLink"
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
        <CustomLink 
          className={`btn btn-${variant } btn-${size || "lg" } spacing-sm  ${block && `flex flex__center btn-block` }`} 
          href={href}
          disabled={disabled}
          onClick={onClick}
        >
            {children} 
        </CustomLink>:
        <button 
          className={`btn btn-${variant } btn-${size || "lg" } spacing-sm   ${block && `flex flex__center btn-block` }`} 
          to={href || "#"}
          disabled={disabled}
          onClick={onClick}
          type={type}
        >
          {children}
        </button>
      }
      {error && <p className="btn-error"><em>{"/* Make sure all required fields are filled */"}</em> </p>}

    </>
  )
}

export default Button