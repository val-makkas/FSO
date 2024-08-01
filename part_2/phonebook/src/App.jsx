import { useState, useEffect } from 'react'
import personService from '../services/person'
import { isAxiosError } from 'axios'

const Filter = ({ handleFilter }) => (
  <div>
    filter shown with 
    <input onChange={handleFilter} />
  </div>
)

const PersonForm = ({ addPerson, newName, handleNewName, newNumber, handleNewNumber }) => (
  <form onSubmit={addPerson}>
   <div>
     name: 
     <input 
      value = {newName}
      onChange = {handleNewName}
     />
   </div>
   <div>
    number: 
      <input 
        value = {newNumber}
        onChange = {handleNewNumber}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ filteredPersons, deletePerson }) => {
  return (
    <div>
      {filteredPersons.map(person => 
        <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)} />
      )}
    </div>
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      <p>
        {person.name} {person.number} <button onClick={deletePerson}>Delete</button>
      </p>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)

  const isDuplicate = (personObject) => {
    return persons.some(person => personObject.name === person.name)
  }

  useEffect(() => {
    personService
    .getAll()
    .then(personsList => {
      setPersons(personsList)
      setFilteredPersons(personsList)
    })
    .catch(error => {
      setIsError(true) // Set error state
      setNotification('Failed to fetch persons')
    })
  }, [])  

  const Notification = ({input, isError}) => {
    const NotificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  
    if (input === null) {
      return null
    }
    
    const style = isError ? { ...NotificationStyle, color: 'red' } : NotificationStyle
  
    return (
      <div style={style}>
        {input}
      </div>
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (isDuplicate(personObject)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) 
        {
          const person = persons.find(person => person.name === newName)
          const updatedPerson = {...person, number: newNumber}
          personService
          .update(person.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setFilteredPersons(filteredPersons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            
            setIsError(false)
            setNotification(`Updated ${newName}`)
            setTimeout(() => {
              setNotification(null)
            },3000)
          })
          .catch(error => {
            setPersons(persons.filter(person => person.name !== newName))
            setFilteredPersons(filteredPersons.filter(person => person.name !== newName))
            setNewName('')
            setNewNumber('')
            
            setIsError(true)
            setNotification(`Information of ${newName} has already been removed from the server`)
            setTimeout(() => {
              setNotification(null)
            },3000)
          })
        }
    }
    else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setFilteredPersons(filteredPersons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })

      setIsError(false)
      setNotification(`Added ${newName}`)
      setTimeout(() => {
        setNotification(null)
      },3000)
    }
    
  }

  const deletePerson = (id) => {
    
    if(window.confirm("Do you really want to delete this person?")) {
      personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setFilteredPersons(filteredPersons.filter(person => person.id !== id))
      })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification input={notification} isError={isError}/>

      <Filter handleFilter={handleFilter}/>

      <h2>Add new</h2>

      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNewName={handleNewName} 
        newNumber={newNumber} 
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
  
    </div>
  )
}

export default App