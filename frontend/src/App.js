import React from 'react';
import './styles/main.scss'
import 'bulma'
// import Index from './components/trips/Tripindex'
import Login from './components/auth/Login'
import { BrowserRouter, Route, Switch,  } from 'react-router-dom'
import Register from './components/auth/Register'
import UserProfile from './components/users/Userprofile'
import Home from './components/common/Home'
import TripMap from './components/trips/Tripmap'
import SecureRoute from './components/common/SecureRoute';
import Navbar from './components/common/Navbar'
import CreateTrip from './components/trips/Createtrip'
import ShowTrip from './components/trips/Showtrip'
import FailedPage from './components/common/Failedpage'
import EditProfile from './components/users/Editprofile'
import EditTrip from './components/trips/Edittrip';
import ShowUser from './components/users/Showuser';


function App() {
  return (
  <BrowserRouter>
    <>
      <Navbar/>
      <Switch>
      <Route path='/' component={Home} />
      <SecureRoute path='/profile/:id/edit' component={EditProfile} />
      <SecureRoute path='/showtrip/:id/edit' component={EditTrip} />
      <SecureRoute path='/profile' component={UserProfile}/>
      <SecureRoute path='/showuser/:id' component={ShowUser} />
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/map/:place' component={TripMap} />
      <SecureRoute path='/createtrip' component={CreateTrip}/>
      <SecureRoute path='/showtrip/:id' component={ShowTrip}/>
      <Route path='/*' component={FailedPage} />
      </Switch>
    </>
  </BrowserRouter>
  )
}

export default App