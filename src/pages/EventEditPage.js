import axios from "axios"
import { useContext, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../context/auth.context"


const EventEditPage = (props) => {
  const {user} = useContext(AuthContext)
  const storedToken = localStorage.getItem("authToken");
  console.log("zzz", user)
    const location = useLocation();
    let navigate = useNavigate()
    const {id} = useParams()
    const [inputs, setInputs] = useState({})
    const updateEvent = () => {
      const updatedEvent = {
        title: inputs.title,
        description: inputs.description,
        category: inputs.category,
        location: inputs.location,
        price: inputs.price,
        image: inputs.image,
      }
      axios
        .put(`${process.env.REACT_APP_API_BASE_URL}/events/${id}`, updatedEvent, 
          {headers: {Authorization: `Bearer ${storedToken}`}})
        .then((res) => {
            console.log(updateEvent)

        })
        .catch (e => console.log(e))
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      updateEvent()
      navigate('/events')
    }
    const handleChange = (event) => {
      const name = event.target.name
      const value = event.target.value
      setInputs((values) => ({...values, [name]: value}))
    }
    return (
        <div>
            <h1>edit!</h1>
            <form id='addEvent' onSubmit={handleSubmit}>
        <label>
          
          Title
          <input
            type='text'
            name='title'
            placeholder={location.state.foundEvent.title}
            value={inputs.title || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Description
          <input
            type='text'
            name='description'
            placeholder={location.state.foundEvent.description}
            value={inputs.description || ''}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='category'>Select category</label>
        <select
          id='category'
          name='category'
          placeholder={location.state.foundEvent.category}
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
            placeholder={location.state.foundEvent.location}
            value={inputs.location || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Price
          <input
            type='number'
            name='price'
            placeholder={location.state.foundEvent.price}
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
        </div>
    )
}

export default EventEditPage