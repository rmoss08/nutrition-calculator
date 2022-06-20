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
      <Table slice='day' />
    </div>
  );
}

export default App;
