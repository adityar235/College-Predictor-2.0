import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Login from './components/Login'
import Signup from './components/Signup'
import CollegePredictor from './components/CollegePredictor'
import './App.css'

function App() {
  const [isLogin, setIsLogin] = useState(true)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const switchToSignup = () => setIsLogin(false)
  const switchToLogin = () => setIsLogin(true)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (token && user) {
      // You might want to verify the token with your backend here
    }
  }, [])

  if (isAuthenticated) {
    return <CollegePredictor />
  }

  return (
    <div className="App">
      {isLogin ? (
        <Login switchToSignup={switchToSignup} />
      ) : (
        <Signup switchToLogin={switchToLogin} />
      )}
    </div>
  )
}

export default App

