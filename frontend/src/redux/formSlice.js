import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rank: '',
  gender: '',
  category: 'General',
  subCategory: '',
  categoryRank: '',
  loading: false,
  error: null,
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload
      state[field] = value
      
      // Reset subCategory and categoryRank if category is General
      if (field === 'category' && value === 'General') {
        state.subCategory = ''
        state.categoryRank = ''
      }
    },
    submitStart: (state) => {
      state.loading = true
      state.error = null
    },
    submitSuccess: (state) => {
      state.loading = false
      state.error = null
    },
    submitFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { updateField, submitStart, submitSuccess, submitFailure } = formSlice.actions
export default formSlice.reducer