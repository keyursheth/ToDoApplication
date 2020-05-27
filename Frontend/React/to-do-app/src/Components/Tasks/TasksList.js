import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TasksListNew = (props) => {

    const {isReloadList, baseURI, onComplete} = {...props};
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [todoItems, setToDoItems] = useState([]);

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
    }, [isReloadList, baseURI]);

    const completeClickHandler = (item) => {
        item.isComplete = !item.isComplete;
        fetch(`${baseURI}/${item.taskId}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          })
          .then((response) => {               
               if (response.status === 200) {
                   onComplete(true);
               }
            })
          .catch(error => {
              console.error('Unable to update item.', error); 
              onComplete(false);
            });
    }

    const deleteClickHandler = (taskId) => {
        fetch(`${baseURI}/${taskId}`, {
            method: 'DELETE'
          })
          .then((response) => {
              if (response.status === 200) {
                onComplete(true);
              }
          })
          .catch(error => {
              console.error('Unable to delete item.', error); 
              onComplete(false);
            });
    }

    const displayTask = (item) => {

        const taskCompleteStyle = (item.isComplete === false ? '' : 'line-through');
        const editTaskPath = `/taskedit/${item.taskId}`;
        
        return(
            <li key={item.taskId}>    
                <input 
                    type="checkbox" 
                    checked={item.isComplete} 
                    onChange={() => completeClickHandler(item) }
                /> 
                <span
                    style={{textDecoration:taskCompleteStyle}}>
                        {item.taskDescription}
                </span>
                {(item.isComplete === false) ?
                    <Link to={editTaskPath}>
                        <input 
                            type="button" 
                            value="edit" 
                            style={{marginLeft:'10px'}} 
                        /> 
                    </Link>
                    : null
                }
                <input 
                    type="button" 
                    value="delete" 
                    style={{marginLeft:'10px'}} 
                    onClick={() => { deleteClickHandler(item.taskId) }}
                />                                
            </li>
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
            <div>
                <h1>Tasks List</h1>
                <ul style={{listStyleType:'none', paddingLeft:'0px'}}>
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
                </ul>
            </div>
        );
    }
}

export default TasksListNew