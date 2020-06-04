import React, { useEffect, useState, useReducer } from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import TaskContainer from './TaskContainer'
import SidePanelContainer from './SidePanelContainer';
import StatusConstants from '../Constants/StatusConstants';

const BodyContainer = () => {

    const baseURI = 'https://localhost:44347/api/tasks';  
        
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);  
    const [todoItems, setToDoItems] = useState([]);

    const filterInitialState = {
        showPending: true,
        showCompleted: true
    }

    const taskReducer = (state, action) => {
        switch (action.type) {
            case StatusConstants.All:
                return {
                    showPending: true,
                    showCompleted: true
                }
            case StatusConstants.Completed:
                return {
                    showPending: false,
                    showCompleted: true
                }
            case StatusConstants.Pending:
                return {
                    showPending: true,
                    showCompleted: false
                }
            default:
                return state;
        }
    }

    const [statusFilterState, dispatchStatusFilter] = useReducer(taskReducer, filterInitialState);

    useEffect(() => {        
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
    }, []);

    const taskDescriptionChangeEvent = (newDescription, taskId) => {

      const newTodoItems = todoItems.map((todo) => {
          
          if (todo.taskId === taskId) {
              todo.taskDescription = newDescription;
          }

          return todo;
      });

      setToDoItems(newTodoItems);
    }

    const taskCompleteChangeEvent = (taskId) => {

    let newItem = null;
    const newTodoItems = todoItems.map((todo) => {
        
        if (todo.taskId === taskId) {
            todo.isComplete = !todo.isComplete;
            newItem = todo;
        }

        return todo;
    });        
    
    fetch(`${baseURI}/${taskId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      })
      .then((response) => {               
            setToDoItems(newTodoItems);
        })
      .catch(error => {
          console.error('Unable to update item.', error); 
      });
    }

    const taskSaveEvent = (item) => {
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

    const taskAddEvent = (taskDescription) => {
        
        if (taskDescription !== '') {
            
            const item = {
                "listId": 1,
                "taskDescription": taskDescription
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
                const newTodoItems = [...todoItems];
                newTodoItems.push(res);
                setToDoItems(newTodoItems);
            })
            .catch(error => {console.error('Unable to add item.', error); });
        }        
    }


    if(error) {
        return <div>Error: {error.message}</div>
    }
    else if(!isLoaded) {
        return <div>Loading...</div>
    }
    else {
      return(
          <Row style={{height:'90%'}}>
              <Col sm={3} className="sideBar" >
                  <SidePanelContainer statusFilterDispatch={dispatchStatusFilter} />
              </Col>
              <Col sm={9} >
                  <TaskContainer 
                      todoList={todoItems} 
                      onTaskChange={taskDescriptionChangeEvent}
                      onTaskComplete={taskCompleteChangeEvent}
                      onTaskSave={taskSaveEvent} 
                      onTaskAdd={taskAddEvent}
                      showCompleted={statusFilterState.showCompleted}
                      showPending={statusFilterState.showPending}                      
                  />
              </Col>
          </Row>
      )
    }
}

export default BodyContainer