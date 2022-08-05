import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
//import { AuthContext } from "../context/auth.context"

const CartPage = (props) => {

  //const {user} = useContext(AuthContext)
    const [cart, setCart] = useState([])
//   const newArr = [...cart, props.cart]
const newArr = [...cart, props.cart]
 useEffect(() => {
    setCart(newArr)
 }, [])

  console.log("coming from props", props.cart, "///inside cart", cart[0])
  
  return (
    <div>
      <div>
        <h1>Your shopping cart!</h1>
        <Link to="/order">Proceed to checkout</Link>
        {cart[0] ? (
          cart[0].map((element) => {
            return (
              <div key={element._id}>
                <h3>{element.title}</h3>
                <p>{element.description}</p>
                <p>{element.location}</p>
                <p>{element.price}</p>
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
