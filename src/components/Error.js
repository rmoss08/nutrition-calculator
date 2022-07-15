import styles from './Error.module.css';

const ERROR_MESSAGES = {
  ingredientLimitMet: 'You have reached the ingredient limit',
  apiConnectionDown: 'Sorry, something went wrong. Please try again later',
  invalidIngredient: 'Please enter a valid ingredient',
};

const Error = (props) => {
  const type = props.type;

  const closeClickHandler = (event) => {
    event.preventDefault();

    return props.closeError(type);
  };

  return (
    <div className={styles.error}>
      {ERROR_MESSAGES[type]}
      <button className={styles['error__button']}>
        <span className="material-symbols-outlined" onClick={closeClickHandler}>close</span>
      </button>
    </div>
  );
};

export default Error;
