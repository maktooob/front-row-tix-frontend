import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { AuthContext } from '../context/auth.context';





const AddEvent = (props) => {
  const {user} = useContext(AuthContext)
  let navigate = useNavigate()
  const [inputs, setInputs] = useState({})
  const [image, setImage] = useState("")
  const storedToken = localStorage.getItem("authToken")
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
      .post(process.env.REACT_APP_API_BASE_URL + '/events', 
      newEvent,
      { headers: { user: user.status } })
      .then((res) => {
        props.fetchEventsCallback() //add event to List and update the view

      })
      .catch(e => console.log("issue creating an event", e))
  }
  const handleFileUpload = (e) => {
    const uploadData = new FormData()
    uploadData.append("image", e.target.files[0])
    axios.post(process.env.REACT_APP_API_BASE_URL + "/upload", 
    uploadData,
    { headers: { user: user.status } })
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
    setInputs('')
    setImage("")
    navigate('/events')
  }
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))

  }



  return (
    <>
      <h1>Add a new Event!</h1>
      {/* <form id='addEvent' onSubmit={handleSubmit}>
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
      </form> */}


      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' }, display: "flex", alignItems: "center"
        }}
        noValidate
        autoComplete="off"
        size="small"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          variant='outlined'
          id="outlined-size-small"
          label="Title"
          name="title"
          value={inputs.value}
          onChange={handleChange}
        />
        <TextField
          required
          variant='outlined'
          id="outlined-required"
          label="Description"
          name="description"
          value={inputs.value}
          onChange={handleChange}
        />
        <TextField
          required
          variant='outlined'
          id="outlined-required"
          label="Location"
          name="location"
          value={inputs.value}
          onChange={handleChange}
        />
        <TextField
          id="outlined-select-currency"
          select
          defaultValue="" 
          label="Select"
          name="category"
          value={inputs.value}
          onChange={handleChange}
        >
          <MenuItem value="sports">
            Sports
          </MenuItem>
          <MenuItem value="concert">
            Concert
          </MenuItem>
          <MenuItem value="culture">
            Culture
          </MenuItem>

        </TextField>
        <TextField
          variant='outlined'
          id="outlined-required"
          type="date"
          name="date"
          value={inputs.value}
          onChange={handleChange}
          >
          Date
        </TextField>
        <TextField
          required
          variant='outlined'
          id="outlined-required"
          label="€"
          type="number"
          name="price"
          value={inputs.value}
          onChange={handleChange}
        />
        <TextField
          required
          variant='outlined'
          id="outlined-required"
          type="file"
          name="image"
          value={inputs.value}
          onChange={(e) => handleFileUpload(e)}
        />
        <Button type="submit" variant='outlined'>Submit</Button>
      </Box>


    </>
  )
}

export default AddEvent
