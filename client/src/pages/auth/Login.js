import React, { useState, useEffect } from 'react'
import { auth, googleAuthProvider } from '../../firebase'
import { toast } from 'react-toastify'
import { Button } from 'antd'
import {
    MailOutlined,
    GoogleOutlined
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { LOGGED_IN_USER } from '../../actions/types'
import { Link } from 'react-router-dom'
import { createOrUpdateUser } from '../../functions/auth'


const Login = ({ history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        let intended = history.location.state

        if (intended) {
            return
        } else {
            if (user && user.token) {
                history.push('/')
            }
        }


    }, [user, history])


    const dispatch = useDispatch()

    const roleBasedRedirect = (res) => {
        let intended = history.location.state

        if (intended) {
            history.push(intended.from)
        } else {
            if (res.data.role === "admin") {
                history.push("/admin/dashboard")
            } else {
                history.push("/user/history")
            }
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const result = await auth.signInWithEmailAndPassword(email, password)


            const { user } = result
            const idTokenResult = await user.getIdTokenResult()

            createOrUpdateUser(idTokenResult.token)
                .then(res => {
                    dispatch({
                        type: LOGGED_IN_USER,
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id
                        },
                    })
                    roleBasedRedirect(res)
                })
                .catch(err => console.log(err))


            // history.push('/')

        } catch (err) {
            console.log(err)
            toast.error(err.message)
            setLoading(false)

        }

    }

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result
                const idTokenResult = await user.getIdTokenResult()

                createOrUpdateUser(idTokenResult.token)
                    .then(res => {
                        dispatch({
                            type: LOGGED_IN_USER,
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id
                            }
                        })
                        roleBasedRedirect(res)
                    })
                    .catch(err => console.log(err))
                // history.push('/')

            }).catch((err) => {
                console.log(err)
                toast.error(err.message)
            })

    }



    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {!loading ? <h4>Login</h4> : <h4 className="text-danger">Loading...</h4>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your Email"
                                autoFocus
                            />
                        </div>
                        <div className="form-group">
                            <input type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your Password"
                            />
                        </div>
                        <Button onClick={handleSubmit}
                            type="primary"
                            className="mb-3"
                            block
                            shape="round"
                            size="large"
                            disabled={!email || password.length < 6}
                            icon={<MailOutlined />}
                        >Login With Email/Password</Button>
                        <Button onClick={googleLogin}
                            type="danger"
                            className="mb-3"
                            block
                            shape="round"
                            size="large"
                            icon={<GoogleOutlined />}
                        >Login With Google</Button>

                        <Link to="/forgot/password" className="float-right text-danger">Forgot Password</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
