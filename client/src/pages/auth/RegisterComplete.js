import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { createOrUpdateUser } from '../../functions/auth'
import { auth } from '../../firebase'
import { LOGGED_IN_USER } from '../../actions/types'




const Register = ({ history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        if (email === null) {
            history.push('/')
        }
    }, [email, history])

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"))
    }, [])

    useEffect(() => {
        if (user && user.token) {
            history.push('/')
        }
    }, [user, history])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email && !password) {
            toast.error('Email and Password is required')
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters')
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href)

            if (result.user.emailVerified) {
                window.localStorage.removeItem("emailForRegistration")
                let user = auth.currentUser
                await user.updatePassword(password)
                const idTokenResult = await user.getIdTokenResult()

                createOrUpdateUser(idTokenResult.token)
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
                history.push('/')

            }
        } catch (err) {
            toast.error(err.message)
        }


    }



    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Complete Your Registration</h4>
                    <form onSubmit={handleSubmit}>
                        <input type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                        />
                        <input type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Your Password"
                            autoFocus
                        />
                        <button type="submit" className="btn btn-raised">Complete Registration</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
