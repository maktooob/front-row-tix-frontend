import { AuthContext } from "../context/auth.context";
import RoomIcon from '@mui/icons-material/Room';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
const { default: axios } = require("axios");
const { useState, useEffect, useContext } = require("react");
const { useParams, Link, useNavigate } = require("react-router-dom");


const EventDetailsPage = (props) => {
    const { user } = useContext(AuthContext)
    let navigate = useNavigate()
    const { id } = useParams()
    const [foundEvent, setFoundEvent] = useState({})
    const searchDB = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/events/${id}`)
            .then(res => setFoundEvent(res.data))
            .catch(e => console.log("Could not get event from DB by ID", e))
    }
    useEffect(() => {
        searchDB()
    }, [])


    const deleteFromDB = () => {
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/events/${id}`,
            { headers: { user: user.status } })

            .then(res => navigate("/events"))
            .catch(e => console.log(e))
    }

    return (<>


        {foundEvent ?
            <div className="details">
                <div className="cart-head">
                    <Link style={{ display: "inline", textDecoration: 'none', color: 'black' }} to="/events"><ArrowBackIosIcon sx={{ fontSize: "3rem", marginLeft: "2rem", textDecoration: "none" }} /></Link>
                    <h2 className="details-title">{foundEvent.title}</h2>
                    <div className="pseudo"><Link style={{ display: "inline", textDecoration: 'none', color: 'black' }} to="/events"><ArrowBackIosIcon sx={{ fontSize: "3rem", marginLeft: "2rem", textDecoration: "none" }} /></Link></div>
                </div>
                <div className="inner-details">
                    <div className="for-btn">
                        <div className="hero-details">
                            <img id="details-img" src={foundEvent.image} alt={foundEvent.title} />
                        </div>
                        <div className="info-details">
                            <div className="props">
                                <div className="icon-prop"><RoomIcon /><p>{foundEvent.location}</p></div>
                                <div className="icon-prop"><CategoryIcon /><p>{foundEvent.category}</p></div>
                                <div className="icon-prop"><LocalOfferIcon /><p style={{ fontWeight: "900", fontSize: "1.2rem" }}>{foundEvent.price} €</p></div>
                            </div>
                            <p className="description">{foundEvent.description}</p>
                        </div>
                    </div>
                    {user &&
                    <div className="details-btn">
                        <button onClick={() => { props.addToCartCallback(id) }} style={{ width: "100%", margin: "0" }} class="fancy" to="/events">
                            <span className="top-key"></span>
                            <span className="text">Add To Cart</span>
                            <span className="bottom-key-1"></span>
                            <span className="bottom-key-2"></span>
                        </button>
                    </div>
                    }
                </div>


                {user?.status === "admin" && <div>
                    <Link style={{padding: "2rem"}} to={`/events/edit/${id}`} state={{ foundEvent }} ><button style={{padding: "0.5rem 2rem"}}>Edit</button></Link>
                    <button style={{padding: "0.5rem 2rem"}} onClick={deleteFromDB}>Delete</button>

                </div>}
            </div>

            :
            <p>loading</p>}

    </>
    )
}

export default EventDetailsPage