import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
class UserProfile extends React.Component {
  state = {
    user: {}
  }

    getData = async () => {
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

  isowner() {
    if(Auth.getUser() == this.props.match.params.id) {
    return true
    }
  }

  componentDidMount() {
    this.getData()
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
              <div key={trip.id} className="card">
                <img className="tripimage" src={trip.image} alt={trip.image} />
                <div className="text-card">
                <h1>{trip.country}</h1>
                <h2>{trip.local_area}</h2>
                <h3>£{trip.cost}</h3>
                <h4>Rating: {trip.rating} ★</h4>
                </div>
              </div>))}
            </div>
          </div>
          </div>
            <div className="tile">
              <div className="tile is-child box">
                <article class="media">
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>{user.username}</strong> <small>{user.email}</small> <small>31m</small>
                        <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                      </p>
                    </div>
                  </div>
                  <div class="media-right">
                    {this.isowner() &&<Link className="button is-rounded color" to={`/profile/${Auth.getUser()}/edit`}>Edit</Link>}
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

export default UserProfile