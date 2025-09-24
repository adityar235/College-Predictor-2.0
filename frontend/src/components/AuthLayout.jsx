import React from 'react'

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">{title}</h1>
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        </div>
        
        <div className="auth-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout