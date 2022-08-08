import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import AddEvent from '../components/AddEvent'
import IsAdmin from '../components/IsAdmin'
import {AuthContext} from '../context/auth.context'
import moment from 'moment';

const EventListPage = () => {
  const [events, setEvents] = useState('')
  const {user} = useContext(AuthContext)
  console.log(user)
  const fetchEvents = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/events`)
      .then((res) => setEvents(res.data))
      .catch((e) => console.log(e))
  }
  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div>
      <h1>Choose an event</h1>
      <IsAdmin>
        <AddEvent fetchEventsCallback={fetchEvents} />
      </IsAdmin>
      {events ? ( 
        events.map((element) => {
          return (
            <div key={element._id}>
              <h3>{element.title}</h3>
              <img src={element.image} alt={element.title} />
              <p>{moment(element.date).format("MMM Do YY")}</p>
              <p>{element.price}</p>
              <p>{element.location}</p>
              <p>{element.category}</p>
              <Link to={`/events/${element._id}`}>
                {' '}
                <button>Details</button>
              </Link>
            </div>
          )
        })
      ) : (
        <p>loading...</p>
      )}
    </div>
  )
}

export default EventListPage
