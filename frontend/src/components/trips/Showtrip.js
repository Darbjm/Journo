import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'

class ShowTrip extends React.Component{
state = {
  trip: {}
}

componentDidMount = async () => {
  const id = this.props.match.params.id
  try{
    const res = await axios.get(`/api/trips/${id}/`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
    this.setState({ trip: res.data })
  } catch (err) {
    console.log(err)
  }
}

isowner() {
  console.log(Auth.getUser(), this.state.trip.user.id)
  if(Auth.getUser() === this.state.trip.user.id) {
  return true
  }
}

render() {
  const id = this.props.match.params.id
  const { trip } = this.state
  if (!trip.user) return null
  console.log(trip)
  return (
    <section className="section hero-profile">
        <div className="profile-fit">
        <div className="tile is-ancestor">
          <div className="tile is-vertical">
            <div className="tile">
              <img className="user-profileimage" src={trip.image} alt={trip.image} />
              <div className="tile end">
                <div className="flex">
                <Link to={`/showuser/${trip.user.id}/`} key={trip.user.id} className="card">
                <img className="tripimage" src={trip.user.image} alt={trip.user.image} />
                <div className="text-card">
                <p>Creator: <strong>{trip.user.username}</strong></p>
                <h2>{trip.user.email}</h2>
                </div>
                </Link>
            </div>
          </div>
          </div>
            <div className="tile">
              <div className="tile is-child box">
                <article className="media">
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>{trip.country}</strong> · <strong>{trip.local_area}</strong> · <small>£{trip.cost}</small> · <small>{trip.Length}</small>  · <small>Rating: {trip.rating}★</small>
                        <br />
                        <strong>Date: </strong><small>{trip.start_date}</small> ---  <small>{trip.end_date}</small>
                        <br />
                        {trip.description}
                      </p>
                    </div>
                  </div>
                  <div className="center">
                  <div className="media-right">
                  {this.isowner() && <Link className="button is-rounded color" to={`/showtrip/${id}/edit`}>Edit</Link>}
                  </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
  )
}

}

export default ShowTrip