import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dayActions } from "../store/day-slice";
import { mealActions } from "../store/meal-slice";

const Total = (props) => {
  const tableData = props.tableData;
  const dispatch = useDispatch();

  const calculateTotals = (init, data) => {
    let totals = init;
    
    for (const i in data) {
      const dataSet = data[i];

      for (const key in dataSet.nutrition) {
        const prevTotal = totals[key];
        totals[key] = prevTotal + dataSet.nutrition[key];
      }
    }

    return totals;
};

  const createTdElements = (init, data) => {
    let elements = init;

    for (const i in data) {
      elements.push(<td key={i}>{data[i]}</td>);
    }
    
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
  tableTotals = calculateTotals(tableTotals, tableData);

  let tdElements = [
    <td key="total">Total</td>,
    <td key="weight"></td>,
    <td key="action"></td>,
  ];
  tdElements = createTdElements(tdElements, tableTotals);

  useEffect(()=>{
    dispatch(mealActions.updateTotals(tableTotals));
  }, [tableTotals])

  return <tr key='totals'>{tdElements}</tr>;
};

export default Total;
