import React from "react";
import Service from "../../services/officeService";

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";
import { useHistory, useLocation } from "react-router";


function ManageOffice(){
    const location=useLocation()
    const history=useHistory()
    let office=null
    
    if(location.state){
      office=location.state.office
      console.log(office)
    }

    async function handleSubmit(e){
      e.preventDefault()
      
      const payload={
        address:e.target[0].value,
        city:e.target[1].value,
        country:e.target[2].value,
      }
      if(office){
        console.log('before entering service')
        const res=await Service.edit(office._id,payload)
        console.log(res)
      }
      else{
        await Service.create(payload)
      }
      history.push('list')
    }
    return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">{office?'Update':'Create'} Office</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col className="mr-1" md="12">
                        <Form.Group>
                          <label>address</label>
                          <Form.Control
                            defaultValue={office?office.address:''}
                            placeholder="street # 10, new chicago"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                     
                    </Row>
                    <Row className="mb-5">
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>city</label>
                          <Form.Control
                            defaultValue={office?office.city:''}
                            placeholder="NY"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="6">
                        <Form.Group>
                          <label>country</label>
                          <Form.Control
                            defaultValue={office?office.country:''}
                            placeholder="UK"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info"
                    >
                      {office?'Update':'Create'} Office
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

export default ManageOffice