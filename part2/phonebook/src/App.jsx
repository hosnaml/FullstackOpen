import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setfilter] = useState("");

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
      alert(
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
        });
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    personsService.create(newPerson).then((response) => {
      setPersons(persons.concat(response.data));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      personsService.remove(id).then(() => {
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
