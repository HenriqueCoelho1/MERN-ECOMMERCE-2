import React, { useState, useEffect } from 'react'
import { Col, Row, Container, Form, Button } from 'react-bootstrap'
import { auth } from '../firebase'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'


const ForgotPasswordScreen = ({ history }) => {
    const [email, setEmail] = useState('')

    const { Control } = Form

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        };

        await auth
            .sendPasswordResetEmail(email, config)
            .then(() => {
                toast.success(`Check your ${email} for password reset link`)
                setEmail('')

            })
            .catch((error) => {
                toast.error(error.message);
            });
    }
    return (

        <Container className='p-5'>
            <Col md={{ span: 6, offset: 3 }}>
                <h4>Forgot Password</h4>

                <Form onSubmit={handleSubmit}>
                    <Control type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Type Your Email'
                        autoFocus />

                    <br />
                    <Button type='submit' variant='raised' disabled={!email}>
                        Submit
                </Button>
                </Form>
            </Col>

        </Container>
    )
}

export default ForgotPasswordScreen
