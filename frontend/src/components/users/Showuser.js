import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
class ShowUser extends React.Component {
  state = {
    user: {}
  }

  async componentDidMount() {
    const id = this.props.match.params.id
    try {
      const res = await axios.get(`/api/users/show/${id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
      this.props.history.push('/error')
    }
  }

  render() {
    const { user } = this.state
    if (!user) return null
    return (
      <section className="section hero-profile">
        <div className="profile-fit">
        <div className="tile is-ancestor">
          <div className="tile is-vertical">
            <div className="tile">
              <img className="user-profileimage" src={user.image} alt={user.image} />
              <div className="tile end">
                <div className="flex">
                {user.trips && user.trips.map(trip => (
                <Link to={`/showtrip/${trip.id}/`} key={trip.id} className="card">
                <img className="tripimage" src={trip.image} alt={trip.image} />
                <div className="text-card">
                <h1>{trip.country}</h1>
                <h2>{trip.local_area}</h2>
                <h3>{trip.Length}</h3>
                <h3>£{trip.cost}</h3>
                <h4>Rating: {trip.rating} ★</h4>
                </div>
              </Link>))}
            </div>
          </div>
          </div>
            <div className="tile">
              <div className="tile is-child box">
                <article className="media">
                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>{user.username}</strong> - <small>{user.email}</small>
                        <br />
                        {user.bio}
                      </p>
                    </div>
                  </div>
                  <div className="center">
                  <div className="media-right">
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

export default ShowUser