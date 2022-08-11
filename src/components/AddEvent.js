import axios from 'axios'
import { useContext, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';
import { AuthContext } from '../context/auth.context';

const AddEvent = (props) => {

  const { user } = useContext(AuthContext)
  const [inputs, setInputs] = useState({})
  const [image, setImage] = useState(undefined)
  const formRef = useRef()
  const [errorMessage, setErrorMessage] = useState("")

  const addEvent = (uploadImage) => {
    const newEvent = {
      title: inputs.title,
      description: inputs.description,
      category: inputs.category,
      location: inputs.location,
      date: inputs.date,
      price: inputs.price,
      image: uploadImage,
    }

    axios
      .post(process.env.REACT_APP_API_BASE_URL + '/events',
        newEvent,
        { headers: { user: user.status } })
      .then((res) => {
        props.fetchEventsCallback() //add event to List and update the view
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      })
  }
 


  const handleSubmit = (e) => {

    e.preventDefault()

    if (!inputs.title || !inputs.description || !inputs.category || !inputs.location    || inputs.price === 0 || inputs.price === undefined ) {
      setErrorMessage("please fill the required fields.")
      return
    }
    console.log("img", image)
    let uploadData
    if (image) {
    uploadData = new FormData()
    uploadData.append("image", image)}
    else (setImage(undefined))


    axios.post(process.env.REACT_APP_API_BASE_URL + "/upload",
      uploadData,
      { headers: { user: user.status } })
      .then(response => {
        addEvent(response.data.fileUrl)
      })
      .catch(e => console.log(e))

    setErrorMessage("")
    setImage("")
    setInputs("")
    e.target.reset()

  }



  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  return (
    <>
      <Typography color='text.secondary' variant="h5" >Add a new Event! <span style={{ fontSize: "medium" }}>(form only visible for admins)</span></Typography>
      {errorMessage && <Typography sx={{ fontSize: "small", color: "tomato" }} className="error-message">{errorMessage}</Typography>}
      <Box
        component="form"
        ref={formRef}
        maxWidth="xl"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' }, display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-around",
        }}
        noValidate
        autoComplete="off"
        size="small"
        onSubmit={handleSubmit}
      >
        <TextField
          
          sx={{ flex: "1 1 calc(33% - 2em)" }}
          variant='outlined'
          id="outlined-size-small"
          label="Title"
          name="title"
          value={inputs.value}
          onChange={handleChange}
        />
        <TextField
          required
          sx={{ flex: "1 1 calc(33% - 2em)" }}
          variant='outlined'
          id="outlined-required"
          label="Description"
          name="description"
          value={inputs.value}
          onChange={handleChange}
        />
        <TextField
          required
          sx={{ flex: "1 1 calc(33% - 2em)" }}
          variant='outlined'
          id="outlined-required"
          label="Location"
          name="location"
          value={inputs.value}
          onChange={handleChange}
        />
        <TextField
          id="outlined-select-currency"
          sx={{ flex: "1 1 calc(33% - 2em)" }}
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
          sx={{ flex: "1 1 calc(33% - 2em)" }}
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
          sx={{ flex: "1 1 calc(33% - 2em)" }}
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
          sx={{ flex: "1 1 calc(33% - 2em)" }}
          accept="image/png"
          variant='outlined'
          id="outlined-required"
          type="file"
          name="image"
          value={inputs.value}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button style={{ flex: "1 1 calc(33% - 2em)" }} type="submit" onClick={() => formRef.current.reportValidity()} className="fancy">
          <span className="top-key"></span>
          <span className="text">Add Event</span>
          <span className="bottom-key-1"></span>
          <span className="bottom-key-2"></span>
        </button>

      </Box>


    </>
  )
}

export default AddEvent
