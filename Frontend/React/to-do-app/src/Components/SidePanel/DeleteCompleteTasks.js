import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

const DeleteCompleteTasks = () => {
    return(
        <ListGroup style={{margin:'15px 0px', width: '100%'}}>
            <ListGroup.Item action>Delete Completed Tasks</ListGroup.Item>
        </ListGroup> 
    )
}

export default DeleteCompleteTasks