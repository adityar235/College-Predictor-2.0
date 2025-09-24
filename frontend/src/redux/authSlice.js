import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    start: (state) => {
      state.loading = true
      state.error = null
    },
    success: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
      state.error = null
    },
    failure: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.error = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { start, success, failure, logout } = authSlice.actions
export default authSlice.reducer


