import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import './TaskList.css';

import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from 'react-bootstrap/InputGroup'

const TasksListNew = () => {

    const baseURI = 'https://localhost:44347/api/tasks';    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [todoItems, setToDoItems] = useState([]);
    const taskText = useRef('');

    useEffect(() => {        
        getAllTasks();
    }, []);

    const getAllTasks = () => {
        fetch(baseURI)
        .then((res) => { return res.json(); })
        .then((result) => {                
            setIsLoaded(true);
            setToDoItems(result);
        }, 
        (error) => {
            setIsLoaded(true);
            setError(error);
        })
        .catch(error => console.error('Unable to get tasks.', error));
    }

    const addTaskClick = (e) => {
        e.preventDefault();
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
                    return response.json();
                }
            })
            .then((res) => {
                // console.log(res);
                const newTodoItems = [...todoItems];
                newTodoItems.push(res);
                setToDoItems(newTodoItems);
            })
            .catch(error => {console.error('Unable to add item.', error); });
        }        
    }

    const completeClickHandler = (item) => {

        const newTodoItems = todoItems.map((todo) => {
            
            if (todo.taskId === item.taskId) {
                todo.isComplete = !item.isComplete;
            }

            return todo;
        });        
        
        fetch(`${baseURI}/${item.taskId}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          })
          .then((response) => {               
                setToDoItems(newTodoItems);
            })
          .catch(error => {
              console.error('Unable to update item.', error); 
            });
    }

    const onBlurTask = (item) => {
        // console.log('item : ' + item.taskDescription);
        fetch(`${baseURI}/${item.taskId}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          })          
          .catch(error => {
              console.error('Unable to update item.', error);               
            });
    }

    const onChangeTask = (e, item) => {
        
        const newTodoItems = todoItems.map((todo) => {
            
            if (todo.taskId === item.taskId) {
                todo.taskDescription = e.target.value;
            }

            return todo;
        });

        setToDoItems(newTodoItems);
    }

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
                        onChange={() => completeClickHandler(item)}
                    />
                    <Form.Control 
                        type="text" 
                        value={item.taskDescription}
                        className="listItemText"
                        onBlur={() => onBlurTask(item)}
                        onChange={(e) => onChangeTask(e, item)}
                    />
                </InputGroup>                       
            </ListGroup.Item> 
        );
    }

    if(error) {
        return <div>Error: {error.message}</div>
    }
    else if(!isLoaded) {
        return <div>Loading...</div>
    }
    else {
        return (
            <>
                <div className="taskHeading">Reminders</div>
                <div className="listScroll">                
                    <ListGroup variant="flush" style={{marginTop: '5px'}}>
                        {
                            todoItems
                            .sort((a, b) => a.taskDescription.localeCompare(b.taskDescription))
                            .map((item) => {

                                if (item.isComplete === true) {
                                    return null;
                                }

                                return displayTask(item)
                            })
                        }
                        {
                            todoItems
                            .sort((a, b) => a.taskDescription.localeCompare(b.taskDescription))
                            .map((item) => {

                                if (item.isComplete !== true) {
                                    return null;
                                }

                                return displayTask(item)
                            })
                        }
                    </ListGroup>
                </div>
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
                                    onClick={(e) => addTaskClick(e)} 
                                >
                                    Submit
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>                    
                </div>
            </>
        );
    }
}

export default TasksListNew