import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const CartPage = (props) => {

  //const {user} = useContext(AuthContext)
    const [cart, setCart] = useState([])

const newArr = [...cart, props.cart]

 useEffect(() => {
    setCart(newArr)
 }, [])

console.log("coming from props", props.cart,"just props", props,  "///inside cart", cart[0])
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


console.log("xart", cart)
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
                <p>amount: {element.count}</p>
                <p>{element.description}</p>
                <p>{element.location}</p>
                <p>{element.price}</p>
                <button onClick={() => {props.addToCartCallback(element._id)}}>+</button>
                <button onClick={() => {props.removeFromCartCallback(element._id)}}>-</button>
              </div>
            )
          })
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  )
}

export default CartPage
