import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const LoginPage = () => {
let navigate = useNavigate()
const [inputs, setInputs] = useState("")
const userLogin = () => {
    const user = {
        username: inputs.username,
        password: inputs.password
    }
    axios.post(process.env.REACT_APP_API_BASE_URL + '/login', user)
    .then(res => {
      console.log("login successful")
    })
    .catch(e => console.log(e))
}

const handleSubmit = (e) => {
    e.preventDefault()
    userLogin()
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
          Password
          <input
            type='password'
            name='password'
            value={inputs.password || ''}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
        </form>
        </div>
    )
}

export default LoginPage