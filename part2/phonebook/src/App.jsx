import { useState } from "react";
import { useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setfilter] = useState("");
  const [message, setMessage] = useState(null);

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNameFilter = (event) => {
    setfilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      setMessage(
        `${newName} is already added to phonebook, replace the old number with the new one?`
      );
      personsService
        .update(persons.find((person) => person.name === newName).id, {
          name: newName,
          number: newNumber,
        })
        .then(() => {
          setPersons(
            persons.map((person) =>
              person.name === newName
                ? { ...person, number: newNumber }
                : person
            )
          );
          setNewName("");
          setNewNumber("");
          setMessage(`Updated ${newName}`);
        });
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    personsService.create(newPerson).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
      setMessage(`Added ${newName}`);
    });
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage(`Deleted ${personToDelete.name}`);
        })
        .catch((error) => {
          setMessage(
            `Information of ${personToDelete.name} has already been removed from server`
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  useEffect(() => {
    personsService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} setMessage={setMessage} />
      <div>
        <Filter filter={filter} handleNameFilter={handleNameFilter} />
      </div>
      <h2>Add a new notes</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} onDelete={deletePerson} />
    </div>
  );
};

export default App;
