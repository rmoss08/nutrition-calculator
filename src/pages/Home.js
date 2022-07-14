import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StackedBarChart from '../components/StackedBarChart';
import IngredientForm from '../components/IngredientForm';
import Table from '../components/Table/Table';
import { Fragment } from 'react';
import { mealActions } from '../store/meal-slice';
import Layout from '../components/Layout';
import styles from './Home.module.css';
import InformationButton from '../components/InformationButton';

const QUANTITY_TIP_MESSAGE = (
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
    <InformationButton message={QUANTITY_TIP_MESSAGE} />
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
  const [showTable, setShowTable] = useState(false);

  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.meal.ingredients);
  const numberOfIngredients = ingredients.length;

  const resetMealClickHandler = (event) => {
    event.preventDefault();

    setShowStackedBarChart(false);
    setShowTable(false);
    dispatch(mealActions.reset());
  };

  const showChartClickHandler = (event) => {
    event.preventDefault();

    return setShowStackedBarChart((prevState) => {
      return !prevState;
    });
  };

  useMemo(() => {
    if (numberOfIngredients) {
      setShowTable(true);
    }
  }, [numberOfIngredients]);

  return (
    <Fragment>
      <Layout>
        <div className="wrapper">
          <div className="page-subsection">
            <h2 className="page-subsection__header">
              Calculate Your Meal's Nutrition
            </h2>
            <p>Start by adding an ingredient to your meal.</p>
            <IngredientForm />
          </div>
          {!showTable && (
            <div className={`page-subsection ${styles['table-placeholder']}`}>
              <p>Waiting for your first ingredient</p>
              <div className={styles['table-placeholder__ellipses']}>
                <div className={styles['table-placeholder__dot']}></div>
                <div className={styles['table-placeholder__dot']}></div>
                <div className={styles['table-placeholder__dot']}></div>
              </div>
            </div>
          )}
          {showTable && (
            <div className="page-subsection">
              <h2 className="page-subsection__header">Meal Nutrition</h2>
              <Table thData={TABLE_COLUMN_NAMES} tbodyData={ingredients} />
              <div className={styles['table-menu']}>
                <button
                  className="page-subsection__button"
                  title="Toggle display of chart comparing your meal to the recommended daily nutrition values"
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
        </div>
      </Layout>
    </Fragment>
  );
};

export default Home;
