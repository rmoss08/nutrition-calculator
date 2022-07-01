import QuantityInput from './QuantityInput';
import RemoveIngredientButton from './RemoveIngredientButton';
import styles from './Row.module.css';

const Row = (props) => {
  const createTdElements = (tdData) => {
    let elements = [
      <td key={`name-${tdData.id}`} className={styles['row-name']}>
        {tdData.name}
      </td>,
      <td key={`weight-${tdData.id}`} className="text-align-right">
        {tdData.userQuantity_g}
      </td>,
      <td key={`action-${tdData.id}`}>
        <QuantityInput ingredient={tdData} />
      </td>,
    ];

    const userNutrition = tdData.userNutrition;
    for (const key in userNutrition) {
      elements.push(
        <td key={`${key}-${tdData.id}`} className="text-align-right">
          {userNutrition[key]}
        </td>
      );
    }

    elements.push(
      <td key={`remove-${tdData.id}`}>
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
