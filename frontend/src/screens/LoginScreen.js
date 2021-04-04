import React, { useState } from 'react'
import { Col, Row, Container, Form } from 'react-bootstrap'
import { auth, googleAuthProvider } from '../firebase'
import { toast } from 'react-toastify'
import { Button } from 'antd'
import Loader from '../components/Loader'
import { MailOutlined, GoogleOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { USER_LOGIN_SUCCESS } from '../actions/types'


const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState('megawats.oitavo@gmail.com')
    const [password, setPassword] = useState('123456')
    const [loading, setLoading] = useState(false)
    const { Control, Group } = Form

    const dispatch = useDispatch()

    // const userLogin = useSelector(state => state.userLogin)

    // const { loadingLogin, error, userInfo } = userLogin

    const handleSubmit = async (e) => {
        e.preventDefault()//this stop the browser from reload when the button action is called
        setLoading(true)

        try {
            const result = await auth.signInWithEmailAndPassword(email, password)

            const { user } = result
            const idTokenResult = await user.getIdTokenResult()

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                }
            })
            history.push('/')


        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error(error.message)

        }


    }


    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result
                const idTokenResult = await user.getIdTokenResult()
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: {
                        email: user.email,
                        token: idTokenResult.token
                    }
                })
                history.push('/')

            })
            .catch((err) => {
                console.log(err)
                toast.error(err.message)
            })
    }




    return (
        <Container className='p-5'>
            <Row>
                {/* {loadingLogin && <Loader />} */}
                <Col md={{ span: 6, offset: 3 }}>
                    {!loading ? <h4>Login</h4> : (<Loader />)}
                    <Form onSubmit={handleSubmit}>
                        <Group>
                            <Control
                                type='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder='Your email'
                                autoFocus />

                        </Group>

                        <Group>
                            <Control
                                type='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder='Your password'
                            />

                        </Group>

                        <br />

                        <Button
                            type='primary'
                            mb={3}
                            onClick={handleSubmit}
                            block
                            shape="round"
                            icon={<MailOutlined />}
                            size="large"
                            disabled={!email || password.length < 6}>
                            Login with Email/Password
                        </Button>

                    </Form>

                    <Button
                        type='danger'
                        mb={3}
                        onClick={googleLogin}
                        block
                        shape="round"
                        icon={<GoogleOutlined />}
                        size="large">
                        Login with Google
                        </Button>
                </Col>

            </Row>
        </Container>

    )
}

export default LoginScreen
