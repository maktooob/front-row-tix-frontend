import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const CartPage = (props) => {

  //const {user} = useContext(AuthContext)
const [cart, setCart] = useState([])
const [total, setTotal] = useState(null)
const newArr = [...cart, props.cart]

 useEffect(() => {
    setCart(newArr)
 }, [])

/// don´t show duplicates, instead quantity
const preparedArr = props.cart.reduce((acc, cur) => {
  const existingItem = acc.find(item => cur._id === item._id);
  if(existingItem) {
       existingItem.quantity++;
    }
  else {
       acc.push({...cur, quantity: 1});    
    }
    return acc;
 }, [])

 const totalPrice = props.cart.reduce((acc, {price}) => acc + price, 0)
 useEffect(() => {
  setTotal(totalPrice)
 }, [preparedArr])


console.log("XXXX", preparedArr, "XXXXXXXXXXXXXXXXX")
  return (
    <div>
      <div>
        <h1>Your shopping cart!</h1>
        <Link to="/order">Proceed to checkout</Link>
        {preparedArr ? (
          preparedArr.map((element) => {
            return (
              <div key={element._id}>
                <h3>{element.title}</h3>
                <p>amount: {element.quantity}</p>
                <p>Description: {element.description}</p>
                <p>Location: {element.location}</p>
                <p>Price: {element.price}</p>
                <button onClick={() => {props.addToCartCallback(element._id)}}>+</button>
                <button onClick={() => {props.removeFromCartCallback(element._id)}}>-</button>
              </div>
            )
          })
          
        ) : (
          <p>loading...</p>
        )}
      </div>
      <div>Total: {total}</div>
    </div>
  )
}

export default CartPage
