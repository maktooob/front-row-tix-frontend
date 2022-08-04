import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import EventDetailsPage from './pages/EventDetailsPage';
import EventListPage from './pages/EventListPage';
import EventEditPage from './pages/EventEditPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import Homepage from './pages/Homepage';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [cart, setCart] = useState([])
  console.log(cart)
  const addToCart = (id) => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/events/${id}`)
    .then(res => {
      const newArr = [...cart, res.data]
      setCart(newArr)
    })
    .catch(e => console.log(e))
    console.log("cart", cart, "props", id)
  }

  console.log(cart)
  return (
    <div className="App">
      <Navbar />

    <Routes>
      <Route path='/' element={<Homepage />}/>
      <Route path='/events' element={<EventListPage/>}/>
      <Route path='/events/:id' element={<EventDetailsPage addToCartCallback={(id) => addToCart(id)}/>}/>
      <Route path='/events/edit/:id' element={<EventEditPage />}/>
      <Route path='/signup' element={<SignupPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/cart' element={<CartPage cart={cart}/>}/>
    </Routes>


    </div>
  );
}

export default App;
