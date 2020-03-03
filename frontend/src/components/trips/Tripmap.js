import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React from 'react'
import axios from 'axios'
import MapGL, { Marker, Popup } from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import { Link } from 'react-router-dom'

const token = 'pk.eyJ1IjoiZGFyYmptIiwiYSI6ImNrNWk5MDFwMjA5NmozZW5weWUyb21xa3YifQ.iJv7D-hvXJ2Tw4p2AiQMtQ'
// const token = process.env.REACT_APP_MAPBOX

class TripMap extends React.Component {
  state = {
    trips: [],
    tripswithco: [],
    viewport: {
      longitude: 0,
      latitude: 0,
      zoom: 8
    },
    display: false,
    tripPicked: {}
  };

  myMap = React.createRef()

  getLatLng = local_area => {
    return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local_area}.json?access_token=${token}`)
  }

  findlatlong = async () => {
    const { trips } = this.state
    console.log(trips)
    const codes = trips.map(trip => trip.local_area)
    Promise.all(codes.map(local_area => {
      return this.getLatLng(local_area)
    }))
      .then(res => {
        const newArr = trips.map((trip, i) => {
          const cen = res[i].data.features[0].center
          if (!cen) return null
          return {
            latlng: cen,
            ...trip
          }
        })
        this.setState({ tripswithco: newArr })
      })
  }

  async componentDidMount() {
    try {
      const search = window.location.pathname.split('/').slice(2).join('/')
      const mapStartFocus = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${token}`)
      if (mapStartFocus.data.features.length === 0) {
        this.props.history.push('/map/sudan')
        alert('Sorry we couldn\'t find that address')
      } else {
        const firstLatLng = mapStartFocus.data.features[0].center
        this.setState({ viewport: { longitude: firstLatLng[0], latitude: firstLatLng[1], zoom: 5 } })
      }
      const res = await axios.get('/api/trips')
      this.setState({ trips: res.data })
      await this.findlatlong()
    } catch (err) {
      console.log(err)
    }
  }

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  };

  showTrip = trip => {
    console.log(trip)
    this.setState({ tripPicked: trip })
  }

  togglePopup = () => {
    const { display } = this.state
    if (!display) {
      this.setState({ display: true })
    } else this.setState({ display: false })
  }


  render() {
    const { viewport, tripswithco, tripPicked, display } = this.state
    if (!tripswithco.length) return null
    return (
      <section className="map">
        <MapGL
          ref={this.myMap}
          {...viewport}
          height={'100vh'}
          width={'100vw'}
          mapStyle='mapbox://styles/mapbox/streets-v9' 
          onViewportChange={this.handleViewportChange}
          mapboxApiAccessToken={token}
          maxZoom={13}
        >
          <Geocoder
            mapRef={this.myMap}
            mapboxApiAccessToken={token}
            onViewportChange={this.handleViewportChange}
            position="top-left"
          />
          {tripswithco[0].latlng && tripswithco.map((trip, i) => (
            <Marker 
              key={i}
              latitude={trip.latlng[1]}
              longitude={trip.latlng[0]}
            >
              {console.log(trip)}
              <a onClick={(e) => {
                e.preventDefault()
                this.showTrip(trip)
                this.togglePopup()
              }}>
                <img src={trip.image} alt={trip.name} className="tripsmap" />
              </a>
            </Marker> 
          ))}
          {display ? (<Popup
            latitude={tripPicked.latlng[1]}
            longitude={tripPicked.latlng[0]}
          >
            <Link to={`/showtrip/${tripPicked.id}`}>
              {tripPicked.local_area}
              <br />
              £{tripPicked.cost}
              <h3>{tripPicked.rating} <span className="star">★</span></h3>
            </Link>
          </Popup>)
            : null}
        </MapGL>
      </section>
    )
  }
}
      

export default TripMap