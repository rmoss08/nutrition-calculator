import { useState } from 'react';
import BarChart from './components/BarChart';
import IngredientForm from './components/IngredientForm';
import MealForm from './components/MealForm';
import Table from './components/Table';

function App() {
  return (
    <div>
      <IngredientForm />
      <br></br>
      <Table slice='meal'/>
      <br></br>
      <br></br>
      <MealForm />
      <br></br>
      <Table slice='day'/>
      <br></br>
      <BarChart />
    </div>
  );
}

export default App;
