import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {AuthContext} from '../context/auth.context'
import Button from '@mui/material/Button'
import {Link} from 'react-router-dom'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import {Box, TextField, Typography} from '@mui/material'


const OrderPage = (props) => {
  const {user} = useContext(AuthContext)
  const [inputs, setInputs] = useState('')
  const [total, setTotal] = useState(null)
  const [orderStatus, setOrderStatus] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({...values, [name]: value}))
  }

  const addOrder = () => {
    const newArr = props.cart.map((element) => {
      let amount = props.cart.filter((event) => event._id === element._id).length
      let singleEvent = {eventId: element._id, quantity: amount}
      return singleEvent
    })
    const key = 'eventId'
    const arrayUniqueByKey = [...new Map(newArr.map((item) => [item[key], item])).values()] // thank you Karina :) -> Reducing Array with duplicates to distinct and showing quantity

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
    const storedToken = localStorage.getItem('authToken')
    axios
      .post(process.env.REACT_APP_API_BASE_URL + '/order', order, {headers: {Authorization: `Bearer ${storedToken}`}})

      .then((response) => {
        console.log(response)
        setInputs('')
        props.clearCartCallback()
      })
      .catch((e) => console.log(e))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputs.name || !inputs.street || !inputs.zip || !inputs.city    || inputs.country === 0 || (total === undefined || 0) ) {
      setErrorMessage("Please fill out the required fields.")
      return
    }
    console.log(props.cart)
    if(props.cart.length < 1){
      setErrorMessage("Your cart is empty.")
      return
    }
    
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
          

      {orderStatus ? (
        <div className='success-page'>
          <div className='success-ctn'>
            <p style={{mb: '2rem'}}>
              Thank you for your purchase! <br></br>We have sent you an email with further information!
            </p>
            <Link class='fancy' to='/events'>
              <span className='top-key'></span>
              <span className='text'>Keep shopping!</span>
              <span className='bottom-key-1'></span>
              <span className='bottom-key-2'></span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className='cart-head'>
            <Link className='back-link' style={{display: 'inline', textDecoration: 'none', color: 'black'}} to='/events'>
              <ArrowBackIosIcon sx={{fontSize: '3rem', marginLeft: '2rem', textDecoration: 'none'}} />
            </Link>
            <h1 className='cart-title'>Complete your order!</h1>
            <div className='pseudo'>
              <Link className='back-link' style={{display: 'inline', textDecoration: 'none', color: 'black'}} to='/events'>
                <ArrowBackIosIcon sx={{fontSize: '3rem', marginLeft: '2rem', textDecoration: 'none'}} />
              </Link>
            </div>
          </div>
          <div className='order-page'>
            <Box
              component='form'
              sx={{
                '& .MuiTextField-root': {m: 1, width: '100%'},
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                minWidth: '30vw',
                justifyContent: 'center',
                maxWidth: '20rem',
                alignItems: 'center',
                padding: '1rem',
              }}
              onSubmit={handleSubmit}
              noValidate
              autoComplete='off'
            >
              <TextField required variant='outlined' label='Full name' type='text' name='name' value={inputs.value} onChange={handleChange} />
              <TextField required variant='outlined' label='Street' type='text' name='street' value={inputs.value} onChange={handleChange} />
              <TextField required variant='outlined' label='City' type='text' name='city' value={inputs.value} onChange={handleChange} />
              <TextField required variant='outlined' label='Zip Code' type='text' name='zip' value={inputs.value} onChange={handleChange} />
              <TextField required variant='outlined' label='Country' type='text' name='country' value={inputs.value} onChange={handleChange} />
              {errorMessage && <Typography sx={{ fontSize: "medium", color: "tomato" }} className="error-message">{errorMessage}</Typography>}
              <button type='submit' style={{width: '100%'}} class='fancy' to='/events'>
                <span className='top-key'></span>
                <span className='text'>Buy now!</span>
                <span className='bottom-key-1'></span>
                <span className='bottom-key-2'></span>
              </button>

            </Box>

            <div className='order'>
              {preparedArr ? (
                preparedArr.map((element) => {
                  return (
                    <div key={element._id} className='order-inner'>
                      <img id='cart-img' src={element.image} alt='event' />
                      <h3>{element.title}</h3>
                      <p>Location: {element.location}</p>
                      <div className='quant'>
                        <p>Quantity: {element.quantity}</p>
                      </div>
                      <p id='price-cart'>Price: {element.price} €</p>
                    </div>
                  )
                })
              ) : (
                <p>loading...</p>
              )}

              <div className='total-ctn'>
                <div className='proceed'>
                  <p className='total'>
                    Total: <span id='total-margin'>{total} €</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OrderPage
