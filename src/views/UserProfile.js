import React, { useEffect, useState } from "react";
import AuthService from "services/authService";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { useHistory } from "react-router";

function User() {


  const [user,setUser]=useState('')
  const history=useHistory()

  async function getProfile(){
    const res = await AuthService.getProfile()
    setUser(res.data)
    if(!user._id)return
  }

  useEffect(()=>{
    getProfile()
  },[])

  async function handleSubmit(e){
    e.preventDefault()
    if(e.target[2].value!==e.target[3].value)return alert('passwords do not match')
    if(e.target[3].value.length!==0&&e.target[3].value.length<8)return alert('passwords must be of length 8 or greater')
    const payload={
      name:e.target[0].value,
      password:e.target[2].value,
    }
    const res=await AuthService.updateProfile(user._id,payload)
    if(res.data.nModified!==1)return
    history.push('/admin/dashboard')
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          defaultValue={user?user.name:''}
                          placeholder="John"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          defaultValue={user?user.email:''}
                          disabled
                          placeholder="john@example.com"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-5">
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          placeholder=""
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Confirm Password</label>
                        <Form.Control
                          placeholder=""
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col> 
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
