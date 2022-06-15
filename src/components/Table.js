import { useDispatch, useSelector } from 'react-redux';
import { dayActions } from '../store/day-slice';
import { mealActions } from '../store/meal-slice';

const TABLE_HEADER = [
  'Ingredient',
  'Weight (g)',
  'Actions',
  'Sugar (g)',
  'Fiber (g)',
  'Sodium (mg)',
  'Potassium (mg)',
  'Saturated Fat (g)',
  'Total Fat (g)',
  'Calories (g)',
  'Cholesterol (mg)',
  'Protein (g)',
  'Carbohydrate (g)',
];

const Table = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.meal.ingredients);

  const thElements = TABLE_HEADER.map((description) => (
    <th key={description}>{description}</th>
  ));

  const calculateWeightedValues = (ingredient) => {
    const nutrition = ingredient.nutrition;

    const userServingSize = ingredient.weight;
    const nutritionServingSize = nutrition.serving_size_g;
    const servingSizeFactor = userServingSize / nutritionServingSize;

    let weightedNutritionValues = {};

    for (const key in nutrition) {
      if (key !== 'serving_size_g') {
        const nutritionValue = nutrition[key];
        const weightedValue = nutritionValue * servingSizeFactor;
        weightedNutritionValues[key] = weightedValue;
      }
    }

    return weightedNutritionValues;
  };

  const createRowElement = (id, name, weight, data) => {
    let tdElements = [
      <td key="name">{name}</td>,
      <td key="weight">{weight}</td>,
      <td key="action">
        <button>+</button>
        <button>-</button>
      </td>,
    ];

    for (const key in data) {
      tdElements.push(<td key={key}>{data[key]}</td>);
    }

    return <tr key={id}>{tdElements}</tr>;
  };

  const createTotalRowElement = (totals) => {
    let tdElements = [
      <td key="total">Total</td>,
      <td key="weight"></td>,
      <td key="action"></td>,
    ];

    for (const key in totals) {
      tdElements.push(<td key={key}>{totals[key]}</td>);
    }

    return <tr key={totals}>{tdElements}</tr>;
  };

  let totals = {
    sugar_g: 0,
    fiber_g: 0,
    sodium_mg: 0,
    potassium_mg: 0,
    fat_saturated_g: 0,
    fat_total_g: 0,
    calories: 0,
    cholesterol_mg: 0,
    protein_g: 0,
    carbohydrates_total_g: 0,
  };

  const calculateTotals = (ingredients) => {
    for (const i in ingredients) {
      const ingredient = ingredients[i];
      for (const key in ingredient.nutrition) {
        const prevTotal = totals[key];
        totals[key] = prevTotal + ingredient.nutrition[key];
      }
    }
    return totals;
  };

  const addMealHandler = (event) => {
    event.preventDefault();
    let mealNameInput = document.getElementById('meal-name');

    const meal = { name: mealNameInput.value, totals: totals };

    if (ingredients.length > 0) {
      dispatch(dayActions.add(meal));
      dispatch(mealActions.reset());
      mealNameInput.value = '';
    }
  };

  const resetHandler = (event) => {
    event.preventDefault();

    return dispatch(mealActions.reset());
  };

  let tableElements = [];

  if (ingredients.length > 0) {
    let weightedIngredients = [];
    for (const i in ingredients) {
      const weightedNutrition = calculateWeightedValues(ingredients[i]);
      const weightedIng = { ...ingredients[i], nutrition: weightedNutrition };
      weightedIngredients.push(weightedIng);
    }

    console.log(weightedIngredients);
    tableElements = weightedIngredients.map((ingredient) => {
      return createRowElement(
        ingredient.id,
        ingredient.name,
        ingredient.weight,
        ingredient.nutrition
      );
    });

    const mealTotal = calculateTotals(weightedIngredients);
    const totalRowElement = createTotalRowElement(mealTotal);
    tableElements.push(totalRowElement);
  }

  return (
    <div>
      <div>
        <label htmlFor="meal-name">Meal Name:</label>
        <input type="text" id="meal-name"></input>
      </div>
      <table>
        <thead>
          <tr>{thElements}</tr>
        </thead>
        <tbody>{tableElements}</tbody>
      </table>
      <button onClick={addMealHandler}>Add Meal</button>
      <button onClick={resetHandler}>Reset</button>
    </div>
  );
};
export default Table;
