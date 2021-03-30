import React, { useState } from 'react'
import { Col, Row, Container, Form, Button } from 'react-bootstrap'



const RegisterScreen = () => {
    const { Control } = Form

    const handleSubmit = (e) => {

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
                            autofocus />

                        <Button type='submit' variant='raised'>Register</Button>
                    </Form>
                </Col>

            </Row>
        </Container>

    )
}

export default RegisterScreen
