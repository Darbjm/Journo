import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'


class Navbar extends React.Component {
  state = {
    searchResult: null,
    isActive: false
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

  activeClick = () => {
    this.setState({ isActive: !this.state.isActive })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  render() {
    const { isActive } = this.state
    const menuVis = isActive ? 'is-active' : ''
    return (
      <nav className='navbar nav is-fixed-top'>
        <div className='container'>
          <div className='navbar-brand'>
            <img src='https://image.flaticon.com/icons/svg/2072/2072260.svg' alt='logo' />
            <Link className='navbar-item' to='/'>
              <h1>Journo</h1>
            </Link>
              <a role='button' onClick={this.activeClick} className={`navbar-burger burger ${menuVis}`} aria-label='menu' aria-expanded='false'>
                <span aria-hidden='true' className='white'></span>
                <span aria-hidden='true' className='white'></span>
                <span aria-hidden='true' className='white'></span>
              </a>
          </div>
          <div className={`navbar-menu ${menuVis} turq`}>
            <div className='navbar-end'>
              <Link className='navbar-item has-text-white' to='/map/london'>MAP</Link>
              {!Auth.isAuthenticated() && <Link className='navbar-item has-text-white' to='/register'>SIGN UP</Link>}
              {!Auth.isAuthenticated() && <Link className='navbar-item has-text-white' to='/login'>LOGIN</Link>}
              {Auth.isAuthenticated() && <Link className='navbar-item has-text-white' to='/createtrip'>CREATE TRIP</Link>}
              {Auth.isAuthenticated() && <Link className='navbar-item has-text-white' to={`/profile/${Auth.getUser()}`}>PROFILE</Link>}
              {Auth.isAuthenticated() && <a className='navbar-item has-text-white' onClick={this.handleLogout}>LOGOUT</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)



