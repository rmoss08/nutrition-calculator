import { lazy, Suspense, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StackedBarChart from '../components/StackedBarChart';
import IngredientForm from '../components/IngredientForm';
import { Fragment } from 'react';
import { mealActions } from '../store/meal-slice';
import Layout from '../components/Layout';
import styles from './Home.module.css';
import InformationButton from '../components/InformationButton';
import LoadingSpinner from '../components/LoadingSpinner';

const LazyTable = lazy(() => import('../components/Table/Table'));

const QUANTITY_INFORMATION = (
  <p className={styles['tip-message__p']}>
    Change an ingredient's quantity by entering a new value and pressing the
    re-calculate button.
    <br />
    <br />
    Remove an ingredient by clicking the remove button on the far right of the
    table.
  </p>
);

const TABLE_COLUMN_NAMES = [
  'Ingredient',
  <div className={styles['table__th--quantity']}>
    Quantity
    <InformationButton message={QUANTITY_INFORMATION} />
  </div>,
  'Sugar\n(g)',
  'Fiber\n(g)',
  'Sodium\n(mg)',
  'Potassium\n(mg)',
  'Saturated Fat\n(g)',
  'Total Fat\n(g)',
  'Calories',
  'Cholesterol\n(mg)',
  'Protein\n(g)',
  'Carbohydrates\n(g)',
];

const Home = () => {
  const [showStackedBarChart, setShowStackedBarChart] = useState(false);
  const [showLazyTable, setShowLazyTable] = useState(false);

  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.meal.ingredients);
  const numberOfIngredients = ingredients.length;

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

  useMemo(() => {
    if (numberOfIngredients > 0) {
      console.log(numberOfIngredients);
      setShowLazyTable(true);
    } else {
      setShowLazyTable(false);
    }
  }, [numberOfIngredients]);

  return (
    <Fragment>
      <Layout>
        <div className="page-subsection">
          <h2 className="page-subsection__header">
            Calculate Your Meal's Nutrition
          </h2>
          <p>Start by adding an ingredient to your meal.</p>
          <IngredientForm />
        </div>
        {!showLazyTable && (
          <div className={`page-subsection ${styles['table-placeholder']}`}>
            <p>Waiting for your first ingredient</p>
            <div className={styles['table-placeholder__ellipses']}>
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
              <LazyTable thData={TABLE_COLUMN_NAMES} tbodyData={ingredients} />
              <div className={styles['table-menu']}>
                <button
                  className="page-subsection__button"
                  title="Toggle display of the chart"
                  onClick={showChartClickHandler}
                >
                  <span className="material-symbols-outlined">bar_chart</span>
                </button>
                <button
                  className="page-subsection__button--dark-red page-subsection__button "
                  title="Reset the meal nutrition table"
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
