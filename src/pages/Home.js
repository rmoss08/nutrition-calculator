import { lazy, Suspense, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StackedBarChart from '../components/StackedBarChart';
import IngredientForm from '../components/Forms/IngredientForm';
import { Fragment } from 'react';
import { mealActions } from '../store/meal-slice';
import Layout from '../components/Layout';
import styles from './Home.module.css';
import InformationButton from '../components/Buttons/InformationButton';
import LoadingSpinner from '../components/LoadingSpinner';
import ServingForm from '../components/Forms/ServingForm';
import { calculateWeightedNutrition } from '../components/Forms/IngredientForm';

const LazyTable = lazy(() => import('../components/Table/Table'));

const QUANTITY_INFORMATION = (
  <p className={styles['information-button__p']}>
    Change an ingredient's quantity by entering a new value and pressing the
    re-calculate button.
    <br />
    <br />
    Remove an ingredient by clicking the remove button on the far right of the
    table.
  </p>
);

export const TABLE_NUTRIENT_ORDER = [
  'calories',
  'fat_total_g',
  'fat_saturated_g',
  'carbohydrates_total_g',
  'fiber_g',
  'sugar_g',
  'protein_g',
  'cholesterol_mg',
  'sodium_mg',
  'potassium_mg',
];

const TABLE_COLUMN_NAMES = [
  'Ingredient',
  <div className={styles['table__th--quantity']}>
    Quantity
    <InformationButton message={QUANTITY_INFORMATION} />
  </div>,
  'Calories',
  'Total Fat\n(g)',
  'Saturated Fat\n(g)',
  'Carbohydrates\n(g)',
  'Fiber\n(g)',
  'Sugar\n(g)',
  'Protein\n(g)',
  'Cholesterol\n(mg)',
  'Sodium\n(mg)',
  'Potassium\n(mg)',
];

const Home = () => {
  const [showStackedBarChart, setShowStackedBarChart] = useState(false);
  const [showLazyTable, setShowLazyTable] = useState(false);

  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.meal.ingredients);
  const servingSize = useSelector((state) => state.meal.servingSize);

  const resetMealClickHandler = (event) => {
    event.preventDefault();

    setShowStackedBarChart(false);
    setShowLazyTable(false);
    dispatch(mealActions.reset());
  };

  const showChartClickHandler = (event) => {
    event.preventDefault();

    return setShowStackedBarChart((prevState) => {
      return !prevState;
    });
  };

  const recalculateMealNutrition = (meal, servingSize) => {
    for (const i in meal) {
      const ingredient = meal[i];
      const newUserNutrition = calculateWeightedNutrition(
        ingredient,
        servingSize
      );
      return dispatch(
        mealActions.updateUserNutrition({ id: ingredient.id, newUserNutrition })
      );
    }
  };
  
  const numberOfIngredients = ingredients.length;
  useMemo(() => {
    if (numberOfIngredients > 0) {
      setShowLazyTable(true);
    } else {
      setShowLazyTable(false);
    }
  }, [numberOfIngredients]);
  
  useMemo(() => {
    recalculateMealNutrition(ingredients, servingSize);
  }, [servingSize]);

  return (
    <Fragment>
      <Layout>
        <div className="page-subsection">
          <h2 className="page-subsection__header">
            Calculate Your Meal's Nutrition
          </h2>
          <p>Start by adding an ingredient.</p>
          <IngredientForm />
        </div>
        {!showLazyTable && (
          <div className={`page-subsection ${styles['table-placeholder']}`}>
            <p>Waiting for your first ingredient</p>
            <div
              className={`flex-center-all ${styles['table-placeholder__ellipses']}`}
            >
              <div className={styles['table-placeholder__dot']}></div>
              <div className={styles['table-placeholder__dot']}></div>
              <div className={styles['table-placeholder__dot']}></div>
            </div>
          </div>
        )}
        {showLazyTable && (
          <Suspense fallback={<LoadingSpinner />}>
            <div className="page-subsection">
              <h2 className="page-subsection__header">Meal Nutrition</h2>
              <ServingForm />
              <LazyTable thData={TABLE_COLUMN_NAMES} tbodyData={ingredients} />
              <div className={styles['table__menu']}>
                <button
                  className="page-subsection__button"
                  title="Toggle display of the chart"
                  onClick={showChartClickHandler}
                >
                  <span className="material-symbols-outlined">bar_chart</span>
                </button>
                <button
                  className="page-subsection__button--dark-red page-subsection__button "
                  title="Reset your meal"
                  onClick={resetMealClickHandler}
                >
                  Reset
                </button>
              </div>
            </div>
          </Suspense>
        )}
        {showStackedBarChart && (
          <div className="page-subsection">
            <h2 className="page-subsection__header">
              Recommended Daily Value Comparison
            </h2>
            <StackedBarChart />
            <p className="fine-print">
              <i>
                Note: recommended daily values come from the{' '}
                <a
                  className="hyperlink"
                  href="https://www.canada.ca/en/health-canada/services/understanding-food-labels/percent-daily-value.html"
                >
                  Government of Canada
                </a>
              </i>
            </p>
          </div>
        )}
      </Layout>
    </Fragment>
  );
};

export default Home;
