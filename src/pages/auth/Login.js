import React, { useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { Button } from 'antd'
import {
    MailOutlined
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { LOGGED_IN_USER } from '../../actions/types'

const Login = ({ history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const result = await auth.signInWithEmailAndPassword(email, password)


            const { user } = result
            const idTokenResult = await user.getIdTokenResult()

            dispatch({
                type: LOGGED_IN_USER,
                payload: {
                    email: user.email,
                    token: idTokenResult.token

                }
            })
            history.push('/')

        } catch (err) {
            console.log(err)
            toast.error(err.message)
            setLoading(false)

        }

    }



    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Login</h4>
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
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
