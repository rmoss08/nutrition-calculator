import { useState } from 'react';
import { useDispatch } from 'react-redux';
import StackedBarChart from '../components/StackedBarChart';
import IngredientForm from '../components/IngredientForm';
import Table from '../components/Table/Table';
import { Fragment } from 'react';
import { mealActions } from '../store/meal-slice';
import Layout from '../components/Layout';

const Home = () => {
  const dispatch = useDispatch();
  const [showStackedBarChart, setShowStackedBarChart] = useState(false);

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

  return (
    <Fragment>
      <Layout>
        <div className="wrapper">
          <div className="page-sub-section">
            <IngredientForm />
          </div>
          <div className="page-sub-section">
            <Table />
            <button onClick={resetMealClickHandler}>Reset</button>
          </div>
          <div className="page-sub-section">
            {!showStackedBarChart && (
              <button onClick={showChartClickHandler}>
                <span className="material-symbols-outlined">bar_chart</span>
              </button>
            )}
            {showStackedBarChart && (
              <div>
                <StackedBarChart />
                <button onClick={hideStackedBarChartClickHandler}>
                  Hide Chart
                </button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Home;
