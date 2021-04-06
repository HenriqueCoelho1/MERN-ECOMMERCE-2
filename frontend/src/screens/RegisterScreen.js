import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Col, Row, Container, Form, Button } from 'react-bootstrap'
import { auth } from '../firebase'
import { toast } from 'react-toastify'


const RegisterScreen = ({ history }) => {
    const { Control } = Form

    // const userLogin = useSelector(state => state.userLogin)
    // const { userInfo } = userLogin
    // const { token: tokenLogged } = userInfo || {}

    let { userLogin } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        if (userLogin && userLogin.token) {
            history.push('/')
        }
    }, [userLogin, history])

    const handleSubmit = async (e) => {
        e.preventDefault()//this stop the browser from reload when the button action is called
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true
        }

        await auth.sendSignInLinkToEmail(email, config)
        toast.success(`Email is sent to ${email}. Click the link to complete your registration`)


        //save your email in local storage
        window.localStorage.setItem('emailForRegistration', email)
        //clear state
        setEmail('')
    }



    const [email, setEmail] = useState('')
    return (
        <Container className='p-5'>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h4>Register</h4>


                    <Form onSubmit={handleSubmit}>
                        <Control
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='Your email'
                            autoFocus />

                        <Button type='submit' variant='raised'>Register</Button>
                    </Form>
                </Col>

            </Row>
        </Container>

    )
}

export default RegisterScreen
