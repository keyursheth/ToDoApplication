import React from 'react';
import Form from 'react-bootstrap/Form';

import './TaskList.css';

import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from 'react-bootstrap/InputGroup'

const TasksListNew = (
{
    todoList, 
    onTaskChange, 
    onTaskComplete, 
    onTaskSave,
    showCompleted,
    showPending
}) => 
{
    const displayTask = (item) => {

        const checkboxId = `chk${item.taskId}`
        
        return(
            <ListGroup.Item key={item.taskId} className="listGroup">
                <InputGroup className="inputGroup">
                    <Form.Check 
                        id={checkboxId}
                        custom
                        type="checkbox"
                        label=''
                        checked={item.isComplete}
                        onChange={() => onTaskComplete(item.taskId)}
                    />
                    <Form.Control 
                        type="text" 
                        value={item.taskDescription}
                        className="listItemText"
                        onBlur={() => onTaskSave(item)}
                        onChange={(e) => onTaskChange(e.target.value, item.taskId)}
                    />
                </InputGroup>                       
            </ListGroup.Item> 
        );
    }

    return (
        <>
            <div className="taskHeading">Reminders</div>
            <div className="listScroll">                
                <ListGroup variant="flush" style={{marginTop: '5px'}}>
                    {
                        showPending ?
                            todoList
                            .sort((a, b) => a.taskDescription.localeCompare(b.taskDescription))
                            .map((item) => {

                                if (item.isComplete === true) {
                                    return null;
                                }

                                return displayTask(item)
                            })
                        : null
                    }
                    {
                        showCompleted ?
                            todoList
                            .sort((a, b) => a.taskDescription.localeCompare(b.taskDescription))
                            .map((item) => {

                                if (item.isComplete !== true) {
                                    return null;
                                }

                                return displayTask(item)
                            })
                        : null
                    }
                </ListGroup>
            </div>                
        </>
    );
}

export default TasksListNew