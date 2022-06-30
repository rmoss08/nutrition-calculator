import { useSelector } from 'react-redux';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryStack,
} from 'victory';
import styles from './BarChart.module.css';

const NUTRITION_DAILY_VALUES = {
  fiber_g: 25,
  sodium_mg: 2500,
  potassium_mg: 4700,
  fat_saturated_g: 20,
  fat_total_g: 65,
  cholesterol_mg: 300,
  carbohydrates_total_g: 300,
};

const TESTING_DATA = [
  { name: 'fiber_g', value: 25 },
  { name: 'sodium_mg', value: 2500 },
  { name: 'potassium_mg', value: 4700 },
  { name: 'fat_saturated_g', value: 20 },
  { name: 'fat_total_g', value: 65 },
  { name: 'cholesterol_mg', value: 300 },
  { name: 'carbohydrates_total_g', value: 300 },
];

const X_AXIS = 'name';
const Y_AXIS = 'dailyValuePercentage';

const X_AXIS_LABELS = [
  'Fiber',
  'Sodium',
  'Potassium',
  'Saturated Fat',
  'Total Fat',
  'Cholesterol',
  'Carbohydrates',
];

const X_AXIS_VALUES = [1, 2, 3, 4, 5, 6, 7];

const BarChart = (props) => {
  // const userTotals = useSelector((state) => state.meal.totals);
  const userTotals = Object.assign(
    {},
    useSelector((state) => state.meal.totals)
  );

  const calculateNutritionPercentages = (nutrientName, userNutrientValue) => {
    const userNutrientPercentage =
      (userNutrientValue / NUTRITION_DAILY_VALUES[nutrientName]) * 100;

    let dailyValueNutrientPercentage;
    if (userNutrientPercentage < 100) {
      dailyValueNutrientPercentage = 100 - userNutrientPercentage;
    } else {
      dailyValueNutrientPercentage = 0;
    }

    return {
      user: userNutrientPercentage,
      dailyValue: dailyValueNutrientPercentage,
    };
  };

  // let chartData = [];
  // if (Object.keys(userTotals).length !== 0) {
  //   delete userTotals.sugar_g;
  //   delete userTotals.calories;
  //   delete userTotals.protein_g;

  //   for (const nutrient in userTotals) {
  //     chartData.push({
  //       nutrientName: nutrient,
  //       userTotal: userTotals[nutrient],
  //       dailyValue: NUTRITION_DAILY_VALUES[nutrient],
  //       nutritionPercentages: calculateNutritionPercentages(nutrient, userTotals[nutrient]),
  //     });
  //   }
  // }
  let chartData = [];
  if (Object.keys(userTotals).length !== 0) {
    delete userTotals.sugar_g;
    delete userTotals.calories;
    delete userTotals.protein_g;

    const userChartData = [];
    const dailyValueChartData = [];
    for (const nutrient in userTotals) {
      const nutrientPercentages = calculateNutritionPercentages(
        nutrient,
        userTotals[nutrient]
      );

      userChartData.push({ x: nutrient, y: nutrientPercentages.user });
      dailyValueChartData.push({
        x: nutrient,
        y: nutrientPercentages.dailyValue,
      });
    }
    chartData.push(userChartData, dailyValueChartData);
  }

  return (
    <div className={styles.barchart}>
      <VictoryChart
        domainPadding={20}
        padding={{ left: 120, right: 10, top: 10, bottom: 35 }}
      >
        <VictoryStack colorScale={['#348850', 'grey']}>
          {chartData.map((data, i) => {
            return <VictoryBar data={data} key={i} horizontal={true} />;
          })}
        </VictoryStack>
        <VictoryAxis tickValues={X_AXIS_VALUES} tickFormat={X_AXIS_LABELS} />
        <VictoryAxis dependentAxis />
      </VictoryChart>
    </div>
  );
};

export default BarChart;
