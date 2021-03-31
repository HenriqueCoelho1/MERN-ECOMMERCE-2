import React, { useState } from 'react'
import { Col, Row, Container, Form, Button } from 'react-bootstrap'
import { auth } from '../firebase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const RegisterScreen = () => {
    const { Control } = Form

    const handleSubmit = async (e) => {
        e.preventDefault()//this stop the browser from reload when the button action is called
        const config = {
            url: 'http://localhost:3000/register/complete',
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
                    <ToastContainer />

                    <Form onSubmit={handleSubmit}>
                        <Control
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autofocus />

                        <Button type='submit' variant='raised'>Register</Button>
                    </Form>
                </Col>

            </Row>
        </Container>

    )
}

export default RegisterScreen
