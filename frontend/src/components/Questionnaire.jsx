import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateField, submitStart, submitSuccess, submitFailure } from '../redux/formSlice'

const Questionnaire = () => {
  const dispatch = useDispatch()
  const { rank, gender, category, subCategory, categoryRank, loading, error } = useSelector((state) => state.form)

  const handleChange = (field, value) => {
    dispatch(updateField({ field, value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    dispatch(submitStart())
    
    try {
      // This will be replaced with your actual API call
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/submit-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ rank, gender, category, subCategory, categoryRank }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        dispatch(submitSuccess())
        // Redirect to results page or show success message
        alert('Details submitted successfully!')
      } else {
        dispatch(submitFailure(data.message))
      }
    } catch (err) {
      dispatch(submitFailure('An error occurred while submitting details'))
    }
  }

  return (
    <div className="questionnaire-container">
      <h2>College Predictor Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="rank">Rank:</label>
          <input
            type="number"
            id="rank"
            value={rank}
            onChange={(e) => handleChange('rank', e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => handleChange('category', e.target.value)}
            required
          >
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="EWS">EWS</option>
          </select>
        </div>
        
        {category !== 'General' && (
          <>
            <div className="form-group">
              <label htmlFor="subCategory">Sub Category:</label>
              <input
                type="text"
                id="subCategory"
                value={subCategory}
                onChange={(e) => handleChange('subCategory', e.target.value)}
                required={category !== 'General'}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="categoryRank">Category Rank:</label>
              <input
                type="number"
                id="categoryRank"
                value={categoryRank}
                onChange={(e) => handleChange('categoryRank', e.target.value)}
                required={category !== 'General'}
              />
            </div>
          </>
        )}
        
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default Questionnaire