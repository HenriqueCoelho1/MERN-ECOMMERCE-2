import React, { useState, useEffect } from 'react'
import { Col, Row, Container, Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'


const RegisterCompleteScreen = ({ history }) => {
    const { Control } = Form

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
    }, [])


    const handleSubmit = async (e) => {


    }


    return (
        <Container className='p-5'>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h4>Register Complete</h4>


                    <Form onSubmit={handleSubmit}>
                        <Control
                            type='email'
                            value={email}
                            disabled />

                        <Control
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoFocus
                            placeholder='Set Your Password Here'
                        />


                        <Button type='submit' variant='raised'>Complete Your Registration</Button>
                    </Form>
                </Col>

            </Row>
        </Container>

    )
}

export default RegisterCompleteScreen
