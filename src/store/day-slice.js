import { createSlice } from '@reduxjs/toolkit';

const daySlice = createSlice({
  name: 'day',
  initialState: { meals: [] },
  reducers: {
    add(state, action) {
      const prevState = state.meals;
      state.meals = [...prevState, action.payload];
    },
    delete(state, action) {
      const prevState = state.meals;
      // This many need work
      state.meals = prevState.map(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    reset(state) {
      state.meals = [];
    },
  },
});

export const dayActions = daySlice.actions;
export default daySlice.reducer;