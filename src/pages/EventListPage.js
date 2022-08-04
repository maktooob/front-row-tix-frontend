import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AddEvent from "../components/AddEvent"

const EventListPage = () => {
    const [events, setEvents] = useState("")
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/events`)
        .then(res => setEvents(res.data))
        .catch(e => console.log(e))
    }, [])
    

    return(
        <div>
            <h1>Choose an event</h1>
            <AddEvent />
            {events ? 
            events.map(element => {
                return <div key={element._id}>
                    <h3>{element.title}</h3>
                    <p>{element.description}</p>
                    <p>{element.price}</p>
                   <Link to={`/events/${element._id}`}> <button>Details</button></Link>

                </div>
            })
            : <p>loading...</p>}


        </div>
    )
}

export default EventListPage