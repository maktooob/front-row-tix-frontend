import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

const { NavLink } = require("react-router-dom")


const Navbar = () => {
    const { logOutUser } = useContext(AuthContext)

    return <>
    <NavLink to="/">Home | </NavLink>
    <NavLink to="/events">Browse all events | </NavLink>
    <NavLink to="/login">Login | </NavLink>
    <NavLink to="/signup">Signup | </NavLink>
    <NavLink to="/cart">Your Cart</NavLink>
    <button onClick={logOutUser}>Logout</button>
    </>
    
}

export default Navbar