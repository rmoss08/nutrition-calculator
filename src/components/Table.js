import { useDispatch, useSelector } from 'react-redux';
import { mealActions } from '../store/meal-slice';
import Total from './Total';
import Row from './Row';
import styles from './Table.module.css';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

const TABLE_HEADER = [
  'Ingredient',
  'Weight',
  'Actions',
  'Sugar',
  'Fiber',
  'Sodium',
  'Potassium',
  'Saturated Fat',
  'Total Fat',
  'Calories',
  'Cholesterol',
  'Protein',
  'Carbohydrate',
];

const Table = (props) => {
  const tableData = useSelector((state) => state.meal.ingredients);

  const thElements = TABLE_HEADER.map((description) => (
    <th key={description}>{description}</th>
  ));

  // React forgets tbodyElements whenever App re-renders
  // let tbodyElements = [];
  // useMemo(() => {
  //   console.log('useMemo');
  //   if (tableData.length > 0) {
  //     tbodyElements = tableData.map((rowData) => (
  //       <Row key={rowData.id} tdData={rowData} />
  //     ));
  //     tbodyElements.push(<Total key='total' tableData={tableData} />);
  //   }
  // }, [tableData]);

  let tbodyElements = [];
  tbodyElements = useMemo(() => {
    if (tableData.length > 0) {
      let elements = tableData.map((rowData) => (
        <Row key={rowData.id} tdData={rowData} />
      ));
      elements.push(<Total key="total" tableData={tableData} />);
      return elements;
    }
  }, [tableData]);

  // Creates an infinite loop for some reason
  // const [tbodyElements, setTbodyElements] = useState([]);

  // if (tableData.length > 0) {
  //   setTbodyElements((prevState) => {
  //     const newState = tableData.map((rowData) => <Row tdData={rowData} />);
  //     newState.push(<Total tableData={tableData} />);
  //     return newState;
  //   });
  // }

  return (
    <div>
      <table>
        <thead>
          <tr className={styles['table-header']}>{thElements}</tr>
        </thead>
        <tbody>{tbodyElements}</tbody>
      </table>
    </div>
  );
};
export default Table;
