import { useDispatch, useSelector } from 'react-redux';
import { mealActions } from '../../store/meal-slice';
import { calculateWeightedNutrition } from '../Forms/IngredientForm';
import styles from './QuantityForm.module.css';

const QuantityForm = (props) => {
  const dispatch = useDispatch();
  const servingSize = useSelector((state) => state.meal.servingSize);

  const ingredient = props.ingredient;

  const submitHandler = (event) => {
    event.preventDefault();

    const newQuantity = document.getElementById(
      `table-quantity-input-${ingredient.id}`
    ).value;

    console.log(typeof newQuantity);
    if (newQuantity === '0') {
      return dispatch(mealActions.removeIngredient(ingredient.id));
    } else {
      const newWeightedNutrition = calculateWeightedNutrition(
        ingredient,
        servingSize,
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

  const placeholder = `${props.placeholder}`;
  const formattedPlaceholder = placeholder.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <form
      className={`flex-center-all ${styles['quantity-form']}`}
      onSubmit={submitHandler}
    >
      <input
        id={`table-quantity-input-${ingredient.id}`}
        className={styles['quantity-form__input']}
        type="number"
        placeholder={formattedPlaceholder}
      ></input>
      <button className="table__button" title="Re-calculate">
        <span className="material-symbols-outlined">calculate</span>
      </button>
    </form>
  );
};

export default QuantityForm;
