import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import ImageUpload from '../auth/ImageUpload'

class EditProfile extends React.Component{
  state = {
    data: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      image: '',
      bio: ''
    },
    errors: {}
  }

  delete = async e => {
    e.preventDefault()
    const id = Auth.getUser()
    try {
      await axios.delete(`http://localhost:8000/api/users/edit/${id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  async componentDidMount() {
    const id = Auth.getUser()
    try{
      const res = await axios.get(`/api/users/show/${id}/`, {
       headers: { Authorization: `Bearer ${Auth.getToken()}` }
     })
      const data = res.data
      this.setState({ data })
     } catch (err) {
       console.log(err)
     }
   }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const id = Auth.getUser()
    console.log('submitting', this.state.data)
    try {
      await axios.put(`/api/users/edit/${id}/`, this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/profile/${Auth.getUser()}`)
    } catch (err) {
      console.log(err.response)
      this.setState({ errors: err.response.data })
    }
  }

  render() {
    const { errors, data } = this.state
    if (!data.image) return null
    return (
      <section className='section hero-login'>
      <div className='center'>
        <form onSubmit={this.handleSubmit} className='column is-6-tablet is-offset-3-tablet is-8-mobile is-offset-2-mobile card'>
          <div className='user-info'>
            <h2 className='title'>Edit Profile</h2>
            <br />
            <div className='fieldContainer'>
              <div className='field'>
                <label className='label'>USERNAME</label>
                <div className='control'>
                  <input
                    className={`input is-rounded ${errors.username ? 'is-danger' : ''}`}
                    placeholder='Username'
                    name='username'
                    onChange={this.handleChange}
                    value={data.username}
                  />
                </div>
                {errors.name && <small className='help is-danger'>{errors.username}</small>}
              </div>
              <div className='field'>
                <label className='label'>EMAIL</label>
                <div className='control'>
                  <input
                    className={`input is-rounded ${errors.email ? 'is-danger' : ''}`}
                    placeholder='Email'
                    name='email'
                    onChange={this.handleChange}
                    value={data.email}
                  />
                </div>
                {errors.email && <small className='help is-danger'>{errors.email}</small>}
              </div>
              <div className='field'>
                <label className='label'>PASSWORD</label>
                <div className='control'>
                  <input
                    className={`input is-rounded ${errors.password ? 'is-danger' : ''}`}
                    type='password'
                    placeholder='Password'
                    name='password'
                    onChange={this.handleChange}
                  />
                </div>
                {errors.password && <small className='help is-danger'>{errors.password}</small>}
              </div>
              <div className='field'>
                <label className='label'>PASSWORD CONFIRMATION</label>
                <div className='control'>
                  <input
                    className={`input is-rounded ${errors.password_confirmation ? 'is-danger' : ''}`}
                    type='password'
                    placeholder='Password Confirmation'
                    name='password_confirmation'
                    onChange={this.handleChange}
                  />
                </div>
                {errors.password_confirmation && <small className='help is-danger'>{errors.password_confirmation}</small>}
              </div>
              <div className='field'>
                <label className='label'>Bio</label>
                <div className='control'>
                  <input
                    className={`input is-rounded ${errors.bio ? 'is-danger' : ''}`}
                    placeholder='Bio'
                    name='bio'
                    value={data.bio}
                    onChange={this.handleChange}
                  />
                </div>
                {errors.bio && <small className='help is-danger'>{errors.bio}</small>}
              </div>
            </div>    
          </div>
          <div className='user-image'>
            <ImageUpload
              handleChange={this.handleChange}
              fieldName='image'
              inputClassName='is-row'
              value={data.image}
            />
            <hr />
            <div className='is-row'>
            <button type='submit' className='button is-rounded color'>SAVE</button>
            <button onClick={this.delete} className='button is-rounded is-danger'>DELETE</button>
            </div>
          </div>
        </form>
        </div>
      </section>
    )
  }
}

export default EditProfile