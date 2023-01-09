import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import AppointmentService from "../services/appointmentService";

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import dateFormatter from "utils/dateFormatter";

function AppointmentsTable() {

  const[appointments,setAppointments]=useState('')
  const[updateError,setUpdateError]=useState(false)

  async function getAppointments(){
      const response=await AppointmentService.list()
      setAppointments(response.data)
  }
  useEffect(()=>{
      getAppointments()
  },[])

  async function handleAction(id,status){
    const res=await AppointmentService.changeStatus(id,{status})
    if(res.data.nModified!==1)return setUpdateError(true)
    getAppointments()
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
                      <th className="border-0">user</th>
                      <th className="border-0">date</th>
                      <th className="border-0">time</th>
                      <th className="border-0">office</th>
                      <th className="border-0">status</th>
                      <th className="border-0 d-flex align-items-center justify-content-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    appointments.length?
                    appointments.map((appt,index)=>{
                      const status=appt.status
                      return(
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{appt.user.name}</td>
                          <td>{dateFormatter(appt.date)}</td>
                          <td>{appt.time}</td>
                          <td>{`${appt.office.address}, ${appt.office.city}, ${appt.office.country}`}</td>
                          <td><span style={{backgroundColor: status==='REJECTED'?'#FF7F7F':status==='ACCEPTED'?'#90EE90':'lightblue', borderRadius:20, padding:6}} >{status}</span></td>
                          <td className="text-center">
                            <FontAwesomeIcon icon={faCheck} style={{color:status==='ACCEPTED'?'grey':'green'}} onClick={()=>handleAction(appt._id,"ACCEPTED")}/>
                            <FontAwesomeIcon icon={faCircleXmark} style={{color:status==='REJECTED'?'grey':'red'}} onClick={()=>handleAction(appt._id,"REJECTED")}/>
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

export default AppointmentsTable;
