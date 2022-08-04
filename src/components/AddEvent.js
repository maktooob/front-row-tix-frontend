import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const AddEvent = (props) => {
  let navigate = useNavigate()
  const [inputs, setInputs] = useState({})
  const addEvent = () => {
    const newEvent = {
      title: inputs.title,
      description: inputs.description,
      category: inputs.category,
      location: inputs.location,
      price: inputs.price,
      image: inputs.image,
    }
    console.log(" is location there?", newEvent)
    axios
      .post(process.env.REACT_APP_API_BASE_URL + '/events', newEvent)
      .then((res) => {
        props.fetchEventsCallback() //add event to List and update the view
        setInputs('')
      })
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
      <form id='addEvent' onSubmit={handleSubmit}>
        <label>
          
          Title
          <input
            type='text'
            name='title'
            value={inputs.title || ''}
            onChange={handleChange}
          />
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
        <label htmlFor='category'>Select category</label>
        <select
          id='category'
          name='category'
          onChange={handleChange}
          form='addEvent'
        >
          <option value='sports'>Sports</option>
          <option value='concert'>Concert</option>
          <option value='culture'>Culture</option>
        </select>
        <label>
          Location
          <input
            type='text'
            name='location'
            value={inputs.location || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Price
          <input
            type='number'
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
