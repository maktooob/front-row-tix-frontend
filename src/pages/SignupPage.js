import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const SignupPage = () => {
let navigate = useNavigate()
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
    })
    .catch(e => console.log(e))
}

const handleSubmit = (e) => {
    e.preventDefault()
    userSignup()
    
    navigate('/')
  }

const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({...values, [name]: value}))
      }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type='text'
            name='username'
            value={inputs.username || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type='text'
            name='email'
            value={inputs.email || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Password
          <input
            type='password'
            name='password'
            value={inputs.password || ''}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up</button>
        </form>
        </div>
    )
}

export default SignupPage