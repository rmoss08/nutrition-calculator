import { useDispatch, useSelector } from "react-redux";
import { dayActions } from "../store/day-slice";

const MealForm = ()=> {
    const dispatch = useDispatch();
    const meals = useSelector(state => state.day.meals);

    const determineSelectedMeal = () => {
        const selectValue = document.getElementById('meal-select').value;
        const selectedMealArray = meals.filter(meal => meal.name === selectValue);

        return selectedMealArray[0];
    };

    const addHandler = (event) => {
        event.preventDefault();

        const mealSelected = determineSelectedMeal();

        return dispatch(dayActions.addToSelectedMeals(mealSelected));
    };

    let optionElements = [<option value='none'>---</option>];

    for (const i in meals) {
        const meal = meals[i];
        const mealName = meal.name;
        optionElements.push(<option value={mealName}>{mealName}</option>)
    }
    
    return <form>
        <label htmlFor="meal-select">Select Meal:</label>
        <select id='meal-select'>{optionElements}</select>
        <button onClick={addHandler}>Add</button>
    </form>
};

export default MealForm;