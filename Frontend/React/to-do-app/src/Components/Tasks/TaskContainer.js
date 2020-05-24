import React, { useState, useEffect } from 'react'
import TasksList from './TasksList'
import TasksListNew from './TasksListNew'
import AddTask from './AddTask'
import { Switch, Route } from 'react-router-dom';
import EditTask from '../EditTask';

const TaskContainer = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [todoItems, setToDoItems] = useState([]);
    
    const baseURI = 'https://localhost:44347/api/tasks';
    
    useEffect(() => {        
        fetchAllTasks();
    }, []);

    const fetchAllTasks = () => {
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
    
    const addNewTaskHandler = (taskText) => {

        const item = {
            "listId": 1,
            "taskDescription": taskText
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
                fetchAllTasks();
            }
        })
        .catch(error => console.error('Unable to add item.', error));
    }

    const deleteTaskHandler = (taskId) => {
        fetch(`${baseURI}/${taskId}`, {
            method: 'DELETE'
          })
          .then((response) => {
              if (response.status === 200) {
                fetchAllTasks();
              }
          })
          .catch(error => console.error('Unable to delete item.', error));
    }

    const updateTaskHandler = (taskId, taskData) => {
        fetch(`${baseURI}/${taskId}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
          })
          .then((response) => {               
               if (response.status === 200) {
                   fetchAllTasks();
               }
            })
          .catch(error => console.error('Unable to update item.', error));
    }

    if(error) {
        return <div>Error: {error.message}</div>
    }
    else if(!isLoaded) {
        return <div>Loading...</div>
    }
    else {
        return (
            <div>
                <Switch>
                    <Route path='/old'>
                        <TasksList
                            todoItems={todoItems} 
                            onTaskDelete={deleteTaskHandler} 
                            onTaskUpdate={updateTaskHandler}
                        />
                    </Route>
                    <Route path='/taskedit/:id'>
                        <EditTask
                            onTaskUpdate={updateTaskHandler} 
                        />
                    </Route>
                    <Route path='/'>
                        <TasksListNew 
                            todoItems={todoItems} 
                            onTaskDelete={deleteTaskHandler} 
                            onTaskUpdate={updateTaskHandler}
                        />
                        <AddTask 
                            onTaskAdd={addNewTaskHandler}                      
                        />
                    </Route>
                </Switch>                
            </div>
        )             
    }
}

export default TaskContainer