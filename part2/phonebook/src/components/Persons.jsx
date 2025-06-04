const Persons = (props) => {
  return (
    <div>
      {props.persons
        .filter((person) => person.name.includes(props.filter))
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
    </div>
  );
};

export default Persons;
