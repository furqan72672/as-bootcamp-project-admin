import React, { useState } from "react";
import AuthService from "../services/authService";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { Redirect, useHistory } from "react-router";


function Login() {

    const token=localStorage.getItem('device_token')
    if(token){
        return <Redirect to='/admin/dashboard' />
    }

    const[email,setEmail]=useState('furqan@gmail.com')
    const[password,setPassword]=useState('12345678')
    const history=useHistory()

    async function handleSubmit(e){
        e.preventDefault()

        const payload={
            email,
            password
        }
        await AuthService.login(payload)

        if(localStorage.getItem('device_token')){
            history.push('/admin/dashboard')
        }
        else alert('Incorrect Credentials')
    }

  return (
    <>
        <Container className="centered">
            <Row>
            <Col className="mx-auto" lg="4" md="8" >
                <Form className="form" onSubmit={handleSubmit}>
                    <Card className="card-login">
                        <Card.Header className="text-center">
                            <div className="logo-holder d-inline-block align-top">
                            <h1>Login</h1>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Card.Body>
                                <Form.Group>
                                    <label>Email address <span className="text-danger">*</span></label>
                                    <Form.Control placeholder="Enter Email" type="text" name="email" value={email} onChange={e => setEmail(e.target.value )}/>
                                </Form.Group>
                                <Form.Group>
                                    <label>Password <span className="text-danger">*</span></label>
                                    <Form.Control placeholder="Enter Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value )}/>
                                </Form.Group>
                            </Card.Body>
                        </Card.Body>
                        <Card.Footer className="ml-auto mr-auto">
                            <Button className="btn-filled" type="submit">Login</Button>
                        </Card.Footer>
                    </Card>
                </Form>
            </Col>
            </Row>
        </Container>
    </>
  );
}

export default Login;
