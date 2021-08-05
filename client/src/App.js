import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterComplete from './pages/auth/RegisterComplete'
import History from './pages/user/History'
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'
import ForgotPassword from './pages/auth/ForgotPassword'
import Dashboard from './pages/admin/Dashboard'
import CategoryCreate from './pages/admin/category/CategoryCreate'
import CategoryUpdate from './pages/admin/category/CategoryUpdate'
import SubCreate from './pages/admin/sub/SubCreate'
import Home from './pages/Home'
import Header from './components/nav/Header'
import UserRoute from './components/routes/UserRoute'
import AdminRoute from './components/routes/AdminRoute'

import { currentUser } from './functions/auth'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { LOGGED_IN_USER } from './actions/types'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()

        console.log(user)
        currentUser(idTokenResult.token)
          .then(res => dispatch({
            type: LOGGED_IN_USER,
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id
            }
          }))
          .catch(err => console.log(err))

      }
    })
    return () => unsubscribe
  }, [dispatch])

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/History" component={History} />
        <UserRoute exact path="/user/Password" component={Password} />
        <UserRoute exact path="/user/Wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={Dashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
      </Switch>
    </>
  )
}

export default App;
