import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'

class ShowTrip extends React.Component{
state = {
  trip: []
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
  if(Auth.getUser() === this.state.trip.user.id) {
  return true
  }
}

render() {
  const { trip } = this.state
  const id = this.props.match.params.id
  return (
    <section>
      <div>
        {trip.country &&
          <div key={trip.id} className="show-trip">
          <h1>{trip.country}</h1>
          <h1>{trip.local_area}</h1>
          <h2>{trip.user.username}</h2>
          <img src={trip.image} />
          <h3>{trip.rating}</h3>
          <h3>{trip.cost}</h3>
          <h4>{trip.start_date} - {trip.end_date}</h4>
          <p>{trip.description}</p>
          {this.isowner() && <Link to={`/showtrip/${id}/edit`} className="button is-rounded color">Edit</Link>}
          </div>
        }
      </div>
    </section>
  )
}

}

export default ShowTrip