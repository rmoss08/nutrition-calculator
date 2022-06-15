import { configureStore } from '@reduxjs/toolkit';
import mealReducer from './meal-slice.js';
import dayReducer from './day-slice.js';

const store = configureStore({
    reducer: { meal: mealReducer, day: dayReducer },
});

export default store;