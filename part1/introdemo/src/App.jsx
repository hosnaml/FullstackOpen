import { useState } from "react";
const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;
  const average = total / 3;
  const positive = (props.good / total) * 100;

  if (total === 0) {
    return <h3>No feedback given!</h3>;
  } else {
    return (
      <div>
        <h2> Statistics</h2>
        <StatisticLine text="Good" value={props.good} />
        <StatisticLine text="Neutral" value={props.neutral} />
        <StatisticLine text="Bad" value={props.bad} />
        <StatisticLine text="All" value={total} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={`${positive} %`} />
      </div>
    );
  }
};

const StatisticLine = ({ text, value }) => (
  <div>
    {text} {value}
  </div>
);

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1> Give feedback </h1>
      <Button handleClick={() => setGood(good + 1)} text={"Good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"Neutral"} />
      <Button handleClick={() => setBad(bad + 1)} text={"Bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
