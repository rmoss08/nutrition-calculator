import styles from './Error.module.css';

const Error = (props) => {
  return <div className={styles.error}>{props.message}</div>;
};

export default Error;
