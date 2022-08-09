import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import AddEvent from '../components/AddEvent'
import IsAdmin from '../components/IsAdmin'
import {AuthContext} from '../context/auth.context'
import moment from 'moment'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {Box, Button, CardActionArea, CardActions} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'

const EventListPage = () => {
  const [events, setEvents] = useState('')
  const {user} = useContext(AuthContext)
  console.log('user:', user)
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
      <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
        {events ? (
          events.map((element) => {
            return (
              <>
                <Card sx={{maxWidth: 345, maxHeight: 'auto', mb: '1rem', mr: '1rem'}}>
                  <CardActionArea component={Link} to={`/events/${element._id}`}>
                    <CardMedia component='img' height='180' image={element.image} alt='green iguana' sx={{objectFit: 'cover'}} />
                    <CardContent>
                      <Typography gutterBottom variant='h4' component='div'>
                        {element.title}
                      </Typography>
                      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Box>
                          <Typography variant='subtitle1' sx={{display: 'flex', alignItems: 'center', mb: '1rem'}} color='text.secondary'>
                            <QueryBuilderIcon sx={{mr: '0.6rem'}} />
                            {moment(element.date).format('MMM Do YY')}
                          </Typography>
                          <Typography sx={{display: 'flex', alignItems: 'center'}} variant='subtitle1' color='text.secondary'>
                            <LocationOnIcon sx={{mr: '0.6rem'}} />
                            {element.location}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography sx={{fontSize: '1.5rem'}} color='text.secondary'>
                            {element.price} €
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                    <Link to={`/events/${element._id}`} style={{textDecoration: 'none'}}>
                      <Button sx={{display: 'flex'}} variant='outlined'>
                        Details
                      </Button>
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
    </div>
  )
}

export default EventListPage
