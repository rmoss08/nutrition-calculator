import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mealActions } from '../../store/meal-slice';
import styles from './Total.module.css';
import { createTdElement } from './Row';
import { TABLE_NUTRIENT_ORDER } from '../../pages/Home';

const Total = (props) => {
  const totalData = props.totalData;

  const dispatch = useDispatch();

  const calculateTotals = (initialTotal, dataToAdd) => {
    let totals = initialTotal;

    for (const i in dataToAdd) {
      const ingredient = dataToAdd[i];

      for (const nutrient in ingredient.userNutrition) {
        const prevNutrientTotal = totals[nutrient];
        const newIngredient = ingredient.userNutrition[nutrient];
        totals[nutrient] = Number(
          (prevNutrientTotal + newIngredient).toFixed(2)
        );
      }
    }

    return totals;
  };

  const createTotalElements = (tdData) => {
    let elements = [
      <th key="total" className={`text-align-left ${styles['total__cell']}`}>
        Total
      </th>,
      <td key="quantity" className={styles['total__cell']}></td>,
    ];

    for (const i in TABLE_NUTRIENT_ORDER) {
      const nutrient = TABLE_NUTRIENT_ORDER[i];

      elements.push(
        createTdElement(
          `${nutrient}-total`,
          `text-align-right ${styles['total__cell']}`,
          tdData[nutrient]
        )
      );
    }

    elements.push(
      <td key="remove-button-total" className="total__cell--remove-button"></td>
    );

    return elements;
  };

  let tableTotals = {
    ENERC_KCAL: 0,
    FAT: 0,
    CHOCDF: 0,
    FIBTG: 0,
    PROCNT: 0,
  };
  tableTotals = calculateTotals(tableTotals, totalData);

  useEffect(() => {
    dispatch(mealActions.updateTotals(tableTotals));
  }, [tableTotals]);

  const totalElements = createTotalElements(tableTotals);

  return (
    <tr key="totals" className={styles['total__tr']}>
      {totalElements}
    </tr>
  );
};

export default Total;
