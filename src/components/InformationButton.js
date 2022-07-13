import { Fragment, useEffect, useMemo, useState } from 'react';
import styles from './InformationButton.module.css';

const InformationButton = (props) => {
  const [showMessage, setShowMessage] = useState(false);

  const buttonClickHandler = (event) => {
    event.preventDefault();

    return setShowMessage((prevState) => {
      return !prevState;
    });
  };

  const informationClickHandler = (event) => {
    event.preventDefault();

    return setShowMessage(false);
  };

  return (
    <Fragment>
      <button
        className={styles['information-button__button']}
        title="Information"
        onClick={buttonClickHandler}
      >
        <span class="material-symbols-outlined">info</span>
      </button>
      {showMessage && (
        <div
          className={styles['information-button__message']}
          onClick={informationClickHandler}
        >
          {props.message}
        </div>
      )}
    </Fragment>
  );
};

export default InformationButton;
