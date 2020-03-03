import React from 'react'

const Trips = ({ trips }) => {
  return(
    <>
    <h1 data-testid='title'>Trips</h1>
    {trips.length && trips.map(trip => {
        return <div key={trip.id}>
          <p>{trip.country}</p>
          <p>{trip.local_area}</p>
          <img src={trip.image} alt={trip.image} />
        </div>
      })
    }
    </>
  )
}

export default Trips