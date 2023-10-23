import {Routes, Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import EventDetailsPage from './pages/EventDetailsPage'
import EventListPage from './pages/EventListPage'
import EventEditPage from './pages/EventEditPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import CartPage from './pages/CartPage'
import Homepage from './pages/Homepage'
import {useContext, useState} from 'react'
import axios from 'axios'
import OrderPage from './pages/OrderPage'
import IsAnon from './components/IsAnon'
import IsPrivate from './components/IsPrivate'
import UserPage from './pages/UserPage'
import React from 'react'




function App() {


  const [cart, setCart] = useState([])
  const addToCart = (id) => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/events/${id}`)
      .then((res) => {
        const newArr = [...cart, res.data]
        setCart(newArr)
      })
      .catch((e) => console.log(e))
  }

  const removeFromCart = (id) => {
    const indexToRemove = cart.findIndex((element) => {
      return element._id === id
    })
    const copy = [...cart]
    copy.splice(indexToRemove, 1)
    setCart(copy)
  }
  const clearCart = () => {
    setCart([])
  }
  return (
    <div className='App'>
      <Navbar cart={cart} />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/events' element={<EventListPage />} />
        <Route
          path='/events/:id'
          element={
            <EventDetailsPage addToCartCallback={(id) => addToCart(id)} />
          }
        />

        <Route path='/events/edit/:id' element={<EventEditPage />} />

        <Route
          path='/signup'
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />

        <Route
          path='/login'
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

        <Route
          path='/cart'
          element={
            <IsPrivate>
              <CartPage
                cart={cart}
                addToCartCallback={(id) => addToCart(id)}
                removeFromCartCallback={(id) => removeFromCart(id)}
              />
            </IsPrivate>
          }
        />
        <Route
          path='/order'
          element={
            <IsPrivate>
              <OrderPage
                cart={cart}
                removeFromCartCallback={(id) => removeFromCart(id)}
                clearCartCallback={clearCart}
              />
            </IsPrivate>
          }
        />
        <Route path={`/user/:id`} element={<UserPage />} />
      </Routes>
    </div>
  )
}

export default App
