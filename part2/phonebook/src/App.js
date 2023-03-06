import { useState, useEffect } from "react";

import Note from "./components/Note";
import personService from "./services/persons";

const Notification = ({ message, error }) => {
  if (message === null && error === null) {
    return null;
  } else if (message !== null) {
    return <div className="message">{message}</div>;
  } else if (error !== null) {
    return <div className="error">{error}</div>;
  }
};

const Persons = ({ fillist, deletePerson }) => {
  return (
    <div>
      {fillist.map((person) => (
        <Note
          key={person.id}
          person={person}
          handleClick={() => deletePerson(person.id)}
        />
      ))}
    </div>
  );
};

const Filter = ({ setFilter }) => {
  return (
    <div>
      filter shown with{" "}
      <input onChange={setFilter} placeholder="filter" v-model="keyWord" />
    </div>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [keyWord, setKeyWord] = useState("");

  useEffect(() => {
    // console.log('effect')
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      // console.log(response.data)
    });
  }, []);
  // console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const setFilter = (event) => {
    setKeyWord(event.target.value);
  };

  const [sendMessage, setSendMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const deletedPerson = persons.filter((p) => p.id !== id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .del(id, deletedPerson)
        .then(() => {
          personService.getAll().then((returnedPerson) => {
            setPersons(returnedPerson);
          });
        })
        .then(() => {
          setSendMessage(`Deleted ${person.name}`);
          setTimeout(() => {
            setSendMessage(null);
          }, 5000);
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      // id: persons.length + 1
    };

    const toggleNumber = (id) => {
      const person = persons.find((p) => p.id === id);
      const changedPerson = { ...person, number: newNumber };

      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            );
          })
          .then(() => {
            setSendMessage(`Number of ${person.name} has been toggled`);
            setTimeout(() => {
              setSendMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(error.response.data.error);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    };

    const newPerson = persons.filter((newperson) => newperson.name === newName);
    if (newPerson.length !== 0) {
      if (newPerson[0].number !== newNumber) {
        toggleNumber(newPerson[0].id);
      } else {
        window.alert(`${newName} is already added to phonebook`);
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
        })
        .then(() => {
          setSendMessage(`Added ${newName}`);
          setTimeout(() => {
            setSendMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
      // console.log('add')
    }
  };

  const fillist = persons.filter(
    (p) => p.name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={sendMessage} error={errorMessage} />
      <Filter setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons fillist={fillist} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
