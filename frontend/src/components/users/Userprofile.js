import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'

class UserProfile extends React.Component {
  state = {
    user: {},
    trips: []
  }

  async componentDidMount() {
    const id = Auth.getUser()
    try {
      const res = await axios.get(`/api/users/show/${id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const plc = res.data.trips
      const lastThree = [plc[0], plc[1], plc[2]]
      this.setState({ trips: lastThree })
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
      this.props.history.push('/error')
    }
  }

  render() {
    const { user, trips } = this.state
    if (!user) return null
    return (
      <section className='section hero-profile'>
        <div className='profile-fit'>
        <div className='tile is-ancestor'>
          <div className='tile is-vertical'>
            <div className='tile'>
              <img className='user-profileimage' src={user.image} alt={user.image} />
              <div className='tile end'>
                <div className='flex'>
                {trips[0] && trips.map((trip, i) => (
                <Link to={`/showtrip/${trip.id}/`} key={i} className='card'>
                <img className='tripimage' src={trip.image} alt={trip.image} />
                <div className='text-card'>
                <h1>{trip.country}</h1>
                <h2>{trip.local_area}</h2>
                <h3>£{trip.cost}</h3>
                <h4>Rating: {trip.rating} ★</h4>
                </div>
              </Link>))}
            </div>
          </div>
          </div>
            <div className='tile'>
              <div className='tile is-child box'>
                <article className='media'>
                  <div className='media-content'>
                    <div className='content'>
                      <p>
                        <strong>{user.username}</strong> - <small>{user.email}</small>
                        <br />
                        {user.bio}
                      </p>
                    </div>
                  </div>
                  <div className='center'>
                  <div className='media-right'>
                  <Link className='button is-rounded color' to={`/profile/${Auth.getUser()}/edit`}>Edit</Link>
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

export default UserProfile