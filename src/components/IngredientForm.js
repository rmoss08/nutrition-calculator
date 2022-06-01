import axios from 'axios';
import { useDispatch } from 'react-redux';
import { mealActions } from '../store/meal-slice';

const IngredientForm = () => {
  const dispatch = useDispatch();

  const fetchNutrition = (ingredient, weight, timestamp) => {
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
      params: { query: ingredient },
      headers: {
        'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com',
        'X-RapidAPI-Key': 'f31dca7789msh9b76c7ca9ee7a84p1aaa5cjsn75b70701b51a',
      },
    };

    return axios
      .request(options)
      .then((response) => {
        const data = response.data;
        console.log(data);
        const ingredientData = {
          id: timestamp,
          name: ingredient,
          weight: weight,
          nutrition: data.items[0],
        };

        return dispatch(mealActions.add(ingredientData));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const ingredient = event.target[0].value;
    const weight = event.target[1].value;
    const timestamp = event.timeStamp;

    return fetchNutrition(ingredient, weight, timestamp);
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