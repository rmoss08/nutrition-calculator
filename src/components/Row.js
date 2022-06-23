const Row = (props) => {
    const createTdElements = (data) => {
        let elements = []

        for (const i in data) {
            elements.push(<td key={i}>{data[i]}</td>)
        }
        
        return elements
    };
    
    let tdElements = []
    tdElements = createTdElements(props.data);

    return <tr>{tdElements}</tr>;
};

export default Row;

// const unNestObject = (object, nestedIndex) => {
//   const newObject = {};

//   for (const i in data) {
//     if (i !== nestedIndex) {
//       newObject[i] = object[i];
//     } else {
//       for (const j in data[i]) {
//         newObject[j] = data[i][j];
//       }
//     }
//   }

//   return newObject;
// };