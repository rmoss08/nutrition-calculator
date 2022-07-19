import { useDispatch } from 'react-redux';
import { mealActions } from '../store/meal-slice';

const ServingForm = () => {
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    const newServingSize = event.target[0].value;
    return dispatch(mealActions.updateServingSize(newServingSize));
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="serving-input">Serving Size:</label>
        <input id="serving-input" type="number" min={1} placeholder={1} />
      </div>
      <button>Update</button>
    </form>
  );
};

export default ServingForm;
