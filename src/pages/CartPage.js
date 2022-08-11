import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CartPage = (props) => {

  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(null)
  const newArr = [...cart, props.cart]

  useEffect(() => {
    setCart(newArr)
  }, [])

  /// don´t show duplicates, instead quantity
  const preparedArr = props.cart.reduce((acc, cur) => {
    const existingItem = acc.find(item => cur._id === item._id);
    if (existingItem) {
      existingItem.quantity++;
    }
    else {
      acc.push({ ...cur, quantity: 1 });
    }
    return acc;
  }, [])

  const totalPrice = props.cart.reduce((acc, { price }) => acc + price, 0)
  useEffect(() => {
    setTotal(totalPrice)
  }, [preparedArr])


  return (
    <div>

      
      <div>
        <div className="cart-head">

        <Link className="back-link" style={{ display: "inline", textDecoration: 'none', color: 'black' }} to="/events"><ArrowBackIosIcon sx={{ fontSize: "3rem", marginLeft: "2rem", textDecoration: "none" }} /></Link>
        <h1 className="cart-title">YOUR SHOPPING CART</h1>
        <div className="pseudo"><Link className="back-link" style={{ display: "inline", textDecoration: 'none', color: 'black' }} to="/events"><ArrowBackIosIcon sx={{ fontSize: "3rem", marginLeft: "2rem", textDecoration: "none" }} /></Link></div>
        </div>
        <div className="cart">
          {preparedArr ? (
            preparedArr.map((element) => {
              return (

                <div key={element._id} className="cart-ctn">
                  <img id="cart-img" src={element.image} alt="event" />
                  <h3>{element.title}</h3>
                  <p>Location:   {element.location}</p>
                  <div className="quant"><p>Quantity:   {element.quantity}</p>
                    <div className="cart-btn">
                      <span onClick={() => { props.addToCartCallback(element._id) }}><ExpandLessIcon style={{ cursor: "pointer" }} /></span>
                      <span onClick={() => { props.removeFromCartCallback(element._id) }}><ExpandMoreIcon style={{ cursor: "pointer" }} /></span>
                    </div></div>
                  <p id="price-cart">Price:   {element.price} €</p>
                </div>
              )
            })
          ) : (
            <p>loading...</p>
          )}
        </div>
        {cart[0]?.length > 0 ?
        <div className="total-ctn">
        <div className="proceed">
          <p className="total">Total: <span id="total-margin">{total} €</span></p>
          <Link className="fancy" to="/order">
                        <span className="top-key"></span>
                        <span className="text">Proceed to checkout</span>
                        <span className="bottom-key-1"></span>
                        <span className="bottom-key-2"></span>
                    </Link>
        </div>
        </div>
        : <h3 style={{textAlign: "center", marginTop: "4rem"}}>Your cart is empty</h3>}
      </div>
    </div>
  )
}

export default CartPage
