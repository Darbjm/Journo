import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function TripMap() {
  const [viewport, setViewport] = useState({ 
      longitude: 0,
      latitude: 0,
      zoom: 2
  });
  const [trips, setTrips] = useState({})

  const [tripsPicked, setTripsPicked] = useState(null)

  const getData = async () => {
        try {
          const token = process.env.REACT_APP_MAPBOX_KEY
          const search = window.location.pathname.split('/').slice(2).join('/')
          const mapStartFocus = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${token}`)
          if (mapStartFocus.data.features.length === 0) {
            this.props.history.push('/map/sudan')
            alert('Sorry we couldn\'t find that address')
          }
          const firstLatLng = mapStartFocus.data.features[0].center
          const viewport = {longitude: firstLatLng[0], latitude: firstLatLng[1], zoom: 5}
          setViewport(viewport)
          const { data } = await axios.get('/api/trips')
          const arrOfLocalAreas = data.map(i => i.local_area)
          Promise.all(arrOfLocalAreas.map(area => {
            return axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${area}.json?access_token=${token}`)
          }))
            .then(res => {
              const latlngs = res.map(r => r.data.features[0].center)
              setTrips(data.map((trip, index) => {
                return {
                  ...trip,
                  latlng: latlngs[index]
                }
              }))
            })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/mapbox/streets-v9' 
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      height={'100vh'}
      width={'100vw'}
      onViewportChange={viewport => {
        setViewport(viewport)
      }}
      >
        {trips[0] && trips.map((trip, i) => (
          <Marker 
            key={i}
            latitude={trip.latlng[1]}
            longitude={trip.latlng[0]}
          >
            <a onClick={e => {
              e.preventDefault()
              if (!tripsPicked) {
              setTripsPicked(trip) 
              } else setTripsPicked(null)
            }}>
              <img src={trip.image} alt={trip.name} className='tripsmap' />
            </a>
          </Marker> ))}
          {tripsPicked && <Popup
          latitude={tripsPicked.latlng[1]}
          longitude={tripsPicked.latlng[0]}
          >
            <a>
              <Link to={`/showtrip/${tripsPicked.id}`}>
              {tripsPicked.local_area}
              <br />
              {tripsPicked.Length}
              <br />
              £{tripsPicked.cost}
              <h3>{tripsPicked.rating} <span className='star'>★</span></h3>
              </Link>
            </a>
            
          </Popup>}
      </ReactMapGL>
    </div>
  )
}
