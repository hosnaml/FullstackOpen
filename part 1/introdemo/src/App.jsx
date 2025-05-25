const Header = () => {
  const course = "Half Stack application development";
  return <h> {course} </h>;
};

const Content = (props) => {
  return (
    <div>
      <p>{props.part1}</p>
      <p>{props.part2}</p>
      <p>{props.part3}</p>
    </div>
  );
};

const Total = () => {
  return (
    <div>
      <p>{props.exercises1}</p>
      <p>{props.exercises2}</p>
      <p>{props.exercises3}</p>
    </div>
  );
};

const App = () => {
  // const-definitions

  return (
    <div>
      <Header course={Header.course} />
      <Content
        part1={"Fundamentals of React"}
        part2={"Using props to pass data"}
        part3={"State of a component"}
      />
      <Total exercises1={10} exercises2={7} exercises3={14} />
    </div>
  );
};
export default App;
