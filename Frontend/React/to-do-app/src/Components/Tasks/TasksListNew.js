import React from 'react';
import { Link } from 'react-router-dom';

const TasksListNew = (props) => {

    const taskCompleteHandler = (item) => {
        item.isComplete = !item.isComplete;
        props.onTaskUpdate(item);
    }

    const displayTask = (item) => {

        const taskCompleteStyle = (item.isComplete === false ? '' : 'line-through');
        const editTaskPath = `/taskedit/${item.taskId}`;
        
        return(
            <li key={item.taskId}>    
                <input 
                    type="checkbox" 
                    checked={item.isComplete} 
                    onChange={() => taskCompleteHandler(item) }
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
                    onClick={() => { props.onTaskDelete(item.taskId) }}
                />                                
            </li>
        );
    }

    return (
        <div>
            <h1>Tasks List</h1>
            <ul style={{listStyleType:'none', paddingLeft:'0px'}}>
                {
                    props.todoItems
                    .sort((a, b) => a.taskDescription.localeCompare(b.taskDescription))
                    .map((item) => {

                        if (item.isComplete === true) {
                            return null;
                        }

                        return displayTask(item)
                    })
                }
                {
                    props.todoItems
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

export default TasksListNew