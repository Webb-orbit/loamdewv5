import { configureStore } from '@reduxjs/toolkit'
import demoReducer from './features/demo/demoSlice'

export const store = configureStore({
  reducer: {
    demo: demoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
