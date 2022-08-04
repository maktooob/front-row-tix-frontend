const { default: axios } = require("axios");
const { useState, useEffect } = require("react");
const { useParams, Link, useNavigate } = require("react-router-dom");

const EventDetailsPage = () => {
    let navigate = useNavigate()
    const {id} = useParams()
    const [foundEvent, setFoundEvent] = useState({})
    const searchDB = () => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/events/${id}`)
    .then(res => setFoundEvent(res.data) )
    .catch(e => console.log("Could not get event from DB by ID", e))
}
    useEffect(() => {
        searchDB()
    }, [])

    const deleteFromDB = () => {
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/events/${id}`)
        .then(res => navigate("/events"))
        .catch(e => console.log(e))
    }
    
    return ( <>
        {foundEvent ?
        <div>
            <h3>{foundEvent.title}</h3>
            <p>{foundEvent.description}</p>
            <p>{foundEvent.location}</p>
            <p>{foundEvent.category}</p>
            <p>{foundEvent.price}</p>
            <Link to={`/events/edit/${id}`} state={{foundEvent}} ><button >Edit</button></Link>
            <button onClick={deleteFromDB}>Delete</button>
        </div>
        :
        <p>loading</p>}

       </>
    )
}

export default EventDetailsPage