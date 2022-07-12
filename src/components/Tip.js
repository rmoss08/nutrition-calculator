import { Fragment, useEffect, useMemo, useState } from 'react';
import styles from './Tip.module.css';

const Tip = (props) => {
  const [showTip, setShowTip] = useState(false);

  const tipClickHandler = (event) => {
    event.preventDefault();

    return setShowTip((prevState) => {
      return !prevState;
    });
  };

  const tipMessageClickHandler = (event) => {
    event.preventDefault();

    return setShowTip(false);
  };

  return (
    <Fragment>
      <button
        className={styles['tip__button']}
        title="Information"
        onClick={tipClickHandler}
      >
        <span class="material-symbols-outlined">info</span>
      </button>
      {showTip && (
        <div
          className={styles['tip-message']}
          onClick={tipMessageClickHandler}
        >
          {props.message}
        </div>
      )}
    </Fragment>
  );
};

export default Tip;
