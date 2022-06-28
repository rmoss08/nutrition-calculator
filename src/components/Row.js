import styles from './Row.module.css';

const Row = (props) => {
  const createTdElements = (tdData) => {
    let elements = [
      <td key="name" className={styles['row-name']}>{tdData.name}</td>,
      <td key="weight" className="text-align-right">{tdData.weight}</td>,
      <td key="action">
        <button className={`${styles['quantity-button']} ${styles.add}`}>
          +
        </button>
        <button className={`${styles['quantity-button']} ${styles.subtract}`}>-</button>
      </td>,
    ];

    const nutrition = tdData.nutrition;
    for (const key in nutrition) {
      elements.push(<td key={key} className="text-align-right">{nutrition[key]}</td>);
    }

    return elements;
  };

  // let tdElements = []
  const tdElements = createTdElements(props.tdData);

  return <tr key={props.tdData.id}>{tdElements}</tr>;
};

export default Row;
