const Row = (props) => {
  const createTdElements = (tdData) => {
    let elements = [
      <td key="name">{tdData.name}</td>,
      <td key="weight">{tdData.weight}</td>,
      <td key="action">
        <button>+</button>
        <button>-</button>
      </td>,
    ];

    const nutrition = tdData.nutrition;
    for (const key in nutrition) {
      elements.push(<td key={key}>{nutrition[key]}</td>);
    }

    return elements;
  };

  // let tdElements = []
  const tdElements = createTdElements(props.tdData);

  return <tr key={props.tdData.id}>{tdElements}</tr>;
};

export default Row;
