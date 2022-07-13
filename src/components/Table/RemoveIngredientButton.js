import { useDispatch } from 'react-redux';
import { mealActions } from '../../store/meal-slice';

const RemoveIngredientButton = (props) => {
  const dispatch = useDispatch();

  const clickHandler = (event) => {
    event.preventDefault();

    return dispatch(mealActions.remove(props.id));
  };

  return (
    <button className="table-button" title="Remove" onClick={clickHandler}>
      <span className="material-symbols-outlined">close</span>
    </button>
  );
};

export default RemoveIngredientButton;
