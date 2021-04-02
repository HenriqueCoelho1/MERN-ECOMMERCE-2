import React, { useState, useEffect } from 'react'
import { Col, Row, Container, Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { auth } from '../firebase'


const RegisterCompleteScreen = ({ history }) => {
    const { Control } = Form

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

        //validation

        if (!email || !password) {
            toast.error('Error email and password is required')
            return
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href)

            if (result.user.emailVerified) {
                //remove the user from local storage because firebase API can track the user
                window.localStorage.removeItem('emailForRegistration')

                //get the current user id token
                let user = auth.currentUser
                //update the password
                await user.updatePassword(password)
                const idTokenResult = await user.getIdTokenResult()



                history.push('/')

            }


        } catch (error) {
            toast.error(error.message)

        }


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
