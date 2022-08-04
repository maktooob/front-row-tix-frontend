const { NavLink } = require("react-router-dom")

const Navbar = () => {

    return <>
    <NavLink to="/">Home | </NavLink>
    <NavLink to="/events">Browse all events | </NavLink>
    <NavLink to="/login">Login | </NavLink>
    <NavLink to="/signup">Signup</NavLink>
    </>
    
}

export default Navbar