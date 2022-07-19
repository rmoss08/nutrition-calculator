import Total from './Total';
import Row from './Row';
import styles from './Table.module.css';
import { useMemo } from 'react';
import Header from './Header';

const Table = (props) => {
  const ingredients = props.tbodyData;

  let tbodyContent = [];
  tbodyContent = useMemo(() => {
    return ingredients.map((ingredient) => (
      <Row key={ingredient.id} rowData={ingredient} />
    ));
  }, [ingredients]);

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <Header thData={props.thData} />
        </thead>
        <tbody>{tbodyContent}</tbody>
        <tfoot>
          <Total key="total" totalData={ingredients} />
        </tfoot>
      </table>
    </div>
  );
};
export default Table;
