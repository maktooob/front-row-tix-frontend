import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {AuthContext} from '../context/auth.context'
import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import moment from 'moment'

const UserPage = () => {
  const {id} = useParams()

  const [orders, setOrders] = useState('')
  const {user} = useContext(AuthContext)
  console.log(user)
  const fetchOrders = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/orders/${id}`)
      .then((res) => setOrders(res.data))
      .catch((e) => console.log(e))
  }
  useEffect(() => {
    fetchOrders()
    console.log('orders', orders)
  }, [])
  console.log('orders', orders)

  return (
    <div>
      <h1>Hey there, {user?.username}!</h1>
      <h3>Your order history:</h3>
      {orders ? (
        orders.map((order, index) => {
          return (
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  // aria-controls="panel1a-content"
                  // id="panel1a-header"
                  id='acc-sum'
                >
                  <Typography sx={{width: '50%', flexShrink: 0}}>
                    #{index + 1} Order-ID: {order._id}
                  </Typography>
                  <Typography sx={{color: 'text.secondary'}}>
                    Date of order: {moment(order.updatedAt).format('MMM Do YY')}
                  </Typography>
                </AccordionSummary>
                {order.events.map((event) => {
                  return (
                    <div>
                      <AccordionDetails className='accordion-det'>
                        <Typography>Event: {event.eventId.title}</Typography>
                        <Typography className='typo'>
                          Date of event:{' '}
                          {moment(event.eventId.date).format('MMM Do YY')}
                        </Typography>
                        <Typography className='typo'>
                          Amount: {event.quantity}
                        </Typography>
                        <Typography id='price-history'>
                          Price: {event.eventId.price} €
                        </Typography>
                      </AccordionDetails>
                    </div>
                  )
                })}
              </Accordion>
              <Accordion>
                <AccordionSummary>
                  <Typography >Total: {order.totalPrice} €</Typography>
                </AccordionSummary>
              </Accordion>
            </div>
          )
        })
      ) : (
        <div>no orders</div>
      )}
    </div>
  )
}

export default UserPage
