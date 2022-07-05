import { useDispatch, useSelector } from 'react-redux';
import { mealActions } from '../../store/meal-slice';
import { calculateWeightedValues } from '../IngredientForm';
import styles from './QuantityInput.module.css';

const QuantityInput = (props) => {
  const dispatch = useDispatch();
  const ingredient = props.ingredient;

  const submitHandler = (event) => {
    event.preventDefault();
    
    const newQuantity = document.getElementById(`table-quantity-input-${ingredient.id}`).value;
    const newWeightedNutrition = calculateWeightedValues(ingredient, newQuantity);
    
    return dispatch(
      mealActions.updateIngredientQuantity({
        id: ingredient.id,
        newQuantity,
        newWeightedNutrition,
      })
    );
  };

  return (
    <form className={styles['quantity-form']} onSubmit={submitHandler}>
      <input
        id={`table-quantity-input-${ingredient.id}`}
        className={styles['quantity-form__input']}
        type="number"
        placeholder={props.placeholder}
      ></input>
      <button className='table-button'>
        <span className="material-symbols-outlined">calculate</span>
      </button>
    </form>
  );
};

export default QuantityInput;