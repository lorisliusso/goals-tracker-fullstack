import { configureStore } from '@reduxjs/toolkit'
import { goalsReducer } from './reducers/goalsReducer'

  const initialState = {
  }

const store = configureStore({
  reducer: {

    goals: goalsReducer,
    
  }
}, initialState)


export default store

// The thunk middleware was automatically added