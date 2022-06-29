import { useState } from 'react';
import { useDispatch } from 'react-redux';
import BarChart from './components/BarChart';
import IngredientForm from './components/IngredientForm';
import MealForm from './components/MealForm';
import Table from './components/Table';
import { mealActions } from './store/meal-slice';

function App() {
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
    <div>
      <nav>
        <h1>NutriCalc</h1>
      </nav>
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
            <BarChart />
            <button onClick={hideChartClickHandler}>Hide Chart</button>
          </div>
        )}
      </div>
      <footer>
        <p className="footer-credit">
          Created by{' '}
          <a
            href="https://www.linkedin.com/in/robertjmoss/"
            className="linkedin-hyperlink"
          >
            Robert J. Moss
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
