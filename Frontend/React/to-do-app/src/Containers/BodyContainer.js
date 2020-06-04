import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import TaskContainer from './Containers/TaskContainer'
import SidePanelContainer from './Containers/SidePanelContainer';

const BodyContainer = () => {
    return(
        <Row style={{height:'90%'}}>
          <Col sm={3} className="sideBar" >
            <SidePanelContainer />
          </Col>
          <Col sm={9} >
            <TaskContainer />
          </Col>
        </Row>
    )
}

export default BodyContainer