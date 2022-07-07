import { useState } from 'react';
import { useDispatch } from 'react-redux';
import StackedBarChart from '../components/StackedBarChart';
import IngredientForm from '../components/IngredientForm';
import Table from '../components/Table/Table';
import { mealActions } from '../store/meal-slice';
import { Fragment } from 'react';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const dispatch = useDispatch();
  const [showBarChart, setShowBarChart] = useState(false);

  const resetTableClickHandler = (event) => {
    event.preventDefault();

    setShowBarChart(false);
    dispatch(mealActions.reset());
  };

  const showChartClickHandler = (event) => {
    event.preventDefault();

    return setShowBarChart(true);
  };

  const hideChartClickHandler = (event) => {
    event.preventDefault();

    return setShowBarChart(false);
  };

  return (
    <Fragment>
      <Layout>
        <div className="wrapper">
          <div className="page-sub-section">
            <IngredientForm />
          </div>
          <div className="page-sub-section">
            <Table slice="meal" />
            <button onClick={resetTableClickHandler}>Reset</button>
          </div>
          <div className="last page-sub-section">
            {!showBarChart && (
              <button onClick={showChartClickHandler}>
                <span className="material-symbols-outlined">bar_chart</span>
              </button>
            )}
            {showBarChart && (
              <div>
                <StackedBarChart />
                <button onClick={hideChartClickHandler}>Hide Chart</button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Home;
