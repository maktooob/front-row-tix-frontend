import axios from 'axios'
import {useContext, useState} from 'react'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {AuthContext} from '../context/auth.context'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const EventEditPage = (props) => {
  const {user} = useContext(AuthContext)

  const location = useLocation()
  let navigate = useNavigate()
  const {id} = useParams()
  const [inputs, setInputs] = useState({})
  const [image, setImage] = useState("")

  const updateEvent = (image) => {
    const updatedEvent = {
      title: inputs.title,
      description: inputs.description,
      category: inputs.category,
      location: inputs.location,
      price: inputs.price,
      image: image,
    }
    axios
      .put(`${process.env.REACT_APP_API_BASE_URL}/events/${id}`, 
      updatedEvent, 
      { headers: { user: user?.status},
      })
      .then((res) => {
        console.log(updateEvent)
      })
      .catch((e) => console.log(e))
  }
  const handleEventUpload = () => {
    const uploadData = new FormData()
    uploadData.append("image", image)
    axios.post(process.env.REACT_APP_API_BASE_URL + "/upload",
      uploadData,
      { headers: { user: user.status } })
      .then(response => {
        updateEvent(response.data.fileUrl)
      })
      .catch(e => console.log(e))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleEventUpload()
    navigate(`/events/${id}`)
  }
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({...values, [name]: value}))
  }
  return (
    <div>
      <h1 style={{textAlign: "center"}}>Happy editing :) !!</h1>

      <Box
        component="form"
        maxWidth="xl"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' }, display: "flex", alignItems:"center", flexWrap: "wrap", justifyContent:"space-around",
        }}
        noValidate
        autoComplete="off"
        size="small"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          sx={{flex: "1 1 calc(33% - 2em)"}}
          variant='outlined'
          id="outlined-size-small"
          label="Title"
          name="title"
          defaultValue={location.state.foundEvent.title}
          value={inputs.value}
          onChange={handleChange}
        />
        <TextField
          required
          sx={{flex: "1 1 calc(33% - 2em)"}}
          variant='outlined'
          id="outlined-required"
          label="Description"
          name="description"
          defaultValue={location.state.foundEvent.description}
          value={inputs.value}
          onChange={handleChange}
        />
        <TextField
          required
          sx={{flex: "1 1 calc(33% - 2em)"}}
          variant='outlined'
          id="outlined-required"
          label="Location"
          name="location"
          defaultValue={location.state.foundEvent.location}
          value={inputs.value}
          onChange={handleChange}
        />
        <TextField
          id="outlined-select-currency"
          sx={{flex: "1 1 calc(33% - 2em)"}}
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
        sx={{flex: "1 1 calc(33% - 2em)"}}
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
        sx={{flex: "1 1 calc(33% - 2em)"}}
          required
          variant='outlined'
          id="outlined-required"
          label="€"
          type="number"
          name="price"
          defaultValue={location.state.foundEvent.price}
          value={inputs.value}
          onChange={handleChange}
        />
        <TextField
        sx={{flex: "1 1 calc(33% - 2em)"}}
          required
          variant='outlined'
          id="outlined-required"
          type="file"
          name="image"
          value={inputs.value}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button style={{flex: "1 1 calc(33% - 2em)"}} type="submit" className="fancy">
          <span className="top-key"></span>
          <span className="text">Add Event</span>
          <span className="bottom-key-1"></span>
          <span className="bottom-key-2"></span>
        </button>
        
      </Box>

    </div>
  )
}

export default EventEditPage
