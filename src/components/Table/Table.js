import { useSelector } from 'react-redux';
import Total from './Total';
import Row from './Row';
import styles from './Table.module.css';
import { useMemo } from 'react';
import Tip from '../Tip.js';

const QUANTITY_TIP_MESSAGE = (
  <p className={styles['tip-message__p']}>
    Change an ingredient's quantity by entering a new value and pressing the
    re-calculate button.
    <br />
    <br />
    Remove an ingredient by clicking the delete button on the far right of the
    table.
  </p>
);

const TABLE_COLUMN_NAMES = [
  'Ingredient',
  <div>
    Quantity
    <Tip message={QUANTITY_TIP_MESSAGE} />
  </div>,
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

const Table = () => {
  const ingredients = useSelector((state) => state.meal.ingredients);

  const thElements = TABLE_COLUMN_NAMES.map((description) => (
    <th key={description} className={styles['table__th']}>
      {description}
    </th>
  ));

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
          <tr className={styles['table__header']}>{thElements}</tr>
        </thead>
        <tbody>{tbodyElements}</tbody>
      </table>
    </div>
  );
};
export default Table;
