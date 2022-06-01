import { createSlice } from '@reduxjs/toolkit';

const mealSlice = createSlice({
  name: 'menu',
  initialState: { ingredients: [] },
  reducers: {
    add(state, payload) {
      const prevState = state.ingredients;
      state.ingredients = [...prevState, payload ];
    },
    delete(state, payload) {
      const prevState = state.ingredients;
      // This many need work
      state.ingredients = prevState.map(ingredient => ingredient.id !== payload.id);
    },
    reset(state){
        state.ingredients = [];
    }
  },
});

export const mealActions = mealSlice.actions;
export default mealSlice.reducer;
