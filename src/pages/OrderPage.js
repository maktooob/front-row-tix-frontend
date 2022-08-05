
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"



const OrderPage = (props) => {
  const {user} = useContext(AuthContext)
  const [inputs, setInputs] = useState("")

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({...values, [name]: value}))
  }
  console.log(user,"2")
  const addOrder = () => {
  
    const order =  {
      events: [{
        event: props.cart._id,
        quantity: Number
      }],
      address: { 
        name: inputs.name,
        street: inputs.street,
        zip: inputs.zip,
        city: inputs.city,
        country: inputs.country,
      },
      totalPrice: Number
    }
    }

  const handleSubmit = () => {

  }


  return (
    <>
      <div>Complete your order</div>
      <form id='addEvent' onSubmit={handleSubmit}>
        <h3>Submit your shipping details</h3>
        <label>
          Full name
          <input
            type='text'
            name='name'
            value={inputs.name || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Street
          <input
            type='text'
            name='street' 
            value={inputs.street || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          City
          <input
            type='text'
            name='city'
            value={inputs.city || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Zip code
          <input
            type='number'
            name='zip'
            value={inputs.zip || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Country
          <input
            type='text'
            name='country'
            value={inputs.country || ''}
            onChange={handleChange}
          />
        </label>
        <input type='submit' />
      </form>
    </>
  )
}

export default OrderPage
