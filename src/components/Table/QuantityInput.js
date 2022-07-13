import { useDispatch, useSelector } from 'react-redux';
import { mealActions } from '../../store/meal-slice';
import { calculateWeightedNutrition } from '../IngredientForm';
import styles from './QuantityInput.module.css';

const QuantityInput = (props) => {
  const dispatch = useDispatch();
  const ingredient = props.ingredient;

  const submitHandler = (event) => {
    event.preventDefault();

    const newQuantity = document.getElementById(
      `table-quantity-input-${ingredient.id}`
    ).value;

    console.log(typeof newQuantity);
    if (newQuantity === '0') {
      return dispatch(mealActions.remove(ingredient.id));
    } else {
      const newWeightedNutrition = calculateWeightedNutrition(
        ingredient,
        newQuantity
      );

      return dispatch(
        mealActions.updateIngredientQuantity({
          id: ingredient.id,
          newQuantity,
          newWeightedNutrition,
        })
      );
    }
  };

  return (
    <form
      className={`flex-center-all ${styles['quantity-form']}`}
      onSubmit={submitHandler}
    >
      <input
        id={`table-quantity-input-${ingredient.id}`}
        className={styles['quantity-form__input']}
        type="number"
        placeholder={props.placeholder}
      ></input>
      <button className="table-button" title='Re-calculate'>
        <span className="material-symbols-outlined">calculate</span>
      </button>
    </form>
  );
};

export default QuantityInput;
