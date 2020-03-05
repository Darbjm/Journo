import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'

class Login extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data, error: '' })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/users/login', this.state.data)
      Auth.setToken(res.data.token)
      this.props.history.push(`/profile/${Auth.getUser()}`)
    } catch (err) {
      this.setState({ error: 'Invalid Credentials' })
    }
  }

  render() {
    const { error } = this.state
    return (
        <section className='section hero-login'> 
          <div className='center'>
            <div className='column is-6-tablet is-offset-3-tablet is-8-mobile is-offset-2-mobile'>
              <form onSubmit={this.handleSubmit} className='has-text-centered is-centered'>
                <div className='field'>
                  <div className='control'>
                    <input
                      className={`input is-rounded is-large ${error ? 'is-danger' : ''}`}
                      name='email'
                      placeholder='Email'
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className='loginfield'>
                  <br></br>
                  <div className='control'>
                    <input
                      className={`input is-rounded is-large ${error ? 'is-danger' : ''}`}
                      type='password'
                      name='password'
                      placeholder='Password'
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className='invalid'>
                  <small className='is-danger'>{error}</small>
                  </div>
                </div>
                <br></br>
              <div className='is-row'>
              <div className='control is-row'>
                <button type='submit' className='button is-rounded is-large color has-text-white'>Login</button>
              </div>
                <div className='control is-row'>
                <h3 className='has-text-white'>Don't have an account? <Link to='/register'>Sign up</Link></h3>
                </div>
              </div>
              </form>
            </div>
          </div>
        </section>
    )
  }
}

export default Login