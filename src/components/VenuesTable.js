import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPencil, faTrash, faChevronCircleLeft, faChevronCircleRight} from '@fortawesome/free-solid-svg-icons'
import Service from "../services/venueService";

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Button,
  Carousel
} from "react-bootstrap";
import { useHistory } from "react-router";

function VenuesTable() {

  const[venues,setVenues]=useState('')
  const[updateError,setUpdateError]=useState(false)
  const history=useHistory()

  async function getVenues(){
      const response=await Service.list()
      setVenues(response.data)
  }
  useEffect(()=>{
      getVenues()
  },[])

  function navToManage(venue){
    if(!venue._id)return history.push('manage')
    history.push({
      state: { venue },
      pathname: 'manage'
    })
  }

  async function handleDelete(id){
    const res=await Service.remove(id)
    if(res.data.deletedCount!==1)return 
    getVenues()
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Sr.</th>
                      <th className="border-0">name</th>
                      <th className="border-0">description</th>
                      <th className="border-0">capacity</th>
                      <th className="border-0">address</th>
                      <th className="border-0">images</th>
                      <th className="border-0 d-flex align-items-center justify-content-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    venues.length?
                    venues.map((venue,index)=>{
                      return(
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{venue.name}</td>
                          <td>{venue.description}</td>
                          <td>{venue.capacity}</td>
                          <td>{`${venue.address}, ${venue.city}, ${venue.country}`}</td>
                          <td>{
                          venue.images?
                            <Carousel slide={false} style={{width:125}} nextLabel="" prevLabel="" prevIcon={venue.images.length>1?<FontAwesomeIcon icon={faChevronCircleLeft} style={{fontSize:35,fontWeight:'bold'}}/>:null} nextIcon={venue.images.length>1?<FontAwesomeIcon icon={faChevronCircleRight} style={{fontSize:35}}/>:null}>
                                {venue.images.map((image,index)=>(
                                  <Carousel.Item key={index} style={{width:125}}>
                                    <img
                                      style={{height:80,width:125}}
                                      src={`http://localhost:4000/uploads/images/${image}`}
                                      alt="Venue Images Here"
                                    />
                                  </Carousel.Item>
                                ))}
                              </Carousel>:null}
                          </td>
                          <td className="text-center">
                            <FontAwesomeIcon icon={faPencil} className='mr-2' style={{color:'green'}} onClick={()=>navToManage(venue)}/>
                            <FontAwesomeIcon icon={faTrash} style={{color:'red'}} onClick={()=>handleDelete(venue._id)}/>
                          </td>
                        </tr>
                      )
                    }):null
                  }
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <div className="d-flex justify-content-end">
                <Button className="btn btn-primary" onClick={navToManage}>+Add New</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default VenuesTable;
