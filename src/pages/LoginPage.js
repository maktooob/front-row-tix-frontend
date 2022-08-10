import { Box, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'


const LoginPage = () => {
  let navigate = useNavigate()
  const [inputs, setInputs] = useState('')
  const { storeToken, authenticateUser } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState("")
  const userLogin = () => {
    const user = {
      username: inputs.username,
      password: inputs.password,
    }
    axios
      .post(process.env.REACT_APP_API_BASE_URL + '/login', user)
      .then((res) => {
        console.log('login successful')
        console.log(res.data)
        storeToken(res.data.authToken)
        authenticateUser()
        navigate('/')
      })
      .catch((error) => {
        const errorDescription = error.response.data.errorMessage;
        setErrorMessage(errorDescription);
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    userLogin()

  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh" }}>
      <h1>Login</h1>
      <Box width="100vw" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '20rem' },
            display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "20rem", alignItems: "center", padding: "1rem"
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
            label="Password"
            type="password"
            name="password"
            value={inputs.value}
            onChange={handleChange}
          />
          <button type="submit" style={{width: "100%"}} class="fancy" to="/events">
            <span class="top-key"></span>
            <span class="text">Log In</span>
            <span class="bottom-key-1"></span>
            <span class="bottom-key-2"></span>
          </button>
          {errorMessage && <Typography sx={{ fontSize: "small", color: "tomato" }} className="error-message">{errorMessage}</Typography>}
          <Typography sx={{ color: "text.secondary" }}>Don´t have an account? Create one <Link to="/signup">here</Link>!</Typography>


        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage
