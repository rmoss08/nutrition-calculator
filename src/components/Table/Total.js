import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mealActions } from '../../store/meal-slice';
import styles from './Total.module.css';
import { createTdElement } from './Row';

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

    for (const i in tdData) {
      elements.push(
        createTdElement(
          `${i}-total`,
          `text-align-right ${styles['total__cell']}`,
          tdData[i]
        )
      );
    }

    elements.push(
      <td key="remove-button-total" className="total__cell--remove-button"></td>
    );

    return elements;
  };

  let tableTotals = {
    sugar_g: 0,
    fiber_g: 0,
    sodium_mg: 0,
    potassium_mg: 0,
    fat_saturated_g: 0,
    fat_total_g: 0,
    calories: 0,
    cholesterol_mg: 0,
    protein_g: 0,
    carbohydrates_total_g: 0,
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
