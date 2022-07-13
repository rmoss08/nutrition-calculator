import { useSelector } from 'react-redux';
import Total from './Total';
import Row from './Row';
import styles from './Table.module.css';
import { useMemo } from 'react';
import InformationButton from '../InformationButton.js';
import Header from './Header';

const Table = (props) => {
  const ingredients = useSelector((state) => state.meal.ingredients);

  let tbodyElements = [];
  tbodyElements = useMemo(() => {
    let elements = ingredients.map((ingredient) => (
      <Row key={ingredient.id} rowData={ingredient} />
    ));
    elements.push(<Total key="total" totalData={ingredients} />);
    return elements;
  }, [ingredients]);

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <Header thData={props.thData} />
        </thead>
        <tbody>{tbodyElements}</tbody>
      </table>
    </div>
  );
};
export default Table;
