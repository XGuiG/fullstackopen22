import { useState } from 'react'
import Note from './components/Note'

const Persons = ({fillist}) => {
  return (
    <div>
      {fillist.map(person => <Note key={person.id} person={person} />)}
    </div>
  )
}

const Filter = ({setFilter}) => {
  return (
    <div>
      filter shown with <input onChange={setFilter} placeholder="filter" v-model="keyWord" />
    </div>
  )
}

const PersonForm = ({addPerson, newName,handleNameChange,newNumber,handleNumberChange}) => {
  return (
    <div>
      <form onSubmit={addPerson} >
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
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [keyWord, setKeyWord] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const setFilter = (event) => {
    setKeyWord(event.target.value)
  }

  const addPerson = (event) =>{
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      id: persons.length + 1
    }
    
    if (persons.some(newperson => newperson.name === newName)){
        window.alert(`${newName} is already added to phonebook`)
    }
    else{
        
        setPersons(persons.concat(personObject))
        setNewName('')
    }
  }

  const fillist = persons.filter((p)=> p.name.toLowerCase().indexOf(keyWord.toLowerCase()) !==-1)
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons fillist={fillist} />
    </div>
  )
}

export default App