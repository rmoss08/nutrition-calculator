import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { mealActions } from '../store/meal-slice';

const TEST_CUCUMBER = {
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

const IngredientForm = () => {
  const dispatch = useDispatch();

  const calculateWeightedValues = (weight, object) => {
    const nutritionServingSize = object.serving_size_g;
    const servingSizeFactor = weight / nutritionServingSize;

    let weightedNutritionValues = {};

    for (const key in object) {
      if (key !== 'serving_size_g') {
        const nutritionValue = object[key];
        const weightedValue = nutritionValue * servingSizeFactor;
        weightedNutritionValues[key] = weightedValue;
      }
    }

    return weightedNutritionValues;
  };

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
    const weight = parseFloat(event.target[1].value);

    // --- Commented out for testing purpose
    // fetchNutritionData(ingredientName).then((nutritionData) => {
    //   delete nutritionData.name;

    //   const floatNutritionData = convertToFloat(nutritionData);
    //   const weightedNutritionData = calculateWeightedValues(
    //     weight,
    //     floatNutritionData
    //   );

    const ingredient = {
      name: ingredientName,
      weight: parseFloat(event.target[1].value),
      id: `${event.timeStamp}`,
      nutrition: TEST_CUCUMBER,
      // --- Commented out for testing purpose
      // --- NOTE: ingredient and return statement should go back in .then()
      // nutrition: weightedNutritionData,
    };

    return dispatch(mealActions.add(ingredient));
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="ingredient-input">Ingredient:</label>
        <input id="ingredient-input" type="text" />
      </div>
      <div>
        <label htmlFor="weight-input">Weight (grams):</label>
        <input id="weight-input" type="number" min="1" />
      </div>
      <button>Add</button>
    </form>
  );
};

export default IngredientForm;
