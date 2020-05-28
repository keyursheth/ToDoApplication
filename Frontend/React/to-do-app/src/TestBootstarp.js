import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'

import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

import TaskContainer from './Containers/TaskContainer'

export default function TestBootstrap() {

    const borderStyle = {
        'border': '1px solid black'
    }

    return(
        <Container fluid style={{height: '100%'}}>
            <Row style={{height:'10%', alignContent: 'center', borderBottom: '1px solid lightgray'}}>
                <Col>
                    <Navbar>
                        <Navbar.Brand href="/" style={{'color': '#dc3545', fontSize: 'x-large', fontWeight: '400'}}>
                            To-Do Application
                        </Navbar.Brand>                        
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as: <b>Keyur Sheth</b>
                            </Navbar.Text>
                        </Navbar.Collapse>                       
                    </Navbar>
                </Col>                
            </Row>
            <Row style={{height:'90%'}}>
                <Col sm={2} style={{borderRight: '1px solid lightgray', backgroundColor: 'whitesmoke', padding: '0'}} >
                    <ListGroup style={{margin:'15px 5px'}}>
                        <ListGroup.Item action>All Tasks</ListGroup.Item>
                        <ListGroup.Item action>Completed Tasks</ListGroup.Item>
                        <ListGroup.Item action>Pending Tasks</ListGroup.Item>                        
                    </ListGroup>                    
                    <ListGroup style={{margin:'15px 5px'}}>
                        <ListGroup.Item action>Reminders</ListGroup.Item>
                        <ListGroup.Item action>Shopping</ListGroup.Item>
                        <ListGroup.Item action>Birthdays</ListGroup.Item>                        
                    </ListGroup>                    
                </Col>
                <Col sm={10} >
                    <TaskContainer />
                </Col>
            </Row>
        </Container>
    )
}

