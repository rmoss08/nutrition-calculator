import { useState } from 'react';
import BarChart from './components/BarChart';
import IngredientForm from './components/IngredientForm';
import MealForm from './components/MealForm';
import Table from './components/Table';

function App() {
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
        <BarChart />
      </div>
    </div>
  );
}

export default App;
