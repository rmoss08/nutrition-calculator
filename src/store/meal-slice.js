import { createSlice } from '@reduxjs/toolkit';

const mealSlice = createSlice({
  name: 'meal',
  initialState: {
    ingredients: [],
    totals: {},
  },
  reducers: {
    add(state, action) {
      const prevState = state.ingredients;
      state.ingredients = [...prevState, action.payload];
    },
    delete(state, action) {
      const prevState = state.ingredients;
      // This many need work
      state.ingredients = prevState.map(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    reset(state) {
      state.ingredients = [];
    },
    updateTotals(state, action) {
      state.totals = action.payload;
    }
  },
});

export const mealActions = mealSlice.actions;
export default mealSlice.reducer;
