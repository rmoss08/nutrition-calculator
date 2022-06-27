import { useSelector } from 'react-redux';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from 'victory';

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
  // const mealTotals = useSelector((state) => state.meal.totals);
  const mealTotals = Object.assign(
    {},
    useSelector((state) => state.meal.totals)
  );

  let dailyValuePercentages = {};
  let chartData = [];

  if (Object.keys(mealTotals).length !== 0) {
    delete mealTotals.sugar_g;
    delete mealTotals.calories;
    delete mealTotals.protein_g;

    for (const i in mealTotals) {
      dailyValuePercentages[i] =
        (mealTotals[i] / NUTRITION_DAILY_VALUES[i]) * 100;
      chartData.push({
        // key: mealTotals,
        name: i,
        servingNutrition: mealTotals[i],
        dailyValue: NUTRITION_DAILY_VALUES[i],
        dailyValuePercentage: dailyValuePercentages[i],
      });
    }
  }

  console.log('chartData');
  console.log(chartData);

  return (
    <VictoryChart domainPadding={20}>
      <VictoryAxis tickValues={X_AXIS_VALUES} tickFormat={X_AXIS_LABELS} />
      <VictoryAxis dependentAxis />
      <VictoryBar
        horizontal={true}
        data={chartData}
        x={X_AXIS}
        y={Y_AXIS}
        label={({ datum }) =>
          `${datum.name}, DV %: ${datum.dailyValuePercentage}`
        }
        labelComponent={<VictoryTooltip />}
      />
    </VictoryChart>
  );
};

export default BarChart;
