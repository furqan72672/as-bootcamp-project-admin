import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons'
import {faStar as hollowStar} from '@fortawesome/free-regular-svg-icons'
import Service from "../services/ratingService";

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function RatingsTable() {

  const[ratings,setRatings]=useState('')
  const[updateError,setUpdateError]=useState(false)

  async function getRatings(){
      const response=await Service.list()
      setRatings(response.data)
  }
  useEffect(()=>{
      getRatings()
  },[])

  async function handleDelete(id){
    const res=await Service.remove(id)
    if(res.data.deletedCount!==1)return setUpdateError(true)
    getRatings()
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
                      <th className="border-0">#</th>
                      <th className="border-0">venue</th>
                      <th className="border-0">user</th>
                      <th className="border-0">rating</th>
                      <th className="border-0">comments</th>
                      <th className="border-0 d-flex align-items-center justify-content-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    ratings.length?
                    ratings.map((rating,index)=>{
                      return(
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{rating.venue.name}</td>
                          <td>{rating.user.name}</td>
                          <td>
                            <span>{
                            [...Array(rating.stars)].map((i) =><FontAwesomeIcon key={i} icon={faStar} style={{color:'yellow'}}/>)
                            }</span>
                            <span>{
                            [...Array(5-rating.stars)].map((i) =><FontAwesomeIcon key={i} icon={hollowStar}/>)
                            }</span>
                          </td>
                          <td>{rating.comments}</td>
                          <td className="text-center">
                            <FontAwesomeIcon icon={faTrash} style={{color:'red'}} onClick={()=>handleDelete(rating._id)}/>
                          </td>
                        </tr>
                      )
                    }):null
                  }
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RatingsTable;
