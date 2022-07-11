import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mealActions } from '../../store/meal-slice';
import styles from './Total.module.css';

const Total = (props) => {
  const dispatch = useDispatch();

  const totalData = props.totalData;
  
  const calculateTotals = (initialTotal, dataToAdd) => {
    let totals = initialTotal;

    console.log(totals);
    for (const i in dataToAdd) {
      const ingredient = dataToAdd[i];
      
      for (const nutrient in ingredient.userNutrition) {
        const prevNutrientTotal = totals[nutrient];
        const newIngredient = ingredient.userNutrition[nutrient];
        totals[nutrient] = Number((prevNutrientTotal + newIngredient).toFixed(1));
      }
    }
    
    return totals;
  };

  const createTdElements = (initialTdElements, tdData) => {
    let tdElements = initialTdElements;

    for (const i in tdData) {
      tdElements.push(
        <td key={i} className="text-align-right">
          {tdData[i]}
        </td>
      );
    }

    return tdElements;
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

  let tdElements = [<td key="total">Total</td>, <td key="quantity"></td>];
  tdElements = createTdElements(tdElements, tableTotals);

  useEffect(() => {
    console.log(tableTotals);
    dispatch(mealActions.updateTotals(tableTotals));
  }, [tableTotals]);

  return (
    <tr key="totals" className={styles['total__tr']}>
      {tdElements}
    </tr>
  );
};

export default Total;
