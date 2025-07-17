import React from 'react'

function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = 'text-white',
    className="",
    ...props
}) {
  return (
    <button className={`px-4 py-2 rounded-lg hover:bg-blue-400 ${bgColor} ${textColor} ${className}`} {...props}>
        {children}      {/* //& It is just a text. */}
    </button>
  )
}

export default Button
