import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/authSlice'

const CollegePredictor = () => {
  const [gender, setGender] = useState('Male')
  const [category, setCategory] = useState('General')
  const [rank, setRank] = useState('')
  const [subcategoryRank, setSubcategoryRank] = useState('')
  const [colleges, setColleges] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!rank || (category !== 'General' && !subcategoryRank)) {
      setError('Please fill all required fields')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      const token = localStorage.getItem('token')
      const effectiveRank = category === "General" ? rank : subcategoryRank
      
      const response = await fetch('https://college-predictor-2-0.vercel.app/getColleges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ gender, category, rank, subcategoryRank: effectiveRank })
      })
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          dispatch(logout())
          return
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setColleges(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch(logout())
  }

  return (
    <div className="college-predictor-container">
      <header className="predictor-header">
        <h1>College Predictor</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>
      
      <div className="predictor-content">
        <div className="form-section">
          <h2>Find Your College</h2>
          <form onSubmit={handleSubmit} className="college-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="rank">Rank:</label>
                <input
                  type="number"
                  id="rank"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  required
                  min="1"
                />
              </div>
              
              {category !== "General" && (
                <div className="form-group">
                  <label htmlFor="subcategoryRank">Category Rank:</label>
                  <input
                    type="number"
                    id="subcategoryRank"
                    value={subcategoryRank}
                    onChange={(e) => setSubcategoryRank(e.target.value)}
                    required
                    min="1"
                  />
                </div>
              )}
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Loading...' : 'Get Colleges'}
            </button>
          </form>
        </div>
        
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading colleges...</p>
          </div>
        )}
        
        {colleges.length > 0 && (
          <div className="results-section">
            <h2>Recommended Colleges</h2>
            <div className="colleges-grid">
              {colleges.map((college, index) => (
                <div key={index} className="college-card">
                  <h3>{college.college} - {college.branch}</h3>
                  
                  {college.rounds.map((round, idx) => (
                    <div key={idx} className={`round ${round.color}`}>
                      {round.round}: {round.value}
                    </div>
                  ))}
                  
                  <div className="last-rank">
                    <strong>Last Rank: {college.last_rank}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CollegePredictor
