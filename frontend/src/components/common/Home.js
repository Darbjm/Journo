import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  state = {
    search: '',
    recent: [],
    width: 0,
    height: 0
  }

  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0 }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  
  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  handleChange = e => {
    this.setState({ search: e.target.value })
  }

  componentDidMount = async () => {
    try {
      const res = await axios.get('api/trips/')
      const array = res.data
      this.setState({ recent: array.slice(-5) })
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
    const { recent, width } = this.state
    return (
        <div className='hero-body'>
          <div className='home-section'>
          <section className='search-section'>
          <form onSubmit={this.handleSubmit} className='search-bar'>
            <div className='search'>
              <input type='text' className='search-text' placeholder='Where to?' onChange={this.handleChange} />
              <button type='submit' className='search-button'>
                <img src='https://image.flaticon.com/icons/svg/942/942196.svg' />
              </button>
            </div>
          </form>
            <div className='tile is-ancestor'>
              <div className='tile is-vertical'>
                <div className='tile'>
                  <div className='tile centered'>
                    <div className='flex'>
                    {width > 768 ? 
                      (recent && recent.map(trip => (
                      <Link to={`/showtrip/${trip.id}/`} key={trip.id} className='card'>
                        <img className='tripimage' src={trip.image} alt={trip.image} />
                        <div className='text-card'>
                          <h1>{trip.country}</h1>
                          <h2>{trip.local_area}</h2>
                          <h3>£{trip.cost}</h3>
                          <h4>Rating: {trip.rating} ★</h4>
                        </div>
                      </Link>)))
                      :
                      recent && <Link to={`/showtrip/${recent[0].id}/`} key={recent[0].id} className='card'>
                      <img className='recent[0]image' src={recent[0].image} alt={recent[0].image} />
                      <div className='text-card'>
                        <h1>{recent[0].country}</h1>
                        <h2>{recent[0].local_area}</h2>
                        <h3>£{recent[0].cost}</h3>
                        <h4>Rating: {recent[0].rating} ★</h4>
                      </div>
                    </Link>}
                    </div>
                  </div>
                </div>
              </div>
              </div>
          </section>
          </div>
        </div>
    )
  }
}

export default Home