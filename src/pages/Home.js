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
        <LoadingSpinner />
        <div className="wrapper">
          <IngredientForm />
          <br></br>
          <Table slice="meal" />
          <br></br>
          <button onClick={resetTableClickHandler}>Reset</button>
          <br></br>
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
      </Layout>
    </Fragment>
  );
};

export default Home;
