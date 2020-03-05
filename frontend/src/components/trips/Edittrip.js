import React from 'react'
import Auth from '../../lib/auth'
import ImageUpload from '../auth/ImageUpload'
import axios from 'axios'

class EditTrip extends React.Component {
    state = {
      trip: {
        country: '',
        local_area: '',
        postcode: '',
        description: '',
        image: '',
        rating: '',
        cost: '',
        start_date: '',
        end_date: '',
        Length: '',
        user: ''
      },
      errors: {}
    }

   async componentDidMount() {
    const id = this.props.match.params.id
    try{
      const res = await axios.get(`/api/trips/edit/${id}/`, {
       headers: { Authorization: `Bearer ${Auth.getToken()}` }
     })
      const trip = res.data
      this.setState({ trip })
     } catch (err) {
       console.log(err)
     }
   }

  handleChange = ({ target: { name, value } }) => {
    const trip = { ...this.state.trip, [name]: value }
    this.setState({ trip })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const id = this.props.match.params.id
    try { 
      await axios.put(`/api/trips/${id}/`, this.state.trip, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/showtrip/${id}`)
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  delete = async e => {
    e.preventDefault()
    const id = this.props.match.params.id
    try { 
      await axios.delete(`/api/trips/${id}/`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/profile/${Auth.getUser()}`)
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }


  render() {
    const { trip, errors } = this.state
    return (
      <section className='section hero-edittrip'>
        <div className='editcard'>
        <form onSubmit={this.handleSubmit} className='card'>
        <div className='fieldContainer'>
          <div className='field'>
          <label className='label'>Country</label>
          <div className='control'>
              <input
                className={`input is-rounded ${errors.country ? 'is-danger' : ''}`}
                placeholder='Country'
                name='country'
                onChange={this.handleChange}
                value={trip.country}
              />
            </div>
            {errors.country && <small className='help is-danger'>{errors.country}</small>}
            </div>
            <div className='field'>
            <label className='label'>Local area</label>
            <div className='control'>
              <input
                className={`input is-rounded ${errors.local_area ? 'is-danger' : ''}`}
                placeholder='Local area'
                name='local_area'
                onChange={this.handleChange}
                value={trip.local_area}
              />
            </div>
            {errors.local_area && <small className='help is-danger'>{errors.local_area}</small>}
            </div>
            <div className='field'>
            <label className='label'>Postcode</label>
            <div className='control'>
              <input
                className={`input is-rounded ${errors.postcode ? 'is-danger' : ''}`}
                placeholder='Postcode'
                name='postcode'
                onChange={this.handleChange}
                value={trip.postcode}
              />
            </div>
            {errors.postcode && <small className='help is-danger'>{errors.postcode}</small>}
            </div>
            <div className='field'>
            <label className='label'>Description</label>
            <div className='control'>
              <textarea 
                className={`textarea is-rounded ${errors.description ? 'is-danger' : ''}`}
                placeholder='Description'
                name='description'
                onChange={this.handleChange}
                value={trip.description}/>
            </div>
            {errors.description && <small className='help is-danger'>{errors.description}</small>}
            </div>
            <div className='field'>
            <label className='label'>Rating</label>
            <div className='control'>
              <input
                type='number'
                min='1'
                max='5'
                className={`input is-rounded ${errors.rating? 'is-danger' : ''}`}
                placeholder='Rating'
                name='rating'
                onChange={this.handleChange}
                value={trip.rating}
              />
            </div>
            {errors.rating && <small className='help is-danger'>{errors.rating}</small>}
            </div>
            <div className='field'>
            <label className='label'>Cost in £</label>
            <div className='control'>
              <input
                type='number'
                className={`input is-rounded ${errors.cost ? 'is-danger' : ''}`}
                placeholder='Cost'
                name='cost'
                onChange={this.handleChange}
                value={trip.cost}
              />
            </div>
            {errors.cost && <small className='help is-danger'>{errors.cost}</small>}
            </div>
            <div className='field'>
            <label className='label'>Length of trip</label>
            <div className='control'>
              <input
                className={`input is-rounded ${errors.Length ? 'is-danger' : ''}`}
                placeholder='Length of trip'
                name='Length'
                onChange={this.handleChange}
                value={trip.Length}
              />
            </div>
            {errors.Length && <small className='help is-danger'>{errors.Length}</small>}
            </div>
            <div className='field'>
            <label className='label'>Start date</label>
            <div className='control'>
              <input
                type='date'
                className={`input is-rounded ${errors.start_date? 'is-danger' : ''}`}
                placeholder='Start date'
                name='start_date'
                onChange={this.handleChange}
                value={trip.start_date}
              />
            </div>
            {errors.start_date && <small className='help is-danger'>{errors.start_date}</small>}
            </div>
            <div className='field'>
            <label className='label'>End date</label>
            <div className='control'>
              <input
                type='date'
                className={`input is-rounded ${errors.end_date ? 'is-danger' : ''}`}
                placeholder='End date'
                name='end_date'
                onChange={this.handleChange}
                value={trip.end_date}
              />
            </div>
            </div>
            </div>
            <br />
            <div>
            <div className='field'>
            <label className='label'>Image</label>
            <div className='user-image'>
            {trip.image && <ImageUpload
              handleChange={this.handleChange}
              fieldName='image'
              className={`input is-rounded ${errors.image ? 'is-danger' : ''}`}
              value={trip.image}
            />}
            </div>
            {errors.image && <small className='help is-danger'>{errors.image}</small>}
            </div>
            </div>
            <div className='is-row'>
            <button className='button is-rounded color has-text-white'>EDIT</button>
            <button onClick={this.delete} className='button is-rounded is-danger'>DELETE</button>
            </div>
        </form>
        </div>
      </section>
    )
  }
}

export default EditTrip