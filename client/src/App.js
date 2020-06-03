import React from 'react'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import Home from './components/home'
import ContactsList from './components/contacts/ContactList'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Account from './components/auth/Account'
import { connect } from 'react-redux'
import { startUserLogout } from './actions/userActions'


function App(props) {
  const handleLogout = () => {
    props.dispatch(startUserLogout())
  }
  return (
    <>
     
      <BrowserRouter>
        <div>

          <Link to="/">Home</Link>

          {
            Object.keys(props.users).length !== 0 ? (
              <div>
                <Link to="/account">Account</Link>

                <Link to="/lists">Contacts</Link>
                <Link to="#" onClick={handleLogout}>Logout</Link>
              </div>
            ) : (
                <div>
                  <Link to="/register">Register</Link>
                  <Link to="/login">Login</Link>

                </div>
              )
          }
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/register" component={Register} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route path="/account" component={Account} exact={true} />



            <Route path="/lists" component={ContactsList} exact={true} />

          </Switch>
        </div>
      </BrowserRouter>
    </>
  )
}


const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(App)