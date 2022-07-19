import { createSlice } from '@reduxjs/toolkit';

const mealSlice = createSlice({
  name: 'meal',
  initialState: {
    ingredients: [],
    servingSize: 1,
    totals: {},
  },
  reducers: {
    add(state, action) {
      const prevState = state.ingredients;
      state.ingredients = [...prevState, action.payload];
    },
    remove(state, action) {
      const prevState = state.ingredients;
      
      state.ingredients = prevState.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    reset(state) {
      state.ingredients = [];
    },
    updateServingSize(state, action) {
      state.servingSize = action.payload;
    },
    resetServingSize(state){
      state.servingSize = 1;
    },
    updateTotals(state, action) {
      state.totals = action.payload;
    },
    updateIngredientQuantity(state, action) {
      const ingredientIndex = state.ingredients.findIndex(
        (ing) => ing.id === action.payload.id
      );
      state.ingredients[ingredientIndex]['userQuantity_g'] = action.payload.newQuantity;
      state.ingredients[ingredientIndex]['userNutrition'] = action.payload.newWeightedNutrition;
    },
  },
});

export const mealActions = mealSlice.actions;
export default mealSlice.reducer;
