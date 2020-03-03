import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Home extends React.Component {
  state = {
    search: '',
    recent: []
  }

  handleChange = e => {
    this.setState({ search: e.target.value })
  }

  componentDidMount = async () => {
    try {
      const res = await axios.get('api/trips/')
      const array = res.data
      this.setState({ recent: array.slice(-2) })
    } catch (err) {
      console.log(err)
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.history.push(`/map/${this.state.search}`)
  }

  handleClick = (e) => {
    console.log(e.target.id)
    localStorage.setItem('skill', e.target.id)
  }

  render() {
    const { recent } = this.state
    return (
      <>
        <div className="hero-body">
          <div className="home-section">
          <section className="search-section">
          <form onSubmit={this.handleSubmit} className="search-bar">
            <div className="search">
              <input type="text" className="search-text" placeholder="Where to?" onChange={this.handleChange} />
              <button type="submit" className="search-button">
                <img src="https://image.flaticon.com/icons/svg/942/942196.svg" />
              </button>
            </div>
          </form>
          </section>
          <div className='recenttext'><h1>Recent Trips:</h1></div>
          <section className="search-section">
            <div className="recent-section">
              {recent && recent.map(trip => (
                <div key={trip.id} className="recent-card">
                  <h1>{trip.country}</h1>
                  <h2>{trip.local_area}</h2>
                  <img src={trip.image} className="tripimage" />
                  <h4>{trip.cost}</h4>
                  </div>
              ))}
            </div>
          </section>
          </div>
        </div>
      </>
    )
  }
}

export default Home