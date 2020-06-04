import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

const List = () => {
    return(
        <ListGroup style={{margin:'15px 0px', width: '100%'}}>
            <ListGroup.Item action>Reminders</ListGroup.Item>
            <ListGroup.Item action>Shopping</ListGroup.Item>
            <ListGroup.Item action>Birthdays</ListGroup.Item>                        
        </ListGroup> 
    )
}

export default List