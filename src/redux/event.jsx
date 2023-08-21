import { configureStore } from '@reduxjs/toolkit' 
import cartSlice from './cartSlice'

export const event = configureStore({
  reducer: {
    cart : cartSlice
  },
  devTools:true
})