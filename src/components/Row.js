import QuantityInput from './QuantityInput';
import RemoveIngredientButton from './RemoveIngredientButton';
import styles from './Row.module.css';

const Row = (props) => {
  const createTdElements = (tdData) => {
    let elements = [
      <td key="name" className={styles['row-name']}>
        {tdData.name}
      </td>,
      <td key="weight" className="text-align-right">
        {tdData.userQuantity_g}
      </td>,
      <td key="action">
        <QuantityInput ingredient={tdData} />
        {/* <button className={`${styles['quantity-button']} ${styles.add}`}>
          +
        </button>
        <button className={`${styles['quantity-button']} ${styles.subtract}`}>-</button> */}
      </td>,
    ];

    const userNutrition = tdData.userNutrition;
    for (const key in userNutrition) {
      elements.push(
        <td key={key} className="text-align-right">
          {userNutrition[key]}
        </td>
      );
    }

    elements.push(
      <td>
        <RemoveIngredientButton ingredientId={tdData.id} />
      </td>
    );

    return elements;
  };

  // let tdElements = []
  const tdElements = createTdElements(props.tdData);

  return <tr key={props.tdData.id}>{tdElements}</tr>;
};

export default Row;
