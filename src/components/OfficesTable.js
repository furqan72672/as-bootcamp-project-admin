import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {faPencil} from '@fortawesome/free-solid-svg-icons'
import Service from "../services/officeService";

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router";

function OfficesTable() {

  const[offices,setOffices]=useState('')
  const[updateError,setUpdateError]=useState(false)
  const history=useHistory()

  async function getOffices(){
      const response=await Service.list()
      setOffices(response.data)
  }
  useEffect(()=>{
      getOffices()
  },[])

  async function handleDelete(id){
    const res=await Service.remove(id)
    if(res.data.deletedCount!==1)return setUpdateError(true)
    getOffices()
  }


  /**
   * @todo implement edit functionality
   * @todo implement create functionality
   */

  function navToManage(office){
    console.log(office)
    if(!office._id)return history.push('manage')
    history.push({
      state: { office },
      pathname: 'manage'
    })
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
                      <th className="border-0">address</th>
                      <th className="border-0">city</th>
                      <th className="border-0">country</th>
                      <th className="border-0 d-flex align-items-center justify-content-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    offices.length?
                    offices.map((office,index)=>{
                      return(
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{office.address}</td>
                          <td>{office.city}</td>
                          <td>{office.country}</td>
                          <td className="text-center">
                            <FontAwesomeIcon icon={faPencil} className="mr-2" style={{color:'green'}} onClick={()=>navToManage(office)}/>
                            <FontAwesomeIcon icon={faTrash} style={{color:'red'}} onClick={()=>handleDelete(office._id)}/>
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

export default OfficesTable;
