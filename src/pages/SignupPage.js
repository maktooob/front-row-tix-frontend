import { Box, Button, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"


const SignupPage = () => {
let navigate = useNavigate()
const [errorMessage, setErrorMessage] = useState("")
const [inputs, setInputs] = useState("")
const userSignup = () => {
    const newUser = {
        username: inputs.username,
        email: inputs.email,
        password: inputs.password
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/signup`, newUser)
    .then(res => {
      console.log("signup successful")
      navigate('/')
    })
    .catch((error) => {
      const errorDescription = error.response.data.errorMessage;
      setErrorMessage(errorDescription);
  })
}

const handleSubmit = (e) => {
    e.preventDefault()
    userSignup()
  }

const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({...values, [name]: value}))
      }

    return(
        <div>
            
            

    <Box width="100vw" sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "80vh"}}>
    <h1>Create an account!</h1>
      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '20rem' },
          display: "flex", flexDirection: "column", justifyContent:"center",  maxWidth: "20rem", alignItems: "center", padding: "1rem"
        }}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off">
        <TextField
          required
          variant='outlined'
          label="Username"
          type="text"
          name="username"
          value={inputs.value}
          onChange={handleChange}
          
        />
        <TextField
          required
          variant='outlined'
          label="Email"
          type="email"
          name="email"
          value={inputs.value}
          onChange={handleChange}
        />
        <TextField
          required
          variant='outlined'
          label="Password"
          type="password"
          name="password"
          value={inputs.value}
          onChange={handleChange}
        />
        {errorMessage && <Typography  sx={{fontSize: "small", color: "tomato"}} className="error-message">{errorMessage}</Typography>}
        <button type="submit" style={{width: "100%"}} class="fancy" to="/events">
            <span className="top-key"></span>
            <span className="text">Sign Up</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </button>
        <Typography sx={{color: "text.secondary"}}>Already have an account? Log in <Link to="/login">here</Link>!</Typography>
      </Box>
      </Box>

        </div>
    )
}

export default SignupPage