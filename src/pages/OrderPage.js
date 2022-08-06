
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"

const OrderPage = (props) => {
  const {user} = useContext(AuthContext)
  const [inputs, setInputs] = useState("")
console.log("context",useContext(AuthContext))
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({...values, [name]: value}))
  }
  useEffect(() => {
    console.log("user", user)
  },[])
console.log("user again", user)
  
  const addOrder = () => {
    const newArr = props.cart.map(element => {
    let amount = props.cart.filter((event) => event._id === element._id).length
    let singleEvent = {eventId: element._id,
      quantity: amount}
      return singleEvent
    })
    const key = "eventId"
    const arrayUniqueByKey = [...new Map(newArr.map(item =>
      [item[key], item])).values()] // thank you Karina :) -> Reducing Array with duplicates to distinct and showing quantity

    console.log("newArr", newArr, "set", "keyarr",arrayUniqueByKey )
    const order =  {
      userId: user._id,
      events: arrayUniqueByKey,
      address: { 
        name: inputs.name,
        street: inputs.street,
        zip: inputs.zip,
        city: inputs.city,
        country: inputs.country,
      },
      totalPrice: Number
    }
 

    axios.post(process.env.REACT_APP_API_BASE_URL+"/order", order) 
    .then((response) => {
      console.log(response)
      setInputs("")
    })
    .catch(e => console.log(e))
    }
    
  const handleSubmit = (e) => {
    e.preventDefault()
    addOrder()
  }

  const preparedArr = props.cart.reduce((acc, cur) => {
    const existingItem = acc.find(item => cur._id === item._id);
    if(existingItem) {
         existingItem.count++;
      }
    else {
         acc.push({...cur, count: 1});    
      }
      return acc;
   }, [])
   console.log(preparedArr)

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
        <button type="Submit"> Buy now!</button>
      </form>
      {preparedArr.map(element => {
        return <div key={element._id}>
          
          <p>{element.title}</p>
          <p>{element.price}</p>
          <p>Amount: {element.count}</p>

        </div>
        })}
    </>
  )
}

export default OrderPage
