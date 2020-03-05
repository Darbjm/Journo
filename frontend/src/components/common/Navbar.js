import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'


class Navbar extends React.Component {
  state = {
    navbarOpen: false,
    searchResult: null
  }

  toggleNavBar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  handleClick = (e) => {
    localStorage.setItem('skill', e.target.innerHTML)
  }

  handleLogout = () => {
    Auth.logout()
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  render() {
    const { navbarOpen } = this.state
    return (
      <nav className='nav is-fixed-top'>
        <div className='container'>
          <div className='navbar-brand'>
            <img src='https://image.flaticon.com/icons/svg/2072/2072260.svg' alt='logo' />
            <Link className='navbar-item' to='/'>
              <h1>Journo</h1>
            </Link>
          </div>
          <div className='navbar-end'>
            <Link className='navbar-item has-text-white' to='/map/london'>MAP</Link>
            {!Auth.isAuthenticated() && <Link className='navbar-item has-text-white' to='/register'>SIGN UP</Link>}
            {!Auth.isAuthenticated() && <Link className='navbar-item has-text-white' to='/login'>LOGIN</Link>}
            {Auth.isAuthenticated() && <Link className='navbar-item has-text-white' to='/createtrip'>CREATE TRIP</Link>}
            {Auth.isAuthenticated() && <Link className='navbar-item has-text-white' to={`/profile/${Auth.getUser()}`}>PROFILE</Link>}
            {Auth.isAuthenticated() && <a className='navbar-item has-text-white' onClick={this.handleLogout}>LOGOUT</a>}
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)



