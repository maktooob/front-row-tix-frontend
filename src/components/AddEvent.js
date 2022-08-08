import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'


const AddEvent = (props) => {
  let navigate = useNavigate()
  const [inputs, setInputs] = useState({})
  const [image, setImage] = useState("")

  const addEvent = () => {
    const newEvent = {
      title: inputs.title,
      description: inputs.description,
      category: inputs.category,
      location: inputs.location,
      date: inputs.date,
      price: inputs.price,
      image: image,
    }

    axios
      .post(process.env.REACT_APP_API_BASE_URL + '/events', newEvent)
      .then((res) => {
        props.fetchEventsCallback() //add event to List and update the view
        setInputs('')
        
      })
      .catch(e => console.log("issue creating an event", e))
  }
  const handleFileUpload = (e) => {
    const uploadData = new FormData()
    uploadData.append("image", e.target.files[0])
    axios.post(process.env.REACT_APP_API_BASE_URL +"/upload", uploadData)
    .then(response => {
      console.log("res img upload", response.data.fileUrl)
      setImage(response.data.fileUrl)
      console.log("set image", image)
    })
    .catch(e => console.log(e))
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
          Date
          <input
            type='date'
            name='date'
            value={inputs.date || ''}
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
            type='file'
            name='image'
            onChange={(e) => handleFileUpload(e)}
          />
        </label>
        <input type='submit' />
      </form>
 
    </>
  )
}

export default AddEvent
