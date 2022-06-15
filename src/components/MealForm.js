import { useSelector } from "react-redux";

const MealForm = ()=> {
    const meals = useSelector(state => state.day.meals);

    let optionElements = [<option value='none'>---</option>];

    for (const i in meals) {
        const meal = meals[i];
        const mealName = meal.name;
        optionElements.push(<option value={mealName}>{mealName}</option>)
    }
    
    return <form>
        <label htmlFor="meal-select">Select Meal:</label>
        <select id='meal-select'>{optionElements}</select>
        <button>Add</button>
    </form>
};

export default MealForm;