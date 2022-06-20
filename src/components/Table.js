import { produceWithPatches } from 'immer';
import { useDispatch, useSelector } from 'react-redux';
import { dayActions } from '../store/day-slice';
import { mealActions } from '../store/meal-slice';

const TABLE_HEADER = [
  'rowData',
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

const Table = (props) => {
  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.meal.ingredients);
  const selectedMeals = useSelector((state) => state.day.selectedMeals);

  let tableData;
  let mealTable;
  if (props.slice === 'meal') {
    tableData = ingredients;
    mealTable = true;
  } else if (props.slice === 'day') {
    tableData = selectedMeals;
    console.log(selectedMeals)
    mealTable = false;
  } else {
    tableData = null;
    console.log('Invalid slice props');
  }

  const thElements = TABLE_HEADER.map((description) => (
    <th key={description}>{description}</th>
  ));

  const createRowElement = (rowData) => {
    // console.log('rowData');
    // console.log(rowData);
    let tdElements = [
      <td key="name">{rowData.name}</td>,
      <td key="weight">{mealTable ? rowData.weight: ''}</td>,
      <td key="action">
        <button>+</button>
        <button>-</button>
      </td>,
    ];

    const nutrition = rowData.nutrition;
    for (const key in nutrition) {
      tdElements.push(<td key={key}>{nutrition[key]}</td>);
    }
    
    console.log('tdElements');
    console.log(tdElements);
    return <tr key={rowData.id}>{tdElements}</tr>;
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

  const calculateTotals = (tableData) => {
    for (const i in tableData) {
      const rowData = tableData[i];
      for (const key in rowData.nutrition) {
        const prevTotal = totals[key];
        totals[key] = prevTotal + rowData.nutrition[key];
      }
    }
    return totals;
  };

  const addMealHandler = (event) => {
    event.preventDefault();
    let mealNameInput = document.getElementById('meal-name');

    console.log(totals);
    const meal = { name: mealNameInput.value, nutrition: totals };

    if (tableData.length > 0) {
      dispatch(dayActions.addToMeals(meal));
      dispatch(mealActions.reset());
      mealNameInput.value = '';
    }
  };

  const resetHandler = (event) => {
    event.preventDefault();

    return mealTable
      ? dispatch(mealActions.reset())
      : dispatch(dayActions.resetSelectedMeals());
  };

  let tableElements = [];

  if (tableData.length > 0) {
    tableElements = tableData.map((rowData) => {
      return createRowElement(rowData);
    });

    console.log('tableElements');
    console.log(tableElements);
    const totals = calculateTotals(tableData);
    const totalRowElement = createTotalRowElement(totals);
    tableElements.push(totalRowElement);
  }

  return (
    <div>
      {mealTable && (
        <div>
          <label htmlFor="meal-name">Meal Name:</label>
          <input type="text" id="meal-name"></input>
        </div>
      )}
      <table>
        <thead>
          <tr>{thElements}</tr>
        </thead>
        <tbody>{tableElements}</tbody>
      </table>
      {mealTable && <button onClick={addMealHandler}>Add Meal</button>}
      <button onClick={resetHandler}>Reset</button>
    </div>
  );
};
export default Table;
