import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import TaskList from './Components/Tasks/TasksList'
import Header from './Components/Structure/Header';
import Lists from './Components/Structure/Lists';
import Filters from './Components/Structure/Filters';
import DeleteCompleteTasks from './Components/Structure/DeleteCompleteTasks';

function App() {
  return (
    <div style={{height: '100%'}}>
      <Container fluid style={{height: '100%'}}>
        <Row className="headerRow">
          <Col>
            <Header />
          </Col>
        </Row>
        <Row style={{height:'90%'}}>
          <Col sm={3} className="sideBar" >
              <Filters />                    
              <Lists /> 
              <DeleteCompleteTasks />                  
          </Col>
          <Col sm={9} >
              <TaskList />
          </Col>
      </Row>
      </Container>
    </div>
  );
}

export default App;
