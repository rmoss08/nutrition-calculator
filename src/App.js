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
      <footer>
        <p className='footer-credit'>
          Created by{' '}
          <a href="https://www.linkedin.com/in/robertjmoss/" className='linkedin-hyperlink'>Robert J. Moss</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
