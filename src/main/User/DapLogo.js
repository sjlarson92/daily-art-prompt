import React from 'react'
import logo from '../images/dapLogo.png'

const DapLogo = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="brand-logo-container">
        <img
          src={logo}
          style={{ height: 350 }}
          className="brand-logo"
          alt="Logo"
        />
      </div>
    </div>
  )
}
export default DapLogo
