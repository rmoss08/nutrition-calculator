import { useDispatch, useSelector } from 'react-redux';
import { mealActions } from '../store/meal-slice';
import Total from './Total';
import Row from './Row';

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
  const tableData = useSelector((state) => state.meal.ingredients);

  const resetHandler = (event) => {
    event.preventDefault();

    return dispatch(mealActions.reset());
  };
  
  
  const thElements = TABLE_HEADER.map((description) => (
    <th key={description}>{description}</th>
  ));
  
  let tbodyElements = [];
  if (tableData.length > 0) {
    tbodyElements = tableData.map((rowData) => <Row tdData={rowData} />);
    tbodyElements.push(<Total tableData={tableData} />);
  }

  return (
    <div>
        {/* <div>
          <label htmlFor="meal-name">Meal Name:</label>
          <input type="text" id="meal-name"></input>
        </div> */}
      <table>
        <thead>
          <tr>{thElements}</tr>
        </thead>
        <tbody>{tbodyElements}</tbody>
      </table>
      <button onClick={resetHandler}>Reset</button>
    </div>
  );
};
export default Table;
