import { useDispatch, useSelector } from 'react-redux';
import { mealActions } from '../store/meal-slice';
import Total from './Total';
import Row from './Row';
import styles from './Table.module.css';
import { useCallback, useEffect, useMemo } from 'react';

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
  useMemo(() => {
    if (tableData.length > 0) {
      tbodyElements = tableData.map((rowData) => <Row tdData={rowData} />);
      tbodyElements.push(<Total tableData={tableData} />);
    }
  }, [tableData]);

  return (
    <div>
      <table>
        <thead>
          <tr className={styles['table-header']}>{thElements}</tr>
        </thead>
        <tbody>{tbodyElements}</tbody>
      </table>
      <button onClick={resetHandler}>Reset</button>
    </div>
  );
};
export default Table;
