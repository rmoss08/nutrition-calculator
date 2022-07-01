import { useDispatch } from "react-redux";
import { mealActions } from "../../store/meal-slice";

const RemoveIngredientButton = (props) => {
  const dispatch = useDispatch();
  
    const clickHandler = (event) => {
    event.preventDefault();

    console.log(props.ingredientId);
    return dispatch(mealActions.remove(props.ingredientId));
  };
  
    return (
    <button onClick={clickHandler}>
      <span className="material-symbols-outlined">remove</span>
    </button>
  );
};

export default RemoveIngredientButton;
