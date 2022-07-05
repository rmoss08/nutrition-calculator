import { useSelector } from 'react-redux';
import Total from './Total';
import Row from './Row';
import styles from './Table.module.css';
import { useMemo } from 'react';

const TABLE_HEADER = [
  'Ingredient',
  'Weight',
  'Sugar\n(g)',
  'Fiber\n(g)',
  'Sodium\n(mg)',
  'Potassium\n(mg)',
  'Saturated Fat\n(g)',
  'Total Fat\n(g)',
  'Calories',
  'Cholesterol\n(mg)',
  'Protein\n(g)',
  'Carbohydrates\n(g)',
];

const Table = (props) => {
  const tableData = useSelector((state) => state.meal.ingredients);

  const thElements = TABLE_HEADER.map((description) => (
    <th key={description} className={styles['table-header__column-name']}>{description}</th>
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
