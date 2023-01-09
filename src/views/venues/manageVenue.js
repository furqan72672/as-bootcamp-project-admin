import React from "react";
import Service from "../../services/venueService";

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


function ManageVenue(){
    const location=useLocation()
    const history=useHistory()
    let venue=null
    
    if(location.state){
      venue=location.state.venue
      console.log(venue)
    }

    async function handleSubmit(e){
      e.preventDefault()
      
      const payload={
        name:e.target[0].value,
        capacity:e.target[1].value,
        description:e.target[2].value,
        address:e.target[3].value,
        city:e.target[4].value,
        country:e.target[5].value,
      }
      if(venue){
        await Service.edit(venue._id,payload)
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
                  <Card.Title as="h4">{venue?'Update':'Create'} Venue</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Name</label>
                          <Form.Control
                            defaultValue={venue?venue.name:''}
                            placeholder="Venue 1"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="6">
                        <Form.Group>
                          <label>capacity</label>
                          <Form.Control
                            defaultValue={venue?venue.capacity:''}
                            placeholder="No. of guests"
                            type="number"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                        <Col className="mr-1" md="12">
                            <Form.Group>
                                <label>Description</label>
                                <Form.Control
                                    defaultValue={venue?venue.description:''}
                                    placeholder="Venue Details"
                                    as="textarea"
                                    rows='5'
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                      <Col className="mr-1" md="12">
                        <Form.Group>
                          <label>address</label>
                          <Form.Control
                            defaultValue={venue?venue.address:''}
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
                            defaultValue={venue?venue.city:''}
                            placeholder="NY"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="6">
                        <Form.Group>
                          <label>country</label>
                          <Form.Control
                            defaultValue={venue?venue.country:''}
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
                      {venue?'Update':'Create'} Venue
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

export default ManageVenue