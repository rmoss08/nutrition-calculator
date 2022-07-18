import QuantityForm from './QuantityForm';
import RemoveButton from './RemoveButton';
import styles from './Row.module.css';
import { TABLE_NUTRIENT_ORDER } from '../../pages/Home';

export const createTdElement = (key, classes, content) => {
  return (
    <td key={key} className={classes}>
      {content.toFixed(2)}
    </td>
  );
};

const Row = (props) => {
  const rowData = props.rowData;

  const createRowElements = (tdData) => {
    let elements = [
      <th
        key={`name-${tdData.id}`}
        className={`text-align-left ${styles['row__header']}`}
      >
        {tdData.name}
      </th>,
      <td key={`action-${tdData.id}`} className="flex-center-all">
        <QuantityForm ingredient={tdData} placeholder={tdData.userQuantity_g} />
      </td>,
    ];

    const userNutrition = tdData.userNutrition;
    
    for (const i in TABLE_NUTRIENT_ORDER) {
      const nutrient = TABLE_NUTRIENT_ORDER[i];
      console.log(nutrient)
      
      elements.push(
        createTdElement(
          `${nutrient}-${tdData.id}`,
          'text-align-right',
          userNutrition[nutrient]
        )
      );
    }

    elements.push(
      <td key={`remove-${tdData.id}`}>
        <RemoveButton id={tdData.id} />
      </td>
    );

    return elements;
  };

  const rowElements = createRowElements(rowData);

  return <tr key={rowData.id}>{rowElements}</tr>;
};

export default Row;
