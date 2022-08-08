import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../context/auth.context"


const UserPage = () => {
  const {id} = useParams()

  const [orders, setOrders] = useState('')
  const {user} = useContext(AuthContext)
  console.log(user)
  const fetchOrders = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/orders/${id}`)
      .then((res) => setOrders(res.data))
      .catch((e) => console.log(e))
  }
  useEffect(() => {
    fetchOrders()
    console.log("orders", orders)
  }, [])
  console.log("orders", orders)
  return <div>
    <h1>Hey there, {user?.username}!</h1>
      <h3>Your order history:</h3>
      {orders ? 
      orders.map((order) => {
        return <div>
          {console.log("tp",order)}
          <p>tp: {order.totalPrice}</p>
          <div>Order-ID: {order._id}</div> 
          {order.events.map(event => {
           return <div>
            <p>Event: {event.eventId.title}</p>
            <p>Price:{event.eventId.price} €</p>
           </div>
          })}
          <p>Total: {order.totalPrice} €</p>
          <hr></hr>
        </div>
        
      })
       
    :
    <div>no orders</div>
    }

  </div>
}


export default UserPage