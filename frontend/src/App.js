import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//Components
import Header from './components/Header'
//Screens
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import RegisterCompleteScreen from './screens/RegisterComplete'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'

import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { USER_LOGIN_SUCCESS } from './actions/types'


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        })


      }
    })

    return () => unsubscribe()

  }, [dispatch])


  return (
    <Router>
      <Header />
      <ToastContainer />

      <Route path='/' component={HomeScreen} exact />
      <Route path='/login' component={LoginScreen} exact />
      <Route path='/register' component={RegisterScreen} exact />
      <Route path='/register/complete' component={RegisterCompleteScreen} exact />
      <Route path='/forgot/password' component={ForgotPasswordScreen} exact />



    </Router>
  );
}

export default App;
