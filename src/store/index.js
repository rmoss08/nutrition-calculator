import { configureStore } from '@reduxjs/toolkit';
import mealReducer from './meal-slice.js';

const store = configureStore({
    reducer: { meal: mealReducer },
});

export default store;