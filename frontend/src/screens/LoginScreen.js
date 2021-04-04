import React, { useState } from 'react'
import { Col, Row, Container, Form } from 'react-bootstrap'
import { auth } from '../firebase'
import { toast } from 'react-toastify'
import { Button } from 'antd'
import { MailOutlined } from '@ant-design/icons'


const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { Control, Group } = Form

    const handleSubmit = async (e) => {
        e.preventDefault()//this stop the browser from reload when the button action is called


    }




    return (
        <Container className='p-5'>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h4>Login</h4>


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
                            type='submit'
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
                </Col>

            </Row>
        </Container>

    )
}

export default LoginScreen
