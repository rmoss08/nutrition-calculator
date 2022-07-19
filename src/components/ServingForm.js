import { useDispatch } from 'react-redux';
import { mealActions } from '../store/meal-slice';
import styles from './ServingForm.module.css';

const ServingForm = () => {
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    const newServingSize = event.target[0].value;
    return dispatch(mealActions.updateServingSize(newServingSize));
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles['serving-form__grid']}>
        <div className="general-form__field">
          <label htmlFor="serving-input" className="general-form__field-label">
            Serving Size:
          </label>
          <input
            id="serving-input"
            className="general-form__field-input"
            type="number"
            min={1}
            placeholder={1}
          />
        </div>
      </div>
      <button className="page-subsection__button">Update</button>
    </form>
  );
};

export default ServingForm;
