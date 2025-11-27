import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const Navbtn = ({ title, path }) => {
  const [hover, setHover] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(path)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        cursor: 'pointer',
        border: '2px solid yellow',
        borderRadius: '20px',
        justifyContent: 'center',
        width: '80px',
        backgroundColor: hover ? 'yellow' : 'transparent',
        color: hover ? 'black' : 'white',
        transition: "0.2s"
      }}
    >
      {title}
    </div>
  )
}

export default Navbtn