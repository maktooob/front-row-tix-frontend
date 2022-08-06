import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
const { NavLink } = require("react-router-dom")


const Navbar = (props) => {
    const { logOutUser, user } = useContext(AuthContext)
    console.log(user)
    return <>
    <NavLink to="/">Home | </NavLink>
    <NavLink to="/events">Browse all events | </NavLink>
    <NavLink to="/login">Login | </NavLink>
    <NavLink to="/signup">Signup | </NavLink>
    <NavLink to="/cart">Your Cart {props.cart.length} | </NavLink>
    <NavLink to={`/profile/${user?._id}`}>{user?.username}  </NavLink>
    <button onClick={logOutUser}>Logout</button>
    </>
    
}

export default Navbar