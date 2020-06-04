import React, { useRef } from 'react'

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const TaskAdd = ({onTaskAdd}) => {

    const taskText = useRef('');

    const addTaskHandler = (e) => {                
        onTaskAdd(taskText.current.value); 
        taskText.current.value = '';    
        e.preventDefault();       
    }

    return(
        <div style={{marginTop: '35px'}}>
            <Form>
                <Form.Row>
                    <Col>
                        <Form.Control 
                            placeholder="Add Task" 
                            ref={taskText} 
                        />
                    </Col>
                    <Col>
                        <Button 
                            variant="danger" 
                            type="button"
                            onClick={(e) => addTaskHandler(e)} 
                        >
                            Submit
                        </Button>
                    </Col>
                </Form.Row>
            </Form>                    
        </div>
    )
}

export default TaskAdd