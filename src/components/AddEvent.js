import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const AddEvent = () => {
  let navigate = useNavigate()
  const [inputs, setInputs] = useState({})
  const addEvent = () => {
    const newEvent = {
      title: inputs.title,
      description: inputs.description,
      category: inputs.category,
      price: inputs.price,
      image: inputs.image,
    }
    console.log(process.env.REACT_APP_API_BASE_URL)
    axios.post(process.env.REACT_APP_API_BASE_URL + '/events', newEvent)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addEvent()
    navigate('/events')
  }
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({...values, [name]: value}))
  }

  return (
    <>
      <h1>Add a new Event!</h1>
      <form id="addEvent" onSubmit={handleSubmit}>
        <label>
          {' '}
          Title
          <input
            type='text'
            name='title'
            value={inputs.title || ''}
            onChange={handleChange}
          />{' '}
        </label>
        <label>
          Description
          <input
            type='text'
            name='description'
            value={inputs.description || ''}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='category'>Choose a car:</label>
        <select id='category' name='category' onChange={handleChange} form='addEvent'>
          <option value='sports'>Sports</option>
          <option value='concert'>Concert</option>
          <option value='culture'>Culture</option>
        </select>

        <label>
          Price
          <input
            type='text'
            name='price'
            value={inputs.price || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Image
          <input
            type='text'
            name='image'
            value={inputs.image || ''}
            onChange={handleChange}
          />
        </label>
        <input type='submit' />
      </form>
    </>
  )
}

export default AddEvent
