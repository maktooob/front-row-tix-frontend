import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import AddEvent from '../components/AddEvent'
import IsAdmin from '../components/IsAdmin'
import moment from 'moment'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {Box, CardActionArea, CardActions, TextField} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

const EventListPage = () => {
  const [events, setEvents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [filtered, setFiltered] = useState([])

  const foundEvent = events.filter((element) => element.title.toLowerCase().includes(searchInput.toLowerCase()))

  useEffect(() => {
    setFiltered(foundEvent)
  }, [searchInput, events])

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
    <>
      <Box maxwidth='xxl' sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
        <Box className='headline'>
          <h1 className='hero-line'>ALL OF OUR EVENTS</h1>
          <p className='subhero'>Browse through all our events and pick your favorite!</p>
        </Box>

        {/* add Events Dropdown only admin can see*/}
        <IsAdmin>
          <Box>
            <span onClick={unrollForm}>
              <AddCircleOutline sx={{cursor: 'pointer', fontSize: '2rem', textDecoration: 'none', color: 'black'}} />
            </span>
            <span onClick={reUnrollForm}>
              <RemoveCircleOutlineIcon sx={{cursor: 'pointer', fontSize: '2rem', textDecoration: 'none', color: 'black'}} />
            </span>
          </Box>
          {showForm && <AddEvent component='Box' maxwidth='50vw' fetchEventsCallback={fetchEvents} />}
        </IsAdmin>

        {/* Filter field */}
        <Box>
          <TextField onChange={(e) => setSearchInput(e.target.value)} value={searchInput} sx={{mb: '0.6rem', mt: '2rem', width: '30vw'}} label='SEARCH BY EVENT NAME HERE' />
          <Box sx={{display: "flex", justifyContent: "space-between", mb: "2rem", mt: "0.5rem"}}>
            <Box>Culture</Box>
            <Box>Concert</Box>
            <Box>Sports</Box>
          </Box>
        </Box>

        <Typography sx={{fontWeight: '600'}}>Number of results: {filtered.length} </Typography>

        {/* Result as Cards */}
        <Box maxwidth='xl' sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
          {filtered ? (
            filtered.map((element) => {
              return (
                <Box style={{flex: '1 1 1', flexWrap: 'wrap', width: '18rem'}} key={element._id}>
                  <Card key={element._id} sx={{mb: '1rem', mr: '1rem', mt: '2rem', BoxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff'}}>
                    <CardActionArea component={Link} to={`/events/${element._id}`}>
                      <CardMedia component='img' height='200' width='auto' maxwidth='100%' image={element.image} alt='event' sx={{objectFit: 'cover'}} />
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='Box'>
                          {element.title}
                        </Typography>
                        <Box sx={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
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
                      <Link className='fancy' to={`/events/${element._id}`}>
                        <span className='top-key'></span>
                        <span className='text'>Details</span>
                        <span className='bottom-key-1'></span>
                        <span className='bottom-key-2'></span>
                      </Link>
                    </CardActions>
                  </Card>
                </Box>
              )
            })
          ) : (
            <>
              <Box className='lds-ellipsis'>
                <Box></Box>
                <Box></Box>
                <Box></Box>
                <Box></Box>
              </Box>
            </>
          )}
        </Box>

        {events.length < 1 && (
          <>
            <Box className='lds-ellipsis'>
              <Box></Box>
              <Box></Box>
              <Box></Box>
              <Box></Box>
            </Box>
          </>
        )}
      </Box>
    </>
  )
}

export default EventListPage
