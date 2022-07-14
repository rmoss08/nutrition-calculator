import { useDispatch } from 'react-redux';
import { mealActions } from '../../store/meal-slice';

const RemoveButton = (props) => {
  const dispatch = useDispatch();

  const clickHandler = (event) => {
    event.preventDefault();

    return dispatch(mealActions.remove(props.id));
  };

  return (
    <button
      className="table__button table__button--dark-red"
      title="Remove"
      onClick={clickHandler}
    >
      <span className="material-symbols-outlined">close</span>
    </button>
  );
};

export default RemoveButton;
