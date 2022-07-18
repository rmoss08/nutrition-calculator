import axios from 'axios';
import { useMemo, useRef, useState } from 'react';
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

export const calculateWeightedNutrition = (ingredient, newQuantity = false) => {
  const quantity = newQuantity ? newQuantity : ingredient.userQuantity_g;
  const servingSizeFactor = quantity / ingredient.apiServingSize_g;
  let weightedNutrition = {};
  const apiNutrition = ingredient.apiNutrition;

  for (const nutrient in apiNutrition) {
    if (nutrient !== 'serving_size_g') {
      const nutritionValue = apiNutrition[nutrient];
      const weightedValue = nutritionValue * servingSizeFactor;
      weightedNutrition[nutrient] = Number(weightedValue.toFixed(2));
    }
  }

  return weightedNutrition;
};

const IngredientForm = () => {
  const [isInvalidIngredient, setIsInvalidIngredient] = useState(false);
  const [isIngredientLimitMet, setIsIngredientLimitMet] = useState(false);
  const [isAPIConnectionDown, setIsAPIConnectionDown] = useState(false);

  const ingredientInputRef = useRef(null);
  const quantityInputRef = useRef(null);

  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.meal.ingredients);
  const numberOfIngredients = ingredients.length;

  const closeErrorHandler = (type) => {
    if (type === 'invalidIngredient') {
      return setIsInvalidIngredient(false);
    }
    if (type === 'apiConnectionError') {
      return setIsAPIConnectionDown(false);
    }
    if (type === 'ingredientLimitMet') {
      return setIsIngredientLimitMet(false);
    }
  };

  const convertObjectDataToNumbers = (objectToConvert) => {
    let floatObject = {};

    for (const key in objectToConvert) {
      floatObject[key] = Number(objectToConvert[key]);
    }

    return floatObject;
  };

  const fetchNutritionData = (ingredientName) => {
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'http://localhost:8000/fetch',
      params: { query: ingredientName },
    };

    return axios
      .request(options)
      .then((response) => {
        // console.log(response);
        return response.data.items[0];
      })
      .catch((error) => {
        console.error(error);
        setIsAPIConnectionDown(true);
      });
  };
  // const fetchNutritionData = (ingredientName) => {
  //   const axios = require('axios');

  //   const options = {
  //     method: 'GET',
  //     url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
  //     params: { query: ingredientName },
  //     headers: {
  //       'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com',
  //       'X-RapidAPI-Key': 'f31dca7789msh9b76c7ca9ee7a84p1aaa5cjsn75b70701b51a',
  //     },
  //   };

  //   return axios
  //     .request(options)
  //     .then((response) => {
  //       const data = response.data.items[0];

  //       return data;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setIsAPIConnectionDown(true);
  //     });
  // };

  const resetForm = () => {
    ingredientInputRef.current.value = '';
    quantityInputRef.current.value = '';

    setIsInvalidIngredient(false);
    setIsAPIConnectionDown(false);
    setIsIngredientLimitMet(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const userIngredientName = event.target[0].value;

    // --- Comment out for testing purpose
    fetchNutritionData(userIngredientName).then((nutritionData) => {
      try {
        if (nutritionData === undefined || null) {
          throw 'Invalid ingredient';
        } else {
          const apiIngredientName = nutritionData.name;
          delete nutritionData.name;

          const floatNutrition = convertObjectDataToNumbers(nutritionData);

          const apiServingSize_g = floatNutrition['serving_size_g'];
          delete floatNutrition['serving_size_g'];

          const ingredient = {
            id: `${Number(event.timeStamp)}`,
            name: apiIngredientName,
            userQuantity_g: parseFloat(event.target[1].value),
            apiServingSize_g,
            apiNutrition: floatNutrition,
          };

          const userNutrition = calculateWeightedNutrition(ingredient);
          ingredient['userNutrition'] = userNutrition;

          resetForm();

          return dispatch(mealActions.add(ingredient));
        }
      } catch {
        setIsInvalidIngredient(true);
      }
    });
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
      <div className={styles['ingredient-form__grid']}>
        <div className={styles['ingredient-form__field']}>
          <label
            htmlFor="ingredient-form-name-input"
            className={styles['ingredient-form__field-label']}
          >
            Ingredient:
          </label>
          <input
            ref={ingredientInputRef}
            id="ingredient-form-name-input"
            className={styles['ingredient-form__field-input']}
            type="text"
          />
        </div>
        <div className={styles['ingredient-form__field']}>
          <label
            htmlFor="ingredient-form-quantity-input"
            className={styles['ingredient-form__field-label']}
          >
            Quantity (grams):
          </label>
          <input
            ref={quantityInputRef}
            id="ingredient-form-quantity-input"
            className={styles['ingredient-form__field-input']}
            type="number"
            min="1"
          />
        </div>
      </div>
      <button
        className="page-subsection__button"
        disabled={isIngredientLimitMet}
      >
        Add
      </button>
      {isInvalidIngredient && (
        <Error type="invalidIngredient" closeError={closeErrorHandler} />
      )}
      {isAPIConnectionDown && (
        <Error type="apiConnectionError" closeError={closeErrorHandler} />
      )}
      {isIngredientLimitMet && (
        <Error type="ingredientLimitMet" closeError={closeErrorHandler} />
      )}
    </form>
  );
};

export default IngredientForm;
