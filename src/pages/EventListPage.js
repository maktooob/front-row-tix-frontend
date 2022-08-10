import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddEvent from '../components/AddEvent'
import IsAdmin from '../components/IsAdmin'
import { AuthContext } from '../context/auth.context'
import moment from 'moment'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, CardActionArea, CardActions } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const EventListPage = () => {
  const [events, setEvents] = useState('')
  const { user } = useContext(AuthContext)
  const [showForm, setShowForm] = useState(false)
  const unrollForm = () => {
    setShowForm(true)
  }
  const reUnrollForm = () => {
    setShowForm(false)
  }

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
    <Box maxWidth="xxl" sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <div className="headline">
        <h1 className='hero-line'>ALL OUR EVENTS</h1>
        <p className='subhero'>Browse through all our events and pick your favorite!</p>
      </div>
      <IsAdmin>
        <div>
          <span onClick={unrollForm}><AddCircleOutline sx={{ cursor: "pointer", fontSize: "2rem", textDecoration: "none", color: "black" }} /></span>
          <span onClick={reUnrollForm}><RemoveCircleOutlineIcon sx={{ cursor: "pointer", fontSize: "2rem", textDecoration: "none", color: "black" }} /></span>
        </div>
        {showForm &&
          <AddEvent component="div" maxWidth="50vw" fetchEventsCallback={fetchEvents} />}
      </IsAdmin>

      <Box maxWidth='xl' sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {events ? (
          events.map((element) => {
            return (
              <>
                <Card  sx={{ maxWidth: 345, maxHeight: 'auto', mb: '1rem', mr: '1rem', mt: "2rem", borderRadius: "10px", boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff' }}>
                  <CardActionArea component={Link} to={`/events/${element._id}`}>
                    <CardMedia component='img' height='180' image={element.image} alt='green iguana' sx={{ objectFit: 'cover' }} />
                    <CardContent>
                      <Typography gutterBottom variant='h4' component='div'>
                        {element.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant='subtitle1' sx={{ display: 'flex', alignItems: 'center', mb: '1rem' }} color='text.secondary'>
                            <QueryBuilderIcon sx={{ mr: '0.6rem' }} />
                            {moment(element.date).format('MMM Do YY')}
                          </Typography>
                          <Typography sx={{ display: 'flex', alignItems: 'center' }} variant='subtitle1' color='text.secondary'>
                            <LocationOnIcon sx={{ mr: '0.6rem' }} />
                            {element.location}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: '1.5rem' }} color='text.secondary'>
                            {element.price} €
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Link class="fancy" to={`/events/${element._id}`}>
                        <span class="top-key"></span>
                        <span class="text">Details</span>
                        <span class="bottom-key-1"></span>
                        <span class="bottom-key-2"></span>
                    </Link>
                  </CardActions>
                </Card>
              </>
            )
          })
        ) : (
          <>
            <p>loading</p>
          </>
        )}
      </Box>
    </Box>
  )
}

export default EventListPage
