import React from 'react'

const Trips = ({ trips }) => {
  return(
    <>
    <h1 data-testid='title'>Trips</h1>
    {
      trips.length && trips.map((trip, i) => {
        return <div data-testid='key' key={trip.pk}>
          <p>{trip.fields.country}</p>
          <p>{trip.fields.local_area}</p>
          <img src={trip.fields.image} alt={trip.fields.image} />
        </div>
      })
    }
    </>
  )
}

const Trips = ({ trips }) => {
  return(
    <>
    <h1 data-testid='import '></h1>
    </>
  )
}

export default Trips