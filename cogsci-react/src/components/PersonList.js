import React, { useState, useEffect } from 'react';
import axios from 'axios';
import formatDate from './DateUtils';

export default function PersonList()  {
  const [persons, setPersons] = useState([])

  useEffect( () => {
    const getAdmin = async () => {
      const response = await axios.get(`http://localhost:8080/`)
      setPersons(response.data)
    }
    getAdmin()
  }, [])

    return (
      <ul>
        { persons.map(person => <li>date: {formatDate(person.date)}, got_point: {person.got_point}</li>)}
        {/* { persons.map(person => <li>date: {Date.parse(person.date.split("T")[0]).toString("dd MM yyyy")}, got_point: {person.got_point}</li>)} */}
        {/* { persons.map(person => <li>id: {person.id}, meno: {person.first_name} {person.last_name}</li>)} */}
      </ul>
    )
  
}