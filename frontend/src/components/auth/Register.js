import React from 'react'
import axios from 'axios'
import ImageUpload from './ImageUpload'
import { Link } from 'react-router-dom'


class Register extends React.Component {
  state = {
    data: {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      image: ''
    },
    errors: {}
  }

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }


  handleSubmit = async e => {
    e.preventDefault()
    console.log('submitting', this.state.data)
    try {
      await axios.post('/api/users/register', this.state.data)
      this.props.history.push('/login')
    } catch (err) {
      this.setState({ errors: err.response.data })
    }
  }

  render() {
    const { errors } = this.state
    return (
      <section className='section hero-login'>
        <div className='center'>
        <form onSubmit={this.handleSubmit} className='column is-6-tablet is-offset-3-tablet is-8-mobile is-offset-2-mobile card'>
          <div className='user-info'>
            <h2 className='title'>Register</h2>
            <br />
            <div className='fieldContainer'>
              <div className='field'>
                {/* <label className='label'>USERNAME</label> */}
                <div className='control'>
                  <input
                    className={`input is-small is-rounded ${errors.username ? 'is-danger' : ''}`}
                    placeholder='Username'
                    name='username'
                    onChange={this.handleChange}
                  />
                </div>
                {errors.username && <small className='help is-danger'>{errors.username}</small>}
              </div>
              <div className='field'>
                {/* <label className='label'>EMAIL</label> */}
                <div className='control'>
                  <input
                    className={`input is-small is-rounded ${errors.email ? 'is-danger' : ''}`}
                    placeholder='Email'
                    name='email'
                    onChange={this.handleChange}
                  />
                </div>
                {errors.email && <small className='help is-danger'>{errors.email}</small>}
              </div>
              <div className='field'>
                {/* <label className='label'>BIO</label> */}
                <div className='control'>
                  <input
                    className={`textarea is-small is-rounded ${errors.bio ? 'is-danger' : ''}`}
                    placeholder='Bio'
                    name='bio'
                    onChange={this.handleChange}
                  />
                </div>
                {errors.bio && <small className='help is-danger'>{errors.bio}</small>}
              </div>
              <div className='field'>
                {/* <label className='label'>PASSWORD</label> */}
                <div className='control'>
                  <input
                    className={`input is-small is-rounded ${errors.password ? 'is-danger' : ''}`}
                    type='password'
                    placeholder='Password'
                    name='password'
                    onChange={this.handleChange}
                  />
                </div>
                {errors.password && <small className='help is-danger'>{errors.password}</small>}
              </div>
              <div className='field'>
                {/* <label className='label'>PASSWORD CONFIRMATION</label> */}
                <div className='control'>
                  <input
                    className={`input is-small is-rounded ${errors.password_confirmation ? 'is-danger' : ''}`}
                    type='password'
                    placeholder='Password Confirmation'
                    name='password_confirmation'
                    onChange={this.handleChange}
                  />
                </div>
                {errors.password_confirmation && <small className='help is-danger'>{errors.password_confirmation}</small>}
              </div>
            </div>
          </div>
          <div className='user-image'>
            <ImageUpload
              handleChange={this.handleChange}
              fieldName='image'
              inputClassName={`${errors.image ? 'is-danger' : ''}`}
              className='image-input'
            />
          {errors.image && <small className='help is-danger'>{errors.image}</small>}
            <div className='is-row'>
              <div className='control is-row'>
                <button type='submit' className='button is-rounded is-small color has-text-white'>Register</button>
              </div>
                <div className='control is-row'>
                <h3>Already have an account? <Link to='/login'>Login</Link></h3>
                </div>
              </div>
          </div>
        </form>
        </div>
      </section>
    )
  }
}

export default Register