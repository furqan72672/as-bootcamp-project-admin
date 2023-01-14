import React, { useState, useEffect } from "react";
import Service from "../services/bookingService";
// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import dateFormatter from "utils/dateFormatter";

function BookingsTable() {

  const[bookings,setBookings]=useState('')

  async function getBookings(){
    const response=await Service.list()
    setBookings(response.data)
  }
  useEffect(()=>{
    getBookings()
  },[])

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
                      <th className="border-0">user</th>
                      <th className="border-0">date</th>
                      <th className="border-0">time</th>
                      <th className="border-0">venue</th>
                      <th className="border-0">status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    bookings.length?
                    bookings.map((booking,index)=>{
                      const status=booking.status
                      return(
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{booking.user.name}</td>
                          <td>{dateFormatter(booking.date)}</td>
                          <td>{booking.time}</td>
                          <td>{`${booking?.venue?.address}, ${booking?.venue?.city}, ${booking?.venue?.country}`}</td>
                          <td><span style={{backgroundColor: status==='COMPLETED'?'#90EE90':'lightblue', borderRadius:20, padding:6}} >{status}</span></td>
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

export default BookingsTable;
