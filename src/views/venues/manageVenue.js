import React, { useEffect, useState } from "react";
import Service from "../../services/venueService";
import './manageVenue.css'

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


function ManageVenue(){
    const location=useLocation()
    const history=useHistory()
    let venue=null
    let images=null
    let [re,setRe]=useState(true)

    if(location.state){
      venue=location.state.venue
      images=venue.images
    }

    function handleDeleteImage(img){
      venue.images.splice(venue.images.indexOf(img),1)
      setRe(!re)
      console.log(venue.images)
    }

    async function handleSubmit(e){
      e.preventDefault()

      console.log(e.target)
      
      // const payload={
      //   name:e.target[0].value,
      //   capacity:e.target[1].value,
      //   description:e.target[2].value,
      //   address:e.target[3].value,
      //   city:e.target[4].value,
      //   country:e.target[5].value,
      // }
      // if(venue){
      //   await Service.edit(venue._id,payload)
      // }
      // else{
      //   await Service.create(payload)
      // }
      // history.push('list')
    }

    return (
      <>
        <Container fluid>
          <Row className="mt-5">
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
                    {venue?<>
                    <Row className="mb-2">
                      <Col className="d-flex flex-wrap justify-content-center">
                          {venue.images.map((image,index)=>(
                            <div key={index} style={{background:`url('http://localhost:4000/uploads/images/${image}')`}} className="mt-2 mr-2 img-div" >
                              {venue.images.length>1?<FontAwesomeIcon icon={faTrash} style={{color:'red',position:'absolute',top:5,right:5}} onClick={()=>handleDeleteImage(image)}/>:null}
                            </div>
                          ))}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="d-flex justify-content-end">
                        <input type='file' name="file" disabled={venue.images.length===5} multiple accept="image/png,image/jpg,image/jpeg"/>
                      </Col>
                    </Row>
                    </>:null}

                    <Row>
                      <Col className="d-flex justify-content-end">
                        <Button
                          className="btn-fill"
                          type="submit"
                          variant="success"
                        >
                          {venue?'Update':'Create'} Venue
                        </Button>
                      </Col>
                    </Row>
                    
                    {/* <div className="mt-5 d-flex justify-content-end">
                      
                    </div> */}
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