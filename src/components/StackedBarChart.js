import { useSelector } from 'react-redux';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryStack,
} from 'victory';
import styles from './StackedBarChart.module.css';

const CHART_NUTRIENT_ORDER = [
  'potassium_mg',
  'sodium_mg',
  'cholesterol_mg',
  'fiber_g',
  'carbohydrates_total_g',
  'fat_saturated_g',
  'fat_total_g',
];
const NUTRITION_DAILY_VALUES = {
  fiber_g: 25,
  sodium_mg: 2500,
  potassium_mg: 4700,
  fat_saturated_g: 20,
  fat_total_g: 65,
  cholesterol_mg: 300,
  carbohydrates_total_g: 300,
};
const NUTRITION_DETAILS = {
  fiber_g: { formattedName: 'Fiber', unit: 'g' },
  sodium_mg: { formattedName: 'Sodium', unit: 'mg' },
  potassium_mg: { formattedName: 'Potassium', unit: 'mg' },
  fat_saturated_g: { formattedName: 'Saturated Fat', unit: 'g' },
  fat_total_g: { formattedName: 'Total Fat', unit: 'g' },
  cholesterol_mg: { formattedName: 'Cholesterol', unit: 'mg' },
  carbohydrates_total_g: { formattedName: 'Carbohydrates', unit: 'g' },
};
const X_AXIS_LABELS = [
  'Potassium',
  'Sodium',
  'Cholesterol',
  'Fiber',
  'Carbohydrates',
  'Saturated Fat',
  'Total Fat',
];
const X_AXIS_VALUES = [1, 2, 3, 4, 5, 6, 7];
const FONT_FAMILY = 'Arial, Helvetica, sans-serif';
const GENERAL_FONT_SIZE = 8;

const StackedBarChart = () => {
  const userTotals = Object.assign(
    {},
    useSelector((state) => state.meal.totals)
  );

  const removeUnnecessaryNutrients = (nutrition, unnecessaryNutritents) => {
    for (const i in unnecessaryNutritents) {
      const nutrient = unnecessaryNutritents[i];
      delete nutrition[nutrient];
    }
    return nutrition;
  };

  const createTooltipLabel2 = (
    stackType,
    nutrientTotal,
    nutrientDailyValuePercentage
  ) => {
    if (stackType === 'user') {
      return `${nutrientTotal}\n${nutrientDailyValuePercentage}% of DV`;
    } else if (stackType === 'dailyValue') {
      return `${nutrientTotal}\n${nutrientDailyValuePercentage}% of DV`;
    } else {
      console.error('Invalid type argument passed to createTooltipLabel');
    }
  };

  const calculcateDailyValuePercentage = (nutrientName, nutrientTotal) => {
    const nutrientDailyValue = NUTRITION_DAILY_VALUES[nutrientName];
    const nutrientDailyValuePercentage = Number(
      ((nutrientTotal / nutrientDailyValue) * 100).toFixed(1)
    );
    return nutrientDailyValuePercentage;
  };

  const createStackData = (rawData, stackType) => {
    let stack = [];
    for (const i in CHART_NUTRIENT_ORDER){
      const nutrient = CHART_NUTRIENT_ORDER[i];
      console.log(nutrient);
      const nutrientDailyValuePercentage = calculcateDailyValuePercentage(
        nutrient,
        rawData[nutrient]
      );

      stack.push({
        x: nutrient,
        y:nutrientDailyValuePercentage,
        label: createTooltipLabel2(
          stackType,
          `${rawData[nutrient]} ${NUTRITION_DETAILS[nutrient].unit}`,
          nutrientDailyValuePercentage
        ),
      });
    }

    return stack;
  };

  const calculateOutstandingDailyValues = (consumedNutrients, dailyValues) => {
    let outstandingDailyValues = {};

    for (const nutrient in consumedNutrients) {
      const nutrientsOutstandingDailyValue =
        dailyValues[nutrient] - consumedNutrients[nutrient];
      outstandingDailyValues[nutrient] = nutrientsOutstandingDailyValue;
    }

    return outstandingDailyValues;
  };

  const necessaryUserTotals = removeUnnecessaryNutrients(userTotals, [
    'sugar_g',
    'calories',
    'protein_g',
  ]);
  const outstandingDailyValues = calculateOutstandingDailyValues(
    necessaryUserTotals,
    NUTRITION_DAILY_VALUES
  );

  let chartData = [];
  chartData.push(createStackData(necessaryUserTotals, 'user'));
  chartData.push(createStackData(outstandingDailyValues, 'dailyValue'));

  return (
    <div className={styles['stacked-bar-chart']}>
      <VictoryChart
        domainPadding={20}
        padding={{ left: 80, right: 20, top: 20, bottom: 55 }}
      >
        <VictoryStack
          colorScale={['#348850', 'grey']}
          style={{
            labels: {
              fontFamily: FONT_FAMILY,
              fontSize: GENERAL_FONT_SIZE,
            },
          }}
        >
          {chartData.map((data, i) => {
            return (
              <VictoryBar
                data={data}
                key={i}
                horizontal={true}
                labelComponent={
                  <VictoryTooltip
                    constrainToVisibleArea
                    cornerRadius={5}
                    flyoutPadding={5}
                    flyoutStyle={{ stroke: '#348850' }}
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: GENERAL_FONT_SIZE,
                    }}
                  />
                }
              />
            );
          })}
        </VictoryStack>
        <VictoryAxis
          tickValues={X_AXIS_VALUES}
          tickFormat={X_AXIS_LABELS}
          style={{
            tickLabels: {
              fontFamily: FONT_FAMILY,
              fontSize: GENERAL_FONT_SIZE,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          label="Recommended Daily Value (DV)"
          tickFormat={(tick) => `${tick}%`}
          style={{
            axisLabel: {
              fontFamily: FONT_FAMILY,
              fontSize: 10,
              padding: 35,
            },
            tickLabels: {
              fontFamily: FONT_FAMILY,
              fontSize: GENERAL_FONT_SIZE,
            },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default StackedBarChart;