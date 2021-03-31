import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import Header from './components/Header'



const App = () => {
  return (
    <Router>
      <Header />
      <ToastContainer />

      <Route path='/' component={HomeScreen} exact />
      <Route path='/login' component={LoginScreen} />
      <Route path='/register' component={RegisterScreen} />



    </Router>
  );
}

export default App;
