import { createSlice } from '@reduxjs/toolkit';

const daySlice = createSlice({
  name: 'day',
  initialState: { meals: [], selectedMeals: [] },
  reducers: {
    addToMeals(state, action) {
      const prevState = state.meals;
      state.meals = [...prevState, action.payload];
    },
    deleteFromMeals(state, action) {
      const prevState = state.meals;
      // This many need work
      state.meals = prevState.map(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    resetMeals(state) {
      state.meals = [];
    },
    addToSelectedMeals(state, action) {
      const prevState = state.selectedMeals;
      state.selectedMeals = [...prevState, action.payload];
    },
    deleteFromSelectedMeals(state, action) {
      const prevState = state.selectedMeals;
      // This many need work
      state.selectedMeals = prevState.map(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    resetSelectedMeals(state) {
      state.selectedMeals = [];
    },
  },
});

export const dayActions = daySlice.actions;
export default daySlice.reducer;