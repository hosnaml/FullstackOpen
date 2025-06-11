const Persons = ({ persons, filter, onDelete }) => {
  return (
    <div>
      {persons
        .filter((person) => {
          return person.name.includes(filter);
        })
        .map((person) => (
          <div key={person.id}>
            <div>
              {person.name} {person.number}
            </div>
            <button onClick={() => onDelete(person.id)}>delete</button>
          </div>
        ))}
    </div>
  );
};

export default Persons;
