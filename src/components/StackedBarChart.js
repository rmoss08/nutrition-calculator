import { useSelector } from 'react-redux';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryStack,
} from 'victory';
import styles from './StackedBarChart.module.css';

const CHART_NUTRIENT_ORDER = ['FIBTG', 'CHOCDF','FAT'];
const NUTRITION_DAILY_VALUES = {
  FAT: 65,
  CHOCDF: 300,
  FIBTG: 25,
};
const NUTRITION_DETAILS = {
  FAT: { formattedName: 'Total Fat', unit: 'g' },
  CHOCDF: { formattedName: 'Carbohydrates', unit: 'g' },
  FIBTG: { formattedName: 'Fiber', unit: 'g' },
};
const X_AXIS_LABELS = ['Fiber', 'Carbohydrates','Total Fat'];
const X_AXIS_VALUES = [1, 2, 3];
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

  const createTooltipLabel = (
    stackType,
    nutrient,
    total,
    unit,
    dailyValuePercentage
  ) => {
    const formattedTotal = total.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedDailyValuePercentage = dailyValuePercentage.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ','
    );
    const formattedDailyValueTotal = NUTRITION_DAILY_VALUES[nutrient]
      .toFixed(1)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (stackType === 'user') {
      return `Your Meal:\n${formattedTotal} ${unit}\n${formattedDailyValuePercentage}% of DV`;
    } else if (stackType === 'dailyValue') {
      return `Daily Value:\n${formattedDailyValueTotal} ${unit}`;
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
    for (const i in CHART_NUTRIENT_ORDER) {
      const nutrient = CHART_NUTRIENT_ORDER[i];
      const nutrientDailyValuePercentage = calculcateDailyValuePercentage(
        nutrient,
        rawData[nutrient]
      );

      stack.push({
        x: nutrient,
        y: nutrientDailyValuePercentage,
        label: createTooltipLabel(
          stackType,
          nutrient,
          rawData[nutrient].toFixed(1),
          NUTRITION_DETAILS[nutrient].unit,
          nutrientDailyValuePercentage.toFixed(1)
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

      if (nutrientsOutstandingDailyValue < 0) {
        outstandingDailyValues[nutrient] = 0;
      } else {
        outstandingDailyValues[nutrient] = nutrientsOutstandingDailyValue;
      }
    }

    return outstandingDailyValues;
  };

  const necessaryUserTotals = removeUnnecessaryNutrients(userTotals, [
    'PROCNT',
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
          tickFormat={(tick) => `${tick}.0%`}
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
