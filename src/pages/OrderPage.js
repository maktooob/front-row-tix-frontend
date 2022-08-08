import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {AuthContext} from '../context/auth.context'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'


const OrderPage = (props) => {

  let navigate = useNavigate()
  const {user} = useContext(AuthContext)
  const [inputs, setInputs] = useState('')
  const [total, setTotal] = useState(null)
  const [orderStatus, setOrderStatus] = useState(false)

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({...values, [name]: value}))
  }
  useEffect(() => {
    console.log('user', user)
  }, [])
  console.log('user again', user)

  const addOrder = () => {
    const newArr = props.cart.map((element) => {
      let amount = props.cart.filter(
        (event) => event._id === element._id
      ).length
      let singleEvent = {eventId: element._id, quantity: amount}
      return singleEvent
    })
    const key = 'eventId'
    const arrayUniqueByKey = [
      ...new Map(newArr.map((item) => [item[key], item])).values(),
    ] // thank you Karina :) -> Reducing Array with duplicates to distinct and showing quantity

    console.log('newArr', newArr, 'set', 'keyarr', arrayUniqueByKey)
    const order = {
      userId: user._id,
      events: arrayUniqueByKey,
      address: {
        name: inputs.name,
        street: inputs.street,
        zip: inputs.zip,
        city: inputs.city,
        country: inputs.country,
      },
      totalPrice: total,
    }

    axios
      .post(process.env.REACT_APP_API_BASE_URL + '/order', order)
      .then((response) => {
        console.log(response)
        setInputs('')
        props.clearCartCallback()
      })
      .catch((e) => console.log(e))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addOrder()
    setTotal(0)
    setOrderStatus(true)
  }
  /// don´t show duplicates, instead quantity
  const preparedArr = props.cart.reduce((acc, cur) => {
    const existingItem = acc.find((item) => cur._id === item._id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      acc.push({...cur, quantity: 1})
    }
    return acc
  }, [])

  const totalPrice = props.cart.reduce((acc, {price}) => acc + price, 0)
  useEffect(() => setTotal(totalPrice), [])



  return (
    <>
    {orderStatus ? 
    <div>
      <div>Thank you for your purchase! Your order has been placed successfully!</div>
      <Link to="/">Keep shopping</Link>
    </div>
      : <div>
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
        <h3>Total: {total} €</h3>
        <Button type='submit'  variant='contained'>
          Buy now!
        </Button>
        {/* <button type="Submit"> Buy now!</button> */}
      </form>
      {preparedArr.map((element) => {
        return (
          <div key={element._id}>
            <p>{element.title}</p>
            <p>{element.price}</p>
            <p>Amount: {element.quantity}</p>
          </div>
        )
      })}
      </div> }
    </>
  )
}

export default OrderPage
