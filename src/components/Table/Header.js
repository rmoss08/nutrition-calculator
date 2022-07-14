import styles from './Header.module.css';

const Header = (props) => {
  const createThElement = (key, classes, content) => {
    return (
      <th key={key} className={styles[classes]}>
        {content}
      </th>
    );
  };

  const createThArray = (thData) => {
    let tdArray = [];

    for (const i in thData) {
      tdArray.push(createThElement(thData[i], 'header__cell', thData[i]));
    }
    return tdArray;
  };

  let thElements = createThArray(props.thData);
  thElements.push(<th key="remove-button-column"></th>);

  return <tr>{thElements}</tr>;
};

export default Header;
