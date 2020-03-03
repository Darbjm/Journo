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
      image: ''
    }
  }

  delete = async e => {
    e.preventDefault()
    const id = this.props.match.params.id
    try {
      await axios.delete(`http://localhost:8000/api/users/edit/${id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/home')
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
    const id = this.props.match.params.id
    console.log('submitting', this.state.data)
    try {
      await axios.put(`/api/users/edit/${id}/`, this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/profile/${Auth.getUser()}`)
    } catch (err) {
      this.setState({ errors: err.response.data.errors })
    }
  }

  render() {
    return (
      <section>
                <form onSubmit={this.handleSubmit}>
          <div className="user-info">
            <h2 className="title">Edit</h2>
            <br />
            <div className="fieldContainer">
              <div className="field">
                <label className="label">USERNAME</label>
                <div className="control">
                  <input
                    // className={`input is-rounded ${this.state.errors.name ? 'is-danger' : ''}`}
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                  />
                </div>
                {/* {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>} */}
              </div>
              <div className="field">
                <label className="label">EMAIL</label>
                <div className="control">
                  <input
                    // className={`input is-rounded ${this.state.errors.email ? 'is-danger' : ''}`}
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
                {/* {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>} */}
              </div>
              <div className="field">
                <label className="label">PASSWORD</label>
                <div className="control">
                  <input
                    // className={`input is-rounded ${this.state.errors.password ? 'is-danger' : ''}`}
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
                {/* {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>} */}
              </div>
              <div className="field">
                <label className="label">PASSWORD CONFIRMATION</label>
                <div className="control">
                  <input
                    // className={`input is-rounded ${this.state.errors.passwordConfirmation ? 'is-danger' : ''}`}
                    type="password"
                    placeholder="Password Confirmation"
                    name="password_confirmation"
                    onChange={this.handleChange}
                  />
                </div>
                {/* {this.state.errors.passwordConfirmation && <small className="help is-danger">{this.state.errors.passwordConfirmation}</small>} */}
              </div>
            </div>
          </div>
          <div className="user-image">
            <ImageUpload
              handleChange={this.handleChange}
              fieldName="image"
              inputClassName="my-input-class"
            />
            <hr />
            <button type="submit" className="button is-rounded color">SAVE</button>
            <button onClick={this.delete} className="button is-rounded is-danger">DELETE</button>
          </div>
        </form>
      </section>
    )
  }
}

export default EditProfile