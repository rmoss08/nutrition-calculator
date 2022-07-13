import QuantityInput from './QuantityInput';
import RemoveButton from './RemoveButton';
import styles from './Row.module.css';

const Row = (props) => {
  const rowData = props.rowData;

  const createTdElements = (tdData) => {
    let elements = [
      <td key={`name-${tdData.id}`} className={styles['row__name']}>
        {tdData.name}
      </td>,
      <td key={`action-${tdData.id}`} className="flex-center-all">
        <QuantityInput
          ingredient={tdData}
          placeholder={tdData.userQuantity_g}
        />
      </td>,
    ];

    const userNutrition = tdData.userNutrition;
    for (const nutrient in userNutrition) {
      elements.push(
        <td key={`${nutrient}-${tdData.id}`} className="text-align-right">
          {userNutrition[nutrient]}
        </td>
      );
    }

    elements.push(
      <td key={`remove-${tdData.id}`}>
        <RemoveButton id={tdData.id} />
      </td>
    );
    
    return elements;
  };

  const tdElements = createTdElements(rowData);

  return <tr key={rowData.id}>{tdElements}</tr>;
};

export default Row;
