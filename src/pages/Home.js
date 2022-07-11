import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StackedBarChart from '../components/StackedBarChart';
import IngredientForm from '../components/IngredientForm';
import Table from '../components/Table/Table';
import { Fragment } from 'react';
import { mealActions } from '../store/meal-slice';
import Layout from '../components/Layout';
import styles from './Home.module.css';

const Home = () => {
  const [showStackedBarChart, setShowStackedBarChart] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.meal.ingredients);
  const numberOfIngredients = ingredients.length;

  const resetMealClickHandler = (event) => {
    event.preventDefault();

    setShowStackedBarChart(false);
    dispatch(mealActions.reset());
  };

  const showChartClickHandler = (event) => {
    event.preventDefault();

    return setShowStackedBarChart(true);
  };

  const hideStackedBarChartClickHandler = (event) => {
    event.preventDefault();

    return setShowStackedBarChart(false);
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
          <div className="page-sub-section">
            <IngredientForm />
          </div>
          {!showTable && (
            <div className={`page-sub-section ${styles['table-placeholder']}`}>
              <p>
                Waiting for your first ingredient
              </p>
              <div className={styles['table-placeholder__ellipses']}>
                <div className={styles['table-placeholder__dot']}></div>
                <div className={styles['table-placeholder__dot']}></div>
                <div className={styles['table-placeholder__dot']}></div>
              </div>
            </div>
          )}
          {showTable && (
            <div className="page-sub-section">
              <Table />
              <div>
                <button className='button'
                  title="Show chart comparing your meal to the recommended daily nutrition values"
                  onClick={showChartClickHandler}
                >
                  <span className="material-symbols-outlined">bar_chart</span>
                </button>
                <button className='button'
                  title="Reset the meal nutrition table"
                  onClick={resetMealClickHandler}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
          {showStackedBarChart && (
            <div className="page-sub-section">
              <StackedBarChart />
            </div>
          )}
        </div>
      </Layout>
    </Fragment>
  );
};

export default Home;
