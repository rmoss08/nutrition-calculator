import axios from 'axios';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mealActions } from '../store/meal-slice';
import Error from './Error';
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

const INGREDIENT_LIMIT = 50;

const ERROR_MESSAGES = {
  ingredientLimitMet: 'You have reached the ingredient limit',
  apiConnectionDown: 'Sorry, something went wrong. Please try again later',
  invalidIngredient: 'Please enter a valid ingredient',
};

export const calculateWeightedNutrition = (ingredient, newQuantity = false) => {
  const quantity = newQuantity ? newQuantity : ingredient.userQuantity_g;
  const servingSizeFactor = quantity / ingredient.apiServingSize_g;
  let weightedNutrition = {};
  const apiNutrition = ingredient.apiNutrition;

  for (const nutrient in apiNutrition) {
    if (nutrient !== 'serving_size_g') {
      const nutritionValue = apiNutrition[nutrient];
      const weightedValue = nutritionValue * servingSizeFactor;
      weightedNutrition[nutrient] = Number(weightedValue.toFixed(1));
    }
  }

  return weightedNutrition;
};

const IngredientForm = () => {
  const [isInvalidIngredient, setIsInvalidIngredient] = useState(false);
  const [isIngredientLimitMet, setIsIngredientLimitMet] = useState(false);
  const [isAPIConnectionDown, setIsAPIConnectionDown] = useState(false);

  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.meal.ingredients);
  const numberOfIngredients = ingredients.length;

  const convertToFloat = (objectToConvert) => {
    let floatObject = {};

    for (const key in objectToConvert) {
      floatObject[key] = parseFloat(objectToConvert[key]);
    }

    return floatObject;
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
        setIsAPIConnectionDown(true);
      });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const ingredientName = event.target[0].value;

    // --- Commented out for testing purpose
    // fetchNutritionData(ingredientName).then((nutritionData) => {
    //   try {
    //     if (nutritionData === undefined || null) {
    //       throw 'Invalid ingredient';
    //     } else {
    // delete nutritionData.name;

    const floatNutrition = convertToFloat(TEST_CUCUMBER);

    const apiServingSize_g = floatNutrition['serving_size_g'];
    delete floatNutrition['serving_size_g'];

    const ingredient = {
      id: `${Number(event.timeStamp)}`,
      name: ingredientName,
      userQuantity_g: parseFloat(event.target[1].value),
      apiServingSize_g,
      apiNutrition: floatNutrition,
    };

    const userNutrition = calculateWeightedNutrition(ingredient);
    ingredient['userNutrition'] = userNutrition;

    return dispatch(mealActions.add(ingredient));
    //   }
    // } catch {
    //   setIsInvalidIngredient(true);
    // }
    // });
  };

  useMemo(() => {
    if (numberOfIngredients >= INGREDIENT_LIMIT) {
      setIsIngredientLimitMet(true);
    } else {
      setIsIngredientLimitMet(false);
    }
  }, [numberOfIngredients]);

  return (
    <form onSubmit={submitHandler}>
      <div className={styles['if__grid']}>
        <div className={styles['if__field']}>
          <label htmlFor="if-name-input" className={styles['if__field-label']}>
            Ingredient:
          </label>
          <input
            id="if-name-input"
            className={styles['if__field-input']}
            type="text"
          />
          {isInvalidIngredient && (
            <Error message={ERROR_MESSAGES.invalidIngredient} />
          )}
        </div>
        <div className={styles['if__field']}>
          <label
            htmlFor="if-quantity-input"
            className={styles['if__field-label']}
          >
            Quantity (grams):
          </label>
          <input
            id="if-quantity-input"
            className={styles['if__field-input']}
            type="number"
            min="1"
          />
        </div>
      </div>
      <button className={styles['if__add-button']} disabled={isIngredientLimitMet}>
        Add
      </button>
      {isAPIConnectionDown && (
        <Error message={ERROR_MESSAGES.apiConnectionError} />
      )}
      {isIngredientLimitMet && (
        <Error message={ERROR_MESSAGES.ingredientLimitReached} />
      )}
    </form>
  );
};

export default IngredientForm;
