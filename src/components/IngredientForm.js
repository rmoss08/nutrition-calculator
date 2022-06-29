import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { mealActions } from '../store/meal-slice';
import styles from './IngredientForm.module.css';

const TEST_CUCUMBER = {
  serving_size_g: 100,
  sugar_g: 0.85,
  fiber_g: 0.25,
  sodium_mg: 0.5,
  potassium_mg: 12,
  fat_saturated_g: 0,
  fat_total_g: 0.05,
  calories: 7.65,
  cholesterol_mg: 0,
  protein_g: 0.3,
  carbohydrates_total_g: 1.85,
};
export const calculateWeightedValues = (ingredient, newQuantity=false) => {
  const quantity = newQuantity ? newQuantity:ingredient.userQuantity_g;
  const servingSizeFactor = quantity / ingredient.apiServingSize_g;
  let weightedNutrition = {};
  const apiNutrition = ingredient.apiNutrition;

  for (const key in apiNutrition) {
    if (key !== 'serving_size_g') {
      const nutritionValue = apiNutrition[key];
      const weightedValue = nutritionValue * servingSizeFactor;
      weightedNutrition[key] = weightedValue;
    }
  }

  return weightedNutrition;
};

const IngredientForm = () => {
  const dispatch = useDispatch();

  const convertToFloat = (object) => {
    let formattedData = {};
    for (const key in object) {
      formattedData[key] = parseFloat(object[key]);
    }

    return formattedData;
  };

  const fetchNutritionData = (ingredientName) => {
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
      params: { query: ingredientName },
      headers: {
        'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com',
        'X-RapidAPI-Key': 'f31dca7789msh9b76c7ca9ee7a84p1aaa5cjsn75b70701b51a',
      },
    };

    return axios
      .request(options)
      .then((response) => {
        const data = response.data.items[0];

        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const ingredientName = event.target[0].value;

    // --- Commented out for testing purpose
    // fetchNutritionData(ingredientName).then((nutritionData) => {
    //   delete nutritionData.name;

    const floatNutrition = convertToFloat(TEST_CUCUMBER);
    const apiServingSize_g = floatNutrition['serving_size_g'];
    delete floatNutrition['serving_size_g'];
    //   const weightedNutritionData = calculateWeightedValues(
    //     weight,
    //     floatNutritionData
    //   );

    const ingredient = {
      id: `${Number(event.timeStamp)}`,
      name: ingredientName,
      userQuantity_g: parseFloat(event.target[1].value),
      apiServingSize_g,
      apiNutrition: floatNutrition,
      // --- Commented out for testing purpose
      // --- NOTE: ingredient and return statement should go back in .then()
      // nutrition: weightedNutritionData,
    };

    const userNutrition = calculateWeightedValues(ingredient);
    ingredient['userNutrition'] = userNutrition;

    return dispatch(mealActions.add(ingredient));
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles['ing-form-field']}>
        <label htmlFor="ingredient-input">Ingredient:</label>
        <input id="ingredient-input" type="text" />
      </div>
      <div className={styles['ing-form-field']}>
        <label htmlFor="weight-input">Weight (grams):</label>
        <input id="weight-input" type="number" min="1" />
      </div>
      <button>Add</button>
    </form>
  );
};

export default IngredientForm;
