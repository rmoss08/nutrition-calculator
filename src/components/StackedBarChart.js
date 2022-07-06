import { useSelector } from 'react-redux';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryStack,
} from 'victory';
import styles from './StackedBarChart.module.css';

const NUTRITION_DAILY_VALUES = {
  fiber_g: 25,
  sodium_mg: 2500,
  potassium_mg: 4700,
  fat_saturated_g: 20,
  fat_total_g: 65,
  cholesterol_mg: 300,
  carbohydrates_total_g: 300,
};

const NUTRITION_TOOLTIP_INFO = {
  fiber_g: { formattedName: 'Fiber', unit: 'g' },
  sodium_mg: { formattedName: 'Sodium', unit: 'mg' },
  potassium_mg: { formattedName: 'Potassium', unit: 'mg' },
  fat_saturated_g: { formattedName: 'Saturated Fat', unit: 'g' },
  fat_total_g: { formattedName: 'Total Fat', unit: 'g' },
  cholesterol_mg: { formattedName: 'Cholesterol', unit: 'mg' },
  carbohydrates_total_g: { formattedName: 'Carbohydrates', unit: 'g' },
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

const CHART_FONT_FAMILY = 'Arial, Helvetica, sans-serif';

const StackedBarChart = (props) => {
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

  const calculateNutritionPercentages = (nutrientName, userNutrientValue) => {
    const recommendedNutrientDailyValue = NUTRITION_DAILY_VALUES[nutrientName];
    const userNutrientPercentage = Number(
      ((userNutrientValue / recommendedNutrientDailyValue) * 100).toFixed(1)
    );

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

  const createTooltipLabel = (type, nutrient, nutrition, dvPercentages) => {
    let tooltipTitle, tooltipDVPercentage, tooltipNutrientValue;
    if (type === 'user') {
      tooltipTitle = 'Your Meal:';
      tooltipNutrientValue = nutrition[nutrient];
      tooltipDVPercentage = `\n${dvPercentages[type]}%`;
    } else if (type === 'dailyValue') {
      tooltipTitle = 'Recomended\nDaily Value:';
      tooltipNutrientValue = NUTRITION_DAILY_VALUES[nutrient]
      tooltipDVPercentage = '';
    } else {
      console.error('Invalid type argument passed to createTooltipLabel');
    }

    return `${tooltipTitle}\n${tooltipNutrientValue}${NUTRITION_TOOLTIP_INFO[nutrient].unit}${tooltipDVPercentage}`;
  };

  // This could likely be broken up into two function
  const prepareStackedBarChartData = (rawChartData) => {
    let stack_1 = [];
    let stack_2 = [];

    for (const nutrient in rawChartData) {
      const nutrientPercentages = calculateNutritionPercentages(
        nutrient,
        rawChartData[nutrient]
      );

      stack_1.push({
        x: nutrient,
        y: nutrientPercentages.user,
        label: createTooltipLabel(
          'user',
          nutrient,
          rawChartData,
          nutrientPercentages
        ),
      });
      stack_2.push({
        x: nutrient,
        y: nutrientPercentages.dailyValue,
        label: createTooltipLabel(
          'dailyValue',
          nutrient,
          rawChartData,
          nutrientPercentages
        ),
      });
    }

    return [stack_1, stack_2];
  };

  let chartData = [];
  if (Object.keys(userTotals).length !== 0) {
    const chartUserTotals = removeUnnecessaryNutrients(userTotals, [
      'sugar_g',
      'calories',
      'protein_g',
    ]);

    // Must be an array
    chartData = prepareStackedBarChartData(chartUserTotals);
  }

  // Could refactor by making fontFamily a constant
  return (
    <div className={styles.barchart}>
      <VictoryChart
        domainPadding={20}
        padding={{ left: 110, right: 10, top: 10, bottom: 55 }}
      >
        <VictoryStack
          colorScale={['#348850', 'grey']}
          style={{
            labels: {
              fontFamily: CHART_FONT_FAMILY,
              fontSize: 20,
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
                    flyoutPadding={5}
                    style={{
                      fontFamily: CHART_FONT_FAMILY,
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
          style={{ tickLabels: { fontFamily: CHART_FONT_FAMILY } }}
        />
        <VictoryAxis
          dependentAxis
          label="Recommended Daily Value"
          tickFormat={(tick) => `${tick}%`}
          style={{
            axisLabel: {
              fontFamily: CHART_FONT_FAMILY,
              fontSize: 16,
              padding: 35,
            },
            tickLabels: { fontFamily: CHART_FONT_FAMILY },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default StackedBarChart;
