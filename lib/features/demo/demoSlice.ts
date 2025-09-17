import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DemoState {
  value: number
  text: string
  isLoading: boolean
}

const initialState: DemoState = {
  value: 0,
  text: 'Hello Redux!',
  isLoading: false,
}

export const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    reset: (state) => {
      state.value = 0
      state.text = 'Hello Redux!'
      state.isLoading = false
    },
  },
})

export const { increment, decrement, incrementByAmount, setText, setLoading, reset } = demoSlice.actions

export default demoSlice.reducer
