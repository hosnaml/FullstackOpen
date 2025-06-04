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
        <table>
          <tbody>
            <StatisticLine text="Good" value={props.good} />
            <StatisticLine text="Neutral" value={props.neutral} />
            <StatisticLine text="Bad" value={props.bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={`${positive} %`} />
          </tbody>
        </table>
      </div>
    );
  }
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const maxVotes = Math.max(...votes);
  const topAnecdoteIndex = votes.indexOf(maxVotes);

  return (
    <div>
      <h1> Give feedback </h1>
      <Button handleClick={() => setGood(good + 1)} text={"Good"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"Neutral"} />
      <Button handleClick={() => setBad(bad + 1)} text={"Bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
      <h2>Anecdotes of the day!</h2>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleClick}> Next anecdotes</button>
      <div> {anecdotes[selected]} </div>
      <h3>Anecdotes with most votes</h3>
      <div> {anecdotes[topAnecdoteIndex]} </div>
    </div>
  );
};

export default App;
