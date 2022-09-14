import axios from 'axios';
import { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mealActions } from '../../store/meal-slice';
import Error from '../Error';
import styles from './IngredientForm.module.css';

const INGREDIENT_LIMIT = 50;

export const calculateWeightedNutrition = (
  ingredient,
  mealServingSize,
  newQuantity = false
) => {
  const quantity = newQuantity ? newQuantity : ingredient.userQuantity_g;
  const quantityPerServing = quantity / mealServingSize;
  const apiServingSizeFactor = quantityPerServing / ingredient.apiServingSize_g;

  let weightedNutrition = {};
  const apiNutrition = ingredient.apiNutrition;

  for (const nutrient in apiNutrition) {
    if (nutrient !== 'serving_size_g') {
      const nutritionValue = apiNutrition[nutrient];
      const weightedValue = nutritionValue * apiServingSizeFactor;
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
  const servingSize = useSelector((state) => state.meal.servingSize);

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

  const convertObjectValuesToNumbers = (objectToConvert) => {
    let objectWithNumberValues = {};

    for (const key in objectToConvert) {
      objectWithNumberValues[key] = Number(objectToConvert[key]);
    }

    return objectWithNumberValues;
  };

  const resetInputValues = () => {
    ingredientInputRef.current.value = '';
    quantityInputRef.current.value = '';
  };

  const resetErrorStates = () => {
    setIsInvalidIngredient(false);
    setIsAPIConnectionDown(false);
    setIsIngredientLimitMet(false);
  };

  const fetchFirebaseNutrition = (ingredientName) => {
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://us-central1-nutrition-calculator-6db9d.cloudfunctions.net/fetchAPINutrition',
      params: { ingredient: ingredientName },
    };

    return axios
      .request(options)
      .then((response) => {
        return response.data.items[0];
      })
      .catch((error) => {
        console.error(error);
        return setIsAPIConnectionDown(true);
      });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const userIngredientName = event.target[0].value;

    fetchFirebaseNutrition(userIngredientName).then((nutritionData) => {
      try {
        if (nutritionData === undefined || null) {
          throw 'Invalid ingredient';
        } else {
          const apiIngredientName = nutritionData.name;
          delete nutritionData.name;

          const formattedNutritionData =
            convertObjectValuesToNumbers(nutritionData);

          const apiServingSize_g = formattedNutritionData['serving_size_g'];
          delete formattedNutritionData['serving_size_g'];

          const ingredient = {
            id: `${Number(event.timeStamp)}`,
            name: apiIngredientName,
            userQuantity_g: parseFloat(event.target[1].value),
            apiServingSize_g,
            apiNutrition: formattedNutritionData,
          };

          const userNutrition = calculateWeightedNutrition(
            ingredient,
            servingSize
          );
          ingredient['userNutrition'] = userNutrition;

          resetInputValues();
          resetErrorStates();

          return dispatch(mealActions.addIngredient(ingredient));
        }
      } catch {
        setIsInvalidIngredient(true);
      }
    });
  };

  const numberOfIngredients = ingredients.length;
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
        <div className="general-form__field">
          <label
            htmlFor="ingredient-form-name-input"
            className="general-form__field-label"
          >
            Ingredient:
          </label>
          <input
            ref={ingredientInputRef}
            id="ingredient-form-name-input"
            className="general-form__field-input"
            type="text"
          />
        </div>
        <div className="general-form__field">
          <label
            htmlFor="ingredient-form-quantity-input"
            className="general-form__field-label"
          >
            Quantity (grams):
          </label>
          <input
            ref={quantityInputRef}
            id="ingredient-form-quantity-input"
            className="general-form__field-input"
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
