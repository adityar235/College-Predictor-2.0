
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { start, success, failure } from '../redux/authSlice'

const Login = ({ switchToSignup }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      dispatch(failure('Please enter both email and password'));
      return;
    }
    
    dispatch(start())
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        dispatch(success(data.user))
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true')
        }
      } else {
        dispatch(failure(data.error || 'Login failed'))
      }
    } catch (err) {
      console.error('Login error:', err);
      dispatch(failure('Network error. Please check your connection.'))
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome to College Predictor</h1>
          <p className="auth-subtitle">Sign in to continue your journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            
            <a href="#forgot" className="forgot-password">
              Forgot password?
            </a>
          </div>
          
          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className="auth-button" 
            disabled={loading}
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <span>Login to Account</span>
            )}
          </button>
          
          <div className="auth-switch">
            Don't have an account? <span onClick={switchToSignup}>Sign Up</span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login


