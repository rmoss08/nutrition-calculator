import { useSelector } from 'react-redux';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

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
const Y_AXIS = 'value';

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
  // const userDailyTotal = useSelector(state => state.day.totals);

  // delete userDailyTotal.sugar_g;
  // delete userDailyTotal.calories;
  // delete userDailyTotal.protein_g;

  // const createChartData = () => {
  //   let data = [];
  //   for (const i in NUTRITION_DAILY_VALUES) {
  //     const nutrition = {
  //       name: NUTRITION_DAILY_VALUES[i],
  //       userTotal: userDailyTotal[i],
  //       dailyValue: NUTRITION_DAILY_VALUES[i],
  //     };
  //     const percentage = nutrition.userTotal / nutrition.dailyValue;
  //     nutrition.percentage = percentage;
  //   }

  //   return data;
  // };

  // const chartData = createChartData();
  // console.log(chartData);

  return (
    <VictoryChart domainPadding={20}>
      <VictoryAxis tickValues={X_AXIS_VALUES} tickFormat={X_AXIS_LABELS} />
      <VictoryAxis dependentAxis />
      <VictoryBar horizontal={true} data={TESTING_DATA} x={X_AXIS} y={Y_AXIS} />
    </VictoryChart>
  );
};

export default BarChart;
