import React, { useRef } from 'react'
import Form from 'react-bootstrap/Form';

import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const AddTask = (props) => {

    const taskText = useRef('');
    const { onComplete, baseURI } = {...props};

    const addTaskClick = () => {
        const newTaskText = taskText.current.value;
        if (newTaskText !== '') {
            taskText.current.value = '';
            
            const item = {
                "listId": 1,
                "taskDescription": newTaskText
            };
            
            fetch(baseURI, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            })
            .then((response) => {
                if (response.status === 201) {
                    onComplete(true);
                }
            })
            .catch(error => {console.error('Unable to add item.', error); onComplete(false);});
        }        
    }

    return(
        <div style={{marginTop: '35px'}}>
            {/* <input 
                type="text" 
                ref={taskText} 
            />  */}
            <Form>
                <Form.Row>
                    <Col>
                        <Form.Control placeholder="First name" />
                    </Col>
                    <Col>
                        <Button variant="danger" type="button">Submit</Button>
                    </Col>
                </Form.Row>
            </Form>
            {/* <input 
                type="button" 
                value="Add Task" 
                style={{marginLeft:'10px'}} 
                onClick={() => addTaskClick()} 
            /> */}
        </div>
    )
}

export default AddTask