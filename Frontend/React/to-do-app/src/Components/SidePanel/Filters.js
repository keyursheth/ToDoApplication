import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

const Filters = () => {
    return(
        <ListGroup style={{margin:'15px 0px', width: '100%'}}>
            <ListGroup.Item action>All Tasks</ListGroup.Item>
            <ListGroup.Item action>Completed Tasks</ListGroup.Item>
            <ListGroup.Item action>Pending Tasks</ListGroup.Item>                        
        </ListGroup>
    )
}

export default Filters