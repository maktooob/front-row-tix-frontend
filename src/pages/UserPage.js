import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import moment from 'moment'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const UserPage = () => {
  const { id } = useParams()

  const [orders, setOrders] = useState('')
  const { user } = useContext(AuthContext)
  const fetchOrders = () => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/orders/${id}`)
      .then((res) => setOrders(res.data))
      .catch((e) => console.log(e))
  }
  useEffect(() => {
    fetchOrders()
  }, [])


  return (
    <div>
      <div style={{ marginBottom: "3rem" }} className="cart-head">

        <Link className="back-link" style={{ display: "inline", textDecoration: 'none', color: 'black' }} to="/events"><ArrowBackIosIcon sx={{ fontSize: "3rem", marginLeft: "2rem", textDecoration: "none" }} /></Link>
        <h1 className="cart-title">{user?.username.toUpperCase()}´S ORDER HISTORY</h1>
        <div className="pseudo"><Link className="back-link" style={{ display: "inline", textDecoration: 'none', color: 'black' }} to="/events"><ArrowBackIosIcon sx={{ fontSize: "3rem", marginLeft: "2rem", textDecoration: "none" }} /></Link></div>
      </div>
      <div className='acc-ctn'>
        {orders.length > 0 ? (
          console.log(orders),
          orders.map((order, index) => {
            return (
              <div key={order._id} className="acc-ctn">
                <Accordion key={order._id} style={{ border: "1px solid", width: "80vw", padding: "1rem", marginTop: "1rem" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"

                  >
                    <Typography sx={{ width: '50%', display: { md: "flex", xs: "none" } }}>
                      #{index + 1} Order-ID: {order._id}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      Date of order: {moment(order.updatedAt).format('MMM Do YY')}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', marginLeft: "auto" }}>
                      Total cost: {order.totalPrice} €
                    </Typography>
                  </AccordionSummary >
                  {order &&
                    order?.events.map((event) => {
                      return (
                        <div key={event.eventId?._id}>
                          {event.eventId &&
                          <AccordionDetails className='accordion-det'>
                            <Typography>Event: {event.eventId?.title}</Typography>
                            <Typography className='typo' sx={{ display: { md: "flex", xs: "none" } }}>
                              Date of event:{' '}
                              {moment(event.eventId?.date).format('MMM Do YY')}
                            </Typography>
                            <Typography className='typo'>
                              Quantity: {event?.quantity}
                            </Typography>
                            <Typography >
                              Price each: {event.eventId?.price} €
                            </Typography>
                          </AccordionDetails>}
                        </div>
                      )
                    })}
                </Accordion>
              </div>
            )
          })
        ) : (
          <p>YOU HAVE NO ORDERS YET</p>
        )}
      </div>
    </div>
  )
}

export default UserPage
